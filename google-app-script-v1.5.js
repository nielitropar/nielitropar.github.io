// STUDENTHUB - PRODUCTION BACKEND (v1.5 - Profile Likes)

const PROJECTS_SHEET = 'Projects';
const PROFILES_SHEET = 'Profiles';
const USERS_SHEET = 'Users';
const COMMENTS_SHEET = 'Comments';
const UPVOTES_SHEET = 'Upvotes';
const PROFILE_LIKES_SHEET = 'ProfileLikes'; // [NEW]

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
        return getProjectsPaginated(params.userEmail, params.page, params.searchTerm);
      case 'getProfiles':
        return getProfilesPaginated(params.page, params.searchTerm, params.userEmail); // [UPDATED] Pass userEmail
      case 'getProject': 
        return getProject(params.id);
      case 'getProfile': 
        return getProfile(params.email, params.userEmail); // [UPDATED] Pass userEmail
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
      case 'toggleUpvote':
        return toggleUpvote(params.projectId, params.userEmail);
      case 'toggleProfileLike': // [NEW] Action
        return toggleProfileLike(params.targetEmail, params.userEmail);
      case 'addComment':
        return addComment(params.data);
      case 'getStats':
        return getStats();
      default:
        return createResponse('error', `Unknown action: ${action}`);
    }
  } catch (error) {
    return createResponse('error', error.toString());
  } finally {
    lock.releaseLock();
  }
}

// ====== SINGLE ITEM LOOKUPS ======

function getProject(id) {
  if (!id) return createResponse('error', 'No ID provided');
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const row = data.slice(1).find(r => String(r[0]) === String(id));
  if (!row) return createResponse('error', 'Project not found');
  
  let p = {};
  headers.forEach((h, i) => p[h] = row[i]);
  p.upvotes = parseInt(p.upvotes) || 0;
  p.commentCount = getCommentCount(p.id);
  p.category = row[11] || 'Other'; 
  return createResponse('success', p);
}

function getProfile(email, currentUserEmail) {
  if (!email) return createResponse('error', 'No email provided');
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const cleanEmail = String(email).toLowerCase().trim();
  
  const row = data.slice(1).find(r => String(r[1]).toLowerCase() === cleanEmail);
  if (!row) return createResponse('error', 'Profile not found');
  
  let p = {};
  headers.forEach((h, i) => p[h] = row[i]);
  
  // [NEW] Get likes data
  p.likes = parseInt(row[10]) || 0; // Column 11 (index 10) is Likes
  p.isLiked = false;

  if (currentUserEmail) {
    const likesSheet = getOrCreateSheet(PROFILE_LIKES_SHEET);
    const likesData = likesSheet.getDataRange().getValues();
    const cleanUser = String(currentUserEmail).toLowerCase().trim();
    
    // Check if user liked this profile
    for(let i=1; i<likesData.length; i++) {
      if(String(likesData[i][0]).toLowerCase() === cleanEmail && 
         String(likesData[i][1]).toLowerCase() === cleanUser) {
        p.isLiked = true;
        break;
      }
    }
  }
  
  return createResponse('success', p);
}

// ====== PAGINATED QUERIES ======

function getProjectsPaginated(currentUserEmail, page, searchTerm) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', { items: [], total: 0, hasMore: false });
  
  let userUpvotes = new Set();
  if (currentUserEmail) {
    const upvoteSheet = getOrCreateSheet(UPVOTES_SHEET);
    const upvoteData = upvoteSheet.getDataRange().getValues();
    upvoteData.slice(1).forEach(row => {
      if (String(row[1]).toLowerCase() === String(currentUserEmail).toLowerCase()) {
        userUpvotes.add(String(row[0]));
      }
    });
  }

  const headers = data[0];
  let projects = data.slice(1)
    .filter(row => row[0] && String(row[0]).trim() !== '')
    .map(row => {
      let p = {};
      headers.forEach((h, i) => p[h] = row[i]);
      p.upvotes = parseInt(p.upvotes) || 0;
      p.isLiked = userUpvotes.has(String(p.id));
      p.category = row[11] || 'Other'; 
      return p;
    });
  
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    projects = projects.filter(p => 
      (p.title && p.title.toLowerCase().includes(term)) ||
      (p.authorName && p.authorName.toLowerCase().includes(term)) ||
      (p.tech && p.tech.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term)) ||
      (p.category && p.category.toLowerCase().includes(term))
    );
  }
  
  projects.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  const itemsPerPage = 20;
  const pageNum = parseInt(page) || 1;
  const startIndex = (pageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = projects.slice(startIndex, endIndex);
  
  paginatedProjects.forEach(p => {
    p.commentCount = getCommentCount(p.id);
  });
  
  return createResponse('success', {
    items: paginatedProjects,
    total: projects.length,
    hasMore: endIndex < projects.length,
    page: pageNum
  });
}

