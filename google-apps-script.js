// ========================================
// STUDENTHUB - PRODUCTION GOOGLE APPS SCRIPT
// ========================================
// Enhanced with Comments & Sharing Features

const PROJECTS_SHEET = 'Projects';
const PROFILES_SHEET = 'Profiles';
const USERS_SHEET = 'Users';
const COMMENTS_SHEET = 'Comments';
const SHARES_SHEET = 'Shares';

// ====== MAIN HANDLERS ======
function doGet(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    // Handle direct function calls or missing params
    if (!e || !e.parameter) {
      return createResponse('error', 'No parameters provided.');
    }
    
    const action = e.parameter.action;
    
    switch (action) {
      case 'getProjects':
        return getProjects();
      case 'getProfiles':
        return getProfiles();
      case 'getComments':
        return getComments(e.parameter.projectId);
      case 'login':
        return login(e.parameter.email, e.parameter.password);
      case 'test':
        return createResponse('success', 'API is working!');
      default:
        return createResponse('error', 'Invalid action');
    }
  } catch (error) {
    return createResponse('error', error.toString());
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse('error', 'No POST data provided');
    }
    
    // Parse the JSON body (works even if sent as text/plain)
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    switch (action) {
      case 'signup':
        return signup(data.data);
      case 'addProject':
        return addProject(data.data);
      case 'addProfile':
        return addProfile(data.data);
      case 'updateProfile':
        return updateProfile(data.data);
      case 'updateUpvotes':
        return updateUpvotes(data.projectId, data.upvotes);
      case 'addComment':
        return addComment(data.data);
      case 'addShare':
        return addShare(data.data);
      default:
        return createResponse('error', 'Invalid POST action');
    }
  } catch (error) {
    return createResponse('error', error.toString());
  } finally {
    lock.releaseLock();
  }
}

// ====== DATA INITIALIZATION ======
function initializeSampleData() {
  const sheets = [USERS_SHEET, PROJECTS_SHEET, PROFILES_SHEET, COMMENTS_SHEET, SHARES_SHEET];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create sheets if they don't exist
  sheets.forEach(sheetName => {
    getOrCreateSheet(sheetName);
  });
  
  // Add sample user if Users sheet is empty
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  if (usersSheet.getLastRow() <= 1) {
    signup({
      name: 'Demo Student',
      email: 'demo@nielit.gov.in',
      password: 'demo123',
      university: 'NIELIT Ropar',
      major: 'Computer Science',
      timestamp: new Date().toISOString()
    });
  }
  
  return 'Database initialized successfully';
}

// ====== AUTHENTICATION ======
function signup(userData) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  
  // Headers check
  if (usersSheet.getLastRow() === 0) {
    usersSheet.appendRow(['email', 'password', 'name', 'university', 'major', 'profilePicture', 'linkedin', 'github', 'bio', 'timestamp']);
  }
  
  // Duplicate check
  const data = usersSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === userData.email) return createResponse('error', 'Email already registered');
  }
  
  const hashedPassword = hashPassword(userData.password);
  
  usersSheet.appendRow([
    userData.email,
    hashedPassword,
    userData.name,
    userData.university || '',
    userData.major || '',
    userData.profilePicture || '',
    '', '', '', 
    userData.timestamp || new Date().toISOString()
  ]);
  
  // Sync to Profiles
  addProfile({
    name: userData.name,
    email: userData.email,
    university: userData.university,
    major: userData.major,
    profilePicture: userData.profilePicture,
    timestamp: userData.timestamp || new Date().toISOString()
  });
  
  return createResponse('success', { ...userData, password: '' });
}

function login(email, password) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  const data = usersSheet.getDataRange().getValues();
  
  if (data.length <= 1) return createResponse('error', 'No users found.');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      if (data[i][1] === hashPassword(password)) {
        return createResponse('success', {
          email: data[i][0],
          name: data[i][2],
          university: data[i][3],
          major: data[i][4],
          profilePicture: data[i][5],
          linkedin: data[i][6],
          github: data[i][7],
          bio: data[i][8]
        });
      } else {
        return createResponse('error', 'Invalid password');
      }
    }
  }
  return createResponse('error', 'User not found');
}

// ====== CORE FUNCTIONS ======
function getProjects() {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', []);
  
  const headers = data[0];
  const projects = data.slice(1).map(row => {
    let project = {};
    headers.forEach((h, i) => project[h] = row[i]);
    project.commentCount = getCommentCount(project.id);
    project.shareCount = getShareCount(project.id);
    return project;
  });
  
  return createResponse('success', projects.reverse()); // Newest first
}

