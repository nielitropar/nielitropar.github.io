const PROJECTS_SHEET = 'Projects';
const PROFILES_SHEET = 'Profiles';
const USERS_SHEET = 'Users';
const COMMENTS_SHEET = 'Comments';

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
        return getProjects();
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
      case 'updateUpvotes':
        return updateUpvotes(params.projectId, params.upvotes);
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

function getProjects() {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', []);
  
  const headers = data[0];
  const projects = data.slice(1).map(row => {
    let p = {};
    headers.forEach((h, i) => p[h] = row[i]);
    p.upvotes = parseInt(p.upvotes) || 0;
    p.commentCount = getCommentCount(p.id);
    return p;
  });
  
  return createResponse('success', projects.reverse());
}

function getProfiles() {
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', []);
  
  const headers = data[0];
  const profiles = data.slice(1).map(row => {
    let p = {};
    headers.forEach((h, i) => p[h] = row[i]);
    return p;
  });
  
  return createResponse('success', profiles);
}

function login(email, password) {
  const sheet = getOrCreateSheet(USERS_SHEET);
  const data = sheet.getDataRange().getValues();
  const cleanEmail = String(email).toLowerCase().trim();
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase() === cleanEmail) {
      if (data[i][1] === hashPassword(password)) {
        return createResponse('success', {
          email: data[i][0],
          name: data[i][2],
          university: data[i][3],
          major: data[i][4],
          profilePicture: data[i][5],
          linkedin: data[i][6],
          github: data[i][7],
          bio: data[i][8],
          resume: data[i][10] || ''
        });
      } else {
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

  // Check duplicate
  const users = usersSheet.getDataRange().getValues();
  for(let i=1; i<users.length; i++) {
    if(String(users[i][0]).toLowerCase() === cleanEmail) {
      return createResponse('error', 'User already exists');
    }
  }

  const hashedPassword = hashPassword(data.password);
  
  usersSheet.appendRow([
    cleanEmail, hashedPassword, data.name, data.university, 
    data.major, data.profilePicture, '', '', '', new Date().toISOString(), ''
  ]);

  // Add to Profiles (Public Sheet)
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
      if(String(d[i][emailColIndex]).toLowerCase() === cleanEmail) {
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

function updateUpvotes(id, count) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  for(let i=1; i<data.length; i++) {
    if(String(data[i][0]) === String(id)) {
      sheet.getRange(i+1, 10).setValue(count);
      return createResponse('success', 'Updated');
    }
  }
  return createResponse('error', 'Project not found');
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
    .filter(row => String(row[1]) === String(projectId))
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
      'Comments': ['id', 'projectId', 'authorName', 'authorEmail', 'comment', 'timestamp']
    };
    if (headers[name]) sheet.appendRow(headers[name]);
  }
  return sheet;
}

function hashPassword(raw) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw);
  return Utilities.base64Encode(digest);
}

function getCommentCount(pid) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  const data = sheet.getDataRange().getValues();
  return data.slice(1).filter(r => String(r[1]) === String(pid)).length;
}