function getProfilesPaginated(page, searchTerm, currentUserEmail) {
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', { items: [], total: 0, hasMore: false });
  
  // [NEW] Get set of profiles liked by current user
  let likedProfiles = new Set();
  if (currentUserEmail) {
    const likesSheet = getOrCreateSheet(PROFILE_LIKES_SHEET);
    const likesData = likesSheet.getDataRange().getValues();
    const cleanUser = String(currentUserEmail).toLowerCase().trim();
    likesData.slice(1).forEach(row => {
      if (String(row[1]).toLowerCase() === cleanUser) {
        likedProfiles.add(String(row[0]).toLowerCase()); // Store target email
      }
    });
  }

  const headers = data[0];
  let profiles = data.slice(1)
    .filter(row => row[1] && String(row[1]).trim() !== '')
    .map(row => {
      let p = {};
      headers.forEach((h, i) => p[h] = row[i]);
      p.likes = parseInt(p.likes) || 0; // Ensure numeric
      p.isLiked = likedProfiles.has(String(p.email).toLowerCase());
      return p;
    });
  
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    profiles = profiles.filter(p => 
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.major && p.major.toLowerCase().includes(term)) ||
      (p.university && p.university.toLowerCase().includes(term))
    );
  }
  
  const itemsPerPage = 24;
  const pageNum = parseInt(page) || 1;
  const startIndex = (pageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProfiles = profiles.slice(startIndex, endIndex);
  
  return createResponse('success', {
    items: paginatedProfiles,
    total: profiles.length,
    hasMore: endIndex < profiles.length,
    page: pageNum
  });
}

function getStats() {
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  const projectsSheet = getOrCreateSheet(PROJECTS_SHEET);
  return createResponse('success', {
    totalStudents: Math.max(0, profilesSheet.getLastRow() - 1),
    totalProjects: Math.max(0, projectsSheet.getLastRow() - 1)
  });
}

function login(email, password) {
  const sheet = getOrCreateSheet(USERS_SHEET);
  const data = sheet.getDataRange().getValues();
  const cleanEmail = String(email).toLowerCase().trim();
  
  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue; 
    if (String(data[i][0]).toLowerCase() === cleanEmail) {
      const storedHash = data[i][1];
      const newHash = hashPassword(password);
      const oldHash = hashLegacy(password);

      if (storedHash === newHash) {
        return createResponse('success', getUserObj(data[i]));
      } else if (storedHash === oldHash) {
        sheet.getRange(i + 1, 2).setValue(newHash);
        return createResponse('success', getUserObj(data[i]));
      } else {
        return createResponse('error', 'Incorrect password');
      }
    }
  }
  return createResponse('error', 'User not found');
}

// ====== LOGIC FUNCTIONS ======

function hashLegacy(raw) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw);
  return Utilities.base64Encode(digest);
}

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
    '', '', '', data.profilePicture, new Date().toISOString(), '', 0 // Added initial likes
  ]);
  return createResponse('success', { ...data, password: '' });
}

function addProject(data) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  sheet.appendRow([
    data.id, data.authorName, data.authorEmail.toLowerCase(), data.authorPicture,
    data.title, data.description, data.link, data.tech,
    data.projectImage, 0, new Date().toISOString(), data.category
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
    5: data.profilePicture, 6: data.linkedin, 7: data.github, 8: data.bio, 10: data.resume 
  });
  updateRow(profilesSheet, 1, {
    0: data.name, 2: data.university, 3: data.major,
    4: data.linkedin, 5: data.github, 6: data.bio, 7: data.profilePicture, 9: data.resume
  });
  return createResponse('success', 'Profile updated');
}