function addProject(data) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['id', 'authorName', 'authorEmail', 'authorPicture', 'title', 'description', 'link', 'tech', 'projectImage', 'upvotes', 'timestamp']);
  }
  
  sheet.appendRow([
    data.id, data.authorName, data.authorEmail, data.authorPicture, 
    data.title, data.description, data.link, data.tech, 
    data.projectImage, data.upvotes || 0, data.timestamp
  ]);
  
  return createResponse('success', 'Project added');
}

function addProfile(data) {
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  if (sheet.getLastRow() === 0) sheet.appendRow(['name', 'email', 'university', 'major', 'linkedin', 'github', 'bio', 'profilePicture', 'timestamp']);
  
  // Update existing or append new
  const rows = sheet.getDataRange().getValues();
  for(let i=1; i<rows.length; i++) {
    if(rows[i][1] === data.email) {
      // Update logic handled by updateProfile usually, but here for sync
      return createResponse('success', 'Profile synced');
    }
  }
  
  sheet.appendRow([data.name, data.email, data.university, data.major, data.linkedin, data.github, data.bio, data.profilePicture, data.timestamp]);
  return createResponse('success', 'Profile added');
}

function updateProfile(data) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  
  // Update Users Sheet
  updateSheetRow(usersSheet, 0, data.email, [
    data.email, null, data.name, data.university, data.major, data.profilePicture, data.linkedin, data.github, data.bio, null
  ]);
  
  // Update Profiles Sheet
  updateSheetRow(profilesSheet, 1, data.email, [
    data.name, data.email, data.university, data.major, data.linkedin, data.github, data.bio, data.profilePicture, null
  ]);
  
  return createResponse('success', 'Profile updated');
}

function updateUpvotes(projectId, upvotes) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  for(let i=1; i<data.length; i++) {
    if(data[i][0] == projectId) {
      sheet.getRange(i+1, 10).setValue(upvotes);
      return createResponse('success', 'Upvoted');
    }
  }
  return createResponse('error', 'Project not found');
}

function addComment(data) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  if(sheet.getLastRow() === 0) sheet.appendRow(['id', 'projectId', 'authorName', 'authorEmail', 'authorPicture', 'comment', 'timestamp']);
  sheet.appendRow([data.id, data.projectId, data.authorName, data.authorEmail, data.authorPicture, data.comment, data.timestamp]);
  return createResponse('success', 'Comment added');
}

function getComments(projectId) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  const data = sheet.getDataRange().getValues();
  const comments = data.slice(1).filter(r => r[1] == projectId).map(r => ({
    id: r[0], projectId: r[1], authorName: r[2], authorEmail: r[3], authorPicture: r[4], comment: r[5], timestamp: r[6]
  }));
  return createResponse('success', comments);
}

function addShare(data) {
  const sheet = getOrCreateSheet(SHARES_SHEET);
  if(sheet.getLastRow() === 0) sheet.appendRow(['id', 'projectId', 'sharedBy', 'sharedWith', 'method', 'timestamp']);
  sheet.appendRow([data.id, data.projectId, data.sharedBy, data.sharedWith, data.method, data.timestamp]);
  return createResponse('success', 'Share recorded');
}

// ====== HELPERS ======
function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function hashPassword(password) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password, Utilities.Charset.UTF_8);
  return Utilities.base64Encode(digest);
}

function createResponse(status, data) {
  return ContentService.createTextOutput(JSON.stringify({ status, data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function updateSheetRow(sheet, keyIndex, keyValue, newValues) {
  const data = sheet.getDataRange().getValues();
  for(let i=1; i<data.length; i++) {
    if(data[i][keyIndex] === keyValue) {
      const row = i+1;
      newValues.forEach((val, colIndex) => {
        if(val !== null) sheet.getRange(row, colIndex+1).setValue(val);
      });
      return;
    }
  }
}

function getCommentCount(pid) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  const data = sheet.getDataRange().getValues();
  return data.slice(1).filter(r => r[1] == pid).length;
}

function getShareCount(pid) {
  const sheet = getOrCreateSheet(SHARES_SHEET);
  const data = sheet.getDataRange().getValues();
  return data.slice(1).filter(r => r[1] == pid).length;
}
