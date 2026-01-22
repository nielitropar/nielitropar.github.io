// STUDENTHUB - PRODUCTION BACKEND (v1.2 - Migration Fix)

const PROJECTS_SHEET = 'Projects';
const PROFILES_SHEET = 'Profiles';
const USERS_SHEET = 'Users';
const COMMENTS_SHEET = 'Comments';
const UPVOTES_SHEET = 'Upvotes'; // [NEW] Track individual votes

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    let action, params;
    
    if (method === 'GET') {
      if (!e || !e.parameter) return createResponse('error', 'No parameters');
      action = e.parameter.action;
      params = e.parameter;
    } else {
      if (!e || !e.postData) return createResponse('error', 'No POST data');
      const rawData = e.postData.contents;
      let jsonData;
      try {
        jsonData = JSON.parse(rawData);
      } catch (err) {
        try {
          jsonData = JSON.parse(Object.keys(e.parameter)[0] || '{}');
        } catch (err2) {
          jsonData = {};
        }
      }
      action = jsonData.action;
      params = jsonData;
    }

    if (!action) return createResponse('error', 'No action specified');

    switch (action) {
      case 'getProjects':
        // [OPTIONAL] Pass userEmail to check which projects they liked
        return getProjects(params.userEmail); 
      case 'getProfiles':
        return getProfiles();
      case 'getComments':
        return getComments(params.projectId);
      case 'login':
        return login(params.email, params.password);
      case 'signup':
        return signup(params.data);
      case 'addProject':
        return addProject(params.data);
      case 'updateProfile':
        return updateProfile(params.data);
      case 'toggleUpvote': // [CHANGED] Renamed from updateUpvotes
        return toggleUpvote(params.projectId, params.userEmail);
      case 'addComment':
        return addComment(params.data);
      default:
        return createResponse('error', `Unknown action: ${action}`);
    }
  } catch (error) {
    return createResponse('error', error.toString());
  } finally {
    lock.releaseLock();
  }
}

// ====== CORE LOGIC ======

function getProjects(currentUserEmail) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', []);
  
  // [NEW] Get user's upvotes to mark them as "liked"
  let userUpvotes = new Set();
  if (currentUserEmail) {
    const upvoteSheet = getOrCreateSheet(UPVOTES_SHEET);
    const upvoteData = upvoteSheet.getDataRange().getValues();
    upvoteData.slice(1).forEach(row => {
      if (String(row[1]).toLowerCase() === String(currentUserEmail).toLowerCase()) {
        userUpvotes.add(String(row[0])); // Store Project ID
      }
    });
  }

  const headers = data[0];
  const projects = data.slice(1)
    .filter(row => row[0] && String(row[0]).trim() !== '') 
    .map(row => {
      let p = {};
      headers.forEach((h, i) => p[h] = row[i]);
      p.upvotes = parseInt(p.upvotes) || 0;
      p.commentCount = getCommentCount(p.id);
      // [NEW] Flag if current user liked this
      p.isLiked = userUpvotes.has(String(p.id)); 
      return p;
    });
  
  return createResponse('success', projects.reverse());
}

function getProfiles() {
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', []);
  
  const headers = data[0];
  const profiles = data.slice(1)
    .filter(row => row[1] && String(row[1]).trim() !== '')
    .map(row => {
      let p = {};
      headers.forEach((h, i) => p[h] = row[i]);
      return p;
    });
  
  return createResponse('success', profiles);
}

// [FIXED] Login now supports "Migration" from old passwords to new secure ones
function login(email, password) {
  const sheet = getOrCreateSheet(USERS_SHEET);
  const data = sheet.getDataRange().getValues();
  const cleanEmail = String(email).toLowerCase().trim();
  
  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue; 

    if (String(data[i][0]).toLowerCase() === cleanEmail) {
      const storedHash = data[i][1];
      const newHash = hashPassword(password);    // Salted (New)
      const oldHash = hashLegacy(password);      // Unsalted (Old)

      if (storedHash === newHash) {
        // SUCCESS: Password matches new secure format
        return createResponse('success', getUserObj(data[i]));
      } 
      else if (storedHash === oldHash) {
        // SUCCESS (Legacy): Password matches old format. 
        // ACTION: Update database to new format automatically (Migration)
        sheet.getRange(i + 1, 2).setValue(newHash);
        return createResponse('success', getUserObj(data[i]));
      } 
      else {
        return createResponse('error', 'Incorrect password');
      }
    }
  }
  return createResponse('error', 'User not found');
}

function signup(data) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  const cleanEmail = String(data.email).toLowerCase().trim();

  const users = usersSheet.getDataRange().getValues();
  for(let i=1; i<users.length; i++) {
    if (users[i][0] && String(users[i][0]).toLowerCase() === cleanEmail) {
      return createResponse('error', 'User already exists');
    }
  }

  const hashedPassword = hashPassword(data.password);
  
  usersSheet.appendRow([
    cleanEmail, hashedPassword, data.name, data.university, 
    data.major, data.profilePicture, '', '', '', new Date().toISOString(), ''
  ]);

  profilesSheet.appendRow([
    data.name, cleanEmail, data.university, data.major, 
    '', '', '', data.profilePicture, new Date().toISOString(), ''
  ]);

  return createResponse('success', { ...data, password: '' });
}

function addProject(data) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  sheet.appendRow([
    data.id, data.authorName, data.authorEmail.toLowerCase(), data.authorPicture,
    data.title, data.description, data.link, data.tech,
    data.projectImage, 0, new Date().toISOString()
  ]);
  return createResponse('success', 'Project posted');
}