function toggleUpvote(projectId, userEmail) {
  if (!projectId || !userEmail) return createResponse('error', 'Missing data');
  const upvoteSheet = getOrCreateSheet(UPVOTES_SHEET);
  const projectSheet = getOrCreateSheet(PROJECTS_SHEET);
  const upvotesData = upvoteSheet.getDataRange().getValues();
  const cleanEmail = String(userEmail).toLowerCase().trim();
  let foundRowIndex = -1;

  for (let i = 1; i < upvotesData.length; i++) {
    if (String(upvotesData[i][0]) === String(projectId) && String(upvotesData[i][1]).toLowerCase() === cleanEmail) {
      foundRowIndex = i + 1;
      break;
    }
  }

  const projectData = projectSheet.getDataRange().getValues();
  let projectRowIndex = -1;
  let currentCount = 0;
  for (let i = 1; i < projectData.length; i++) {
    if (String(projectData[i][0]) === String(projectId)) {
      projectRowIndex = i + 1;
      currentCount = parseInt(projectData[i][9]) || 0;
      break;
    }
  }
  if (projectRowIndex === -1) return createResponse('error', 'Project not found');

  let newCount = currentCount;
  let action = '';
  if (foundRowIndex !== -1) {
    upvoteSheet.deleteRow(foundRowIndex);
    newCount = Math.max(0, currentCount - 1);
    action = 'removed';
  } else {
    upvoteSheet.appendRow([projectId, cleanEmail, new Date().toISOString()]);
    newCount = currentCount + 1;
    action = 'added';
  }
  projectSheet.getRange(projectRowIndex, 10).setValue(newCount);
  return createResponse('success', { action: action, newCount: newCount });
}

// [NEW] Toggle Profile Like
function toggleProfileLike(targetEmail, userEmail) {
  if (!targetEmail || !userEmail) return createResponse('error', 'Missing data');
  if (targetEmail.toLowerCase() === userEmail.toLowerCase()) return createResponse('error', 'Cannot like own profile');

  const likesSheet = getOrCreateSheet(PROFILE_LIKES_SHEET);
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  const likesData = likesSheet.getDataRange().getValues();
  const cleanUser = String(userEmail).toLowerCase().trim();
  const cleanTarget = String(targetEmail).toLowerCase().trim();
  
  let foundRowIndex = -1;

  // Check if already liked
  for (let i = 1; i < likesData.length; i++) {
    if (String(likesData[i][0]).toLowerCase() === cleanTarget && 
        String(likesData[i][1]).toLowerCase() === cleanUser) {
      foundRowIndex = i + 1;
      break;
    }
  }

  // Find Profile Row
  const profileData = profilesSheet.getDataRange().getValues();
  let profileRowIndex = -1;
  let currentCount = 0;

  for (let i = 1; i < profileData.length; i++) {
    if (String(profileData[i][1]).toLowerCase() === cleanTarget) {
      profileRowIndex = i + 1;
      currentCount = parseInt(profileData[i][10]) || 0; // Likes are at index 10
      break;
    }
  }

  if (profileRowIndex === -1) return createResponse('error', 'Profile not found');

  let newCount = currentCount;
  let action = '';

  if (foundRowIndex !== -1) {
    // Unlike
    likesSheet.deleteRow(foundRowIndex);
    newCount = Math.max(0, currentCount - 1);
    action = 'removed';
  } else {
    // Like
    likesSheet.appendRow([cleanTarget, cleanUser, new Date().toISOString()]);
    newCount = currentCount + 1;
    action = 'added';
  }

  profilesSheet.getRange(profileRowIndex, 11).setValue(newCount); // Column 11 is Likes
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
      'Projects': ['id', 'authorName', 'authorEmail', 'authorPicture', 'title', 'description', 'link', 'tech', 'projectImage', 'upvotes', 'timestamp', 'category'],
      // [UPDATED] Added 'likes' at end (index 10)
      'Profiles': ['name', 'email', 'university', 'major', 'linkedin', 'github', 'bio', 'profilePicture', 'timestamp', 'resume', 'likes'],
      'Comments': ['id', 'projectId', 'authorName', 'authorEmail', 'comment', 'timestamp'],
      'Upvotes': ['projectId', 'userEmail', 'timestamp'],
      'ProfileLikes': ['targetEmail', 'userEmail', 'timestamp'] // [NEW]
    };
    if (headers[name]) sheet.appendRow(headers[name]);
  }
  return sheet;
}

function hashPassword(raw) {
  const SALT = 'NIELIT_STUDENTHUB_SECURE_SALT_2026'; 
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw + SALT);
  return Utilities.base64Encode(digest);
}

function getCommentCount(pid) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  const data = sheet.getDataRange().getValues();
  return data.slice(1).filter(r => r[0] && String(r[1]) === String(pid)).length;
}