function updateProfile(data) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  const cleanEmail = String(data.email).toLowerCase().trim();
  
  const updateRow = (sheet, emailColIndex, newDataMap) => {
    const d = sheet.getDataRange().getValues();
    for(let i=1; i<d.length; i++) {
      if(d[i][emailColIndex] && String(d[i][emailColIndex]).toLowerCase() === cleanEmail) {
        Object.keys(newDataMap).forEach(colIdx => {
          sheet.getRange(i+1, parseInt(colIdx)+1).setValue(newDataMap[colIdx]);
        });
      }
    }
  };

  updateRow(usersSheet, 0, {
    2: data.name, 3: data.university, 4: data.major, 
    5: data.profilePicture, 6: data.linkedin, 7: data.github, 8: data.bio,
    10: data.resume 
  });

  updateRow(profilesSheet, 1, {
    0: data.name, 2: data.university, 3: data.major,
    4: data.linkedin, 5: data.github, 6: data.bio, 7: data.profilePicture,
    9: data.resume
  });
  
  return createResponse('success', 'Profile updated');
}

// [NEW] Toggle Upvote Function
function toggleUpvote(projectId, userEmail) {
  if (!projectId || !userEmail) return createResponse('error', 'Missing data');
  
  const upvoteSheet = getOrCreateSheet(UPVOTES_SHEET);
  const projectSheet = getOrCreateSheet(PROJECTS_SHEET);
  
  const upvotesData = upvoteSheet.getDataRange().getValues();
  const cleanEmail = String(userEmail).toLowerCase().trim();
  let foundRowIndex = -1;

  // 1. Check if user already upvoted
  for (let i = 1; i < upvotesData.length; i++) {
    if (String(upvotesData[i][0]) === String(projectId) && 
        String(upvotesData[i][1]).toLowerCase() === cleanEmail) {
      foundRowIndex = i + 1; // 1-based index for Sheet
      break;
    }
  }

  // 2. Find Project Row to update count
  const projectData = projectSheet.getDataRange().getValues();
  let projectRowIndex = -1;
  let currentCount = 0;

  for (let i = 1; i < projectData.length; i++) {
    if (String(projectData[i][0]) === String(projectId)) {
      projectRowIndex = i + 1;
      currentCount = parseInt(projectData[i][9]) || 0; // Column 10 is index 9
      break;
    }
  }

  if (projectRowIndex === -1) return createResponse('error', 'Project not found');

  let newCount = currentCount;
  let action = '';

  if (foundRowIndex !== -1) {
    // REMOVE UPVOTE (Toggle Off)
    upvoteSheet.deleteRow(foundRowIndex);
    newCount = Math.max(0, currentCount - 1);
    action = 'removed';
  } else {
    // ADD UPVOTE (Toggle On)
    upvoteSheet.appendRow([projectId, cleanEmail, new Date().toISOString()]);
    newCount = currentCount + 1;
    action = 'added';
  }

  // Update Project Sheet Count
  projectSheet.getRange(projectRowIndex, 10).setValue(newCount);

  return createResponse('success', { action: action, newCount: newCount });
}

function addComment(data) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  sheet.appendRow([
    data.id, data.projectId, data.authorName, 
    data.authorEmail, data.comment, new Date().toISOString()
  ]);
  return createResponse('success', 'Comment added');
}

function getComments(projectId) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  const data = sheet.getDataRange().getValues();
  const comments = data.slice(1)
    .filter(row => row[0] && String(row[1]) === String(projectId))
    .map(row => ({
      id: row[0], projectId: row[1], authorName: row[2], 
      authorEmail: row[3], comment: row[4], timestamp: row[5]
    }));
  return createResponse('success', comments);
}

function createResponse(status, data) {
  return ContentService.createTextOutput(JSON.stringify({ status, data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    const headers = {
      'Users': ['email', 'password', 'name', 'university', 'major', 'profilePicture', 'linkedin', 'github', 'bio', 'timestamp', 'resume'],
      'Projects': ['id', 'authorName', 'authorEmail', 'authorPicture', 'title', 'description', 'link', 'tech', 'projectImage', 'upvotes', 'timestamp'],
      'Profiles': ['name', 'email', 'university', 'major', 'linkedin', 'github', 'bio', 'profilePicture', 'timestamp', 'resume'],
      'Comments': ['id', 'projectId', 'authorName', 'authorEmail', 'comment', 'timestamp'],
      'Upvotes': ['projectId', 'userEmail', 'timestamp'] // [NEW] Headers for Upvotes
    };
    if (headers[name]) sheet.appendRow(headers[name]);
  }
  return sheet;
}

function hashPassword(raw) {
  // [SECURITY IMPROVEMENT] Added simple salt to prevent rainbow table attacks
  const SALT = 'NIELIT_STUDENTHUB_SECURE_SALT_2026'; 
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw + SALT);
  return Utilities.base64Encode(digest);
}

function getCommentCount(pid) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  const data = sheet.getDataRange().getValues();
  return data.slice(1).filter(r => r[0] && String(r[1]) === String(pid)).length;
}

// === HELPERS ===

function getUserObj(row) {
  return {
    email: row[0],
    name: row[2],
    university: row[3],
    major: row[4],
    profilePicture: row[5],
    linkedin: row[6],
    github: row[7],
    bio: row[8],
    resume: row[10] || ''
  };
}

function hashLegacy(raw) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw);
  return Utilities.base64Encode(digest);
}
