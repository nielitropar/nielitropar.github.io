// STUDENTHUB - PRODUCTION BACKEND (Optimized v1.5)

const PROJECTS_SHEET = 'Projects';
const PROFILES_SHEET = 'Profiles';
const USERS_SHEET = 'Users';
const COMMENTS_SHEET = 'Comments';
const UPVOTES_SHEET = 'Upvotes';
const PROFILE_LIKES_SHEET = 'ProfileLikes'; 
const TRENDING_CACHE_SHEET = 'TrendingCache'; // [NEW] Cache Sheet

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
      case 'getSearchIndex': 
        return getSearchIndex();
      case 'getProfileIndex': // [NEW] Correctly placed inside switch
        return getProfileIndex();
      case 'getTrending': 
        return getTrendingProjects(); 
      case 'getProfiles':
        return getProfilesPaginated(params.page, params.searchTerm, params.userEmail);
      case 'getProject': 
        return getProject(params.id);
      case 'getProfile': 
        return getProfile(params.email, params.userEmail);
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
      case 'toggleProfileLike':
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

// [OPTIMIZED] Reads from pre-calculated cache
function getTrendingProjects() {
  const cacheSheet = getOrCreateSheet(TRENDING_CACHE_SHEET);
  const data = cacheSheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return createResponse('success', []); 
  }
  
  const headers = data[0];
  const projects = data.slice(1).map(row => {
    let p = {};
    headers.forEach((h, i) => p[h] = row[i]);
    return p;
  });
  
  return createResponse('success', projects);
}

// [NEW] LIGHTWEIGHT SEARCH INDEX (For Projects)
function getSearchIndex() {
  const cache = CacheService.getScriptCache();
  const cachedIndex = cache.get('search_index');
  
  if (cachedIndex) {
    return ContentService.createTextOutput(cachedIndex).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  
  const searchData = data.slice(1).map(row => ({
    id: row[0],
    title: row[4],
    authorName: row[1],
    tech: row[7],
    category: row[11],
    timestamp: row[10] 
  })).reverse(); 

  const response = { status: 'success', data: searchData };
  const jsonString = JSON.stringify(response);
  
  cache.put('search_index', jsonString, 21600); 

  return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON);
}

// [NEW] LIGHTWEIGHT PROFILE INDEX (For Students)
function getProfileIndex() {
  const cache = CacheService.getScriptCache();
  const cachedIndex = cache.get('profile_index');
  
  if (cachedIndex) {
    return ContentService.createTextOutput(cachedIndex).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = getOrCreateSheet(PROFILES_SHEET);
  const data = sheet.getDataRange().getValues();
  
  // Map ONLY essential columns to keep payload tiny
  const searchData = data.slice(1).map(row => ({
    name: row[0],
    email: row[1],
    university: row[2],
    major: row[3],
    profilePicture: row[7],
    likes: parseInt(row[10]) || 0
  })).reverse(); // ADDED THIS .reverse() Latest profiles appears on top

  const jsonString = JSON.stringify({ status: 'success', data: searchData });
  
  cache.put('profile_index', jsonString, 21600); 

  return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON);
}

// [OPTIMIZED] "Reverse-Range" Strategy + Caching
function getProjectsPaginated(currentUserEmail, page, searchTerm) {
  const cacheKey = searchTerm ? `search_${searchTerm}_${page}` : `feed_${page}`;
  const cache = CacheService.getScriptCache();
  
  if (!currentUserEmail) {
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return ContentService.createTextOutput(cachedResult).setMimeType(ContentService.MimeType.JSON);
    }
  }

  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const lastRow = sheet.getLastRow();
  const PAGE_SIZE = 20;
  let projects = [];
  let totalProjects = 0;
  let hasMore = false;

  if (!searchTerm || searchTerm.trim() === '') {
    totalProjects = Math.max(0, lastRow - 1);
    const pageNum = parseInt(page) || 1;
    const endRow = lastRow - ((pageNum - 1) * PAGE_SIZE);
    const startRow = Math.max(2, endRow - PAGE_SIZE + 1);
    
    if (endRow >= 2) {
      const numRows = (endRow - startRow) + 1;
      const data = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn()).getValues();
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      
      projects = data.map(row => {
        let p = {};
        headers.forEach((h, i) => p[h] = row[i]);
        return p;
      });
      projects.reverse();
      hasMore = startRow > 2;
    }
  } else {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const term = searchTerm.toLowerCase();
    
    let allMatches = data.slice(1).filter(row => {
      const title = String(row[4]||'').toLowerCase(); 
      const author = String(row[1]||'').toLowerCase();
      const tech = String(row[7]||'').toLowerCase();
      const desc = String(row[5]||'').toLowerCase();
      const cat = String(row[11]||'').toLowerCase();
      
      return title.includes(term) || author.includes(term) || 
             tech.includes(term) || desc.includes(term) || cat.includes(term);
    }).map(row => {
        let p = {};
        headers.forEach((h, i) => p[h] = row[i]);
        return p;
    });
    
    allMatches.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    totalProjects = allMatches.length;
    
    const pageNum = parseInt(page) || 1;
    const startIndex = (pageNum - 1) * PAGE_SIZE;
    projects = allMatches.slice(startIndex, startIndex + PAGE_SIZE);
    hasMore = (startIndex + PAGE_SIZE) < totalProjects;
  }

  let commentCounts = {};
  const cSheet = getOrCreateSheet(COMMENTS_SHEET);
  const cData = cSheet.getDataRange().getValues();
  cData.slice(1).forEach(r => {
     let pid = String(r[1]);
     commentCounts[pid] = (commentCounts[pid] || 0) + 1;
  });

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

  projects.forEach(p => {
    p.upvotes = parseInt(p.upvotes) || 0;
    p.isLiked = userUpvotes.has(String(p.id));
    p.commentCount = commentCounts[p.id] || 0; 
    p.category = p.category || 'Other'; 
  });
  
  const responseData = {
    items: projects,
    total: totalProjects,
    hasMore: hasMore,
    page: parseInt(page) || 1
  };
  
  const jsonString = JSON.stringify({ status: 'success', data: responseData });

  if (!currentUserEmail) {
    cache.put(cacheKey, jsonString, 600); 
  }

  return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON);
}

// EXISTING FUNCTIONS (Unchanged)

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
  
  p.likes = parseInt(row[10]) || 0; 
  p.isLiked = false;

  if (currentUserEmail) {
    const likesSheet = getOrCreateSheet(PROFILE_LIKES_SHEET);
    const likesData = likesSheet.getDataRange().getValues();
    const cleanUser = String(currentUserEmail).toLowerCase().trim();
    
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

function getProfilesPaginated(page, searchTerm, currentUserEmail) {
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createResponse('success', { items: [], total: 0, hasMore: false });
  
  let likedProfiles = new Set();
  if (currentUserEmail) {
    const likesSheet = getOrCreateSheet(PROFILE_LIKES_SHEET);
    const likesData = likesSheet.getDataRange().getValues();
    const cleanUser = String(currentUserEmail).toLowerCase().trim();
    likesData.slice(1).forEach(row => {
      if (String(row[1]).toLowerCase() === cleanUser) {
        likedProfiles.add(String(row[0]).toLowerCase());
      }
    });
  }

  const headers = data[0];
  let profiles = data.slice(1)
    .filter(row => row[1] && String(row[1]).trim() !== '')
    .map(row => {
      let p = {};
      headers.forEach((h, i) => p[h] = row[i]);
      p.likes = parseInt(p.likes) || 0;
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
    '', '', '', data.profilePicture, new Date().toISOString(), '', 0 
  ]);

  // [UPDATED] Clear the cache so the new user appears in search immediately
  CacheService.getScriptCache().remove('profile_index');

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

function toggleProfileLike(targetEmail, userEmail) {
  if (!targetEmail || !userEmail) return createResponse('error', 'Missing data');
  if (targetEmail.toLowerCase() === userEmail.toLowerCase()) return createResponse('error', 'Cannot like own profile');

  const likesSheet = getOrCreateSheet(PROFILE_LIKES_SHEET);
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  const likesData = likesSheet.getDataRange().getValues();
  const cleanUser = String(userEmail).toLowerCase().trim();
  const cleanTarget = String(targetEmail).toLowerCase().trim();
  
  let foundRowIndex = -1;

  for (let i = 1; i < likesData.length; i++) {
    if (String(likesData[i][0]).toLowerCase() === cleanTarget && 
        String(likesData[i][1]).toLowerCase() === cleanUser) {
      foundRowIndex = i + 1;
      break;
    }
  }

  const profileData = profilesSheet.getDataRange().getValues();
  let profileRowIndex = -1;
  let currentCount = 0;

  for (let i = 1; i < profileData.length; i++) {
    if (String(profileData[i][1]).toLowerCase() === cleanTarget) {
      profileRowIndex = i + 1;
      currentCount = parseInt(profileData[i][10]) || 0;
      break;
    }
  }

  if (profileRowIndex === -1) return createResponse('error', 'Profile not found');

  let newCount = currentCount;
  let action = '';

  if (foundRowIndex !== -1) {
    likesSheet.deleteRow(foundRowIndex);
    newCount = Math.max(0, currentCount - 1);
    action = 'removed';
  } else {
    likesSheet.appendRow([cleanTarget, cleanUser, new Date().toISOString()]);
    newCount = currentCount + 1;
    action = 'added';
  }

  profilesSheet.getRange(profileRowIndex, 11).setValue(newCount);
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
      'Profiles': ['name', 'email', 'university', 'major', 'linkedin', 'github', 'bio', 'profilePicture', 'timestamp', 'resume', 'likes'], 
      'Comments': ['id', 'projectId', 'authorName', 'authorEmail', 'comment', 'timestamp'],
      'Upvotes': ['projectId', 'userEmail', 'timestamp'],
      'ProfileLikes': ['targetEmail', 'userEmail', 'timestamp'],
      'TrendingCache': ['id', 'authorName', 'authorEmail', 'authorPicture', 'title', 'description', 'link', 'tech', 'projectImage', 'upvotes', 'timestamp', 'category', 'trendingScore', 'commentCount']
    };
    if (headers[name]) sheet.appendRow(headers[name]);
  }
  return sheet;
}

function hashPassword(raw) {
  // RETRIEVE SALT FROM SCRIPT PROPERTIES (ENVIRONMENT VARIABLE)
  const scriptProperties = PropertiesService.getScriptProperties();
  const SALT = scriptProperties.getProperty('SALT');
  
  if (!SALT) throw new Error("Security Error: SALT is not set in Script Properties.");
  
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw + SALT);
  return Utilities.base64Encode(digest);
}

function getCommentCount(pid) {
  const sheet = getOrCreateSheet(COMMENTS_SHEET);
  const data = sheet.getDataRange().getValues();
  return data.slice(1).filter(r => r[0] && String(r[1]) === String(pid)).length;
}

// [NEW] CRON JOB FUNCTION
function updateTrendingCache() {
  const pSheet = getOrCreateSheet(PROJECTS_SHEET);
  const cSheet = getOrCreateSheet(COMMENTS_SHEET);
  
  const pData = pSheet.getDataRange().getValues();
  const cData = cSheet.getDataRange().getValues();
  
  if (pData.length <= 1) return;

  // 1. Map Comment Counts
  let commentCounts = {};
  cData.slice(1).forEach(row => {
    const pid = String(row[1]);
    commentCounts[pid] = (commentCounts[pid] || 0) + 1;
  });

  const headers = pData[0];
  const now = new Date();

  // 2. Calculate Scores
  let projects = pData.slice(1)
    .filter(row => row[0] && String(row[0]).trim() !== '')
    .map(row => {
      let p = {};
      headers.forEach((h, i) => p[h] = row[i]);
      
      const upvotes = parseInt(p.upvotes) || 0;
      const comments = commentCounts[p.id] || 0;
      const postDate = new Date(p.timestamp);
      
      const daysOld = Math.max(0, (now - postDate) / (1000 * 60 * 60 * 24));
      const rawScore = (upvotes * 2) + (comments * 3);
      const trendingScore = rawScore / Math.pow(daysOld + 1, 0.5);

      p.trendingScore = trendingScore;
      p.commentCount = comments;
      return p;
    });

  // 3. Sort by Score & Take Top 5
  projects.sort((a, b) => b.trendingScore - a.trendingScore);
  const top5 = projects.slice(0, 5);

  // 4. Write to Cache Sheet
  const cacheSheet = getOrCreateSheet(TRENDING_CACHE_SHEET);
  cacheSheet.clear();
  
  // Write Headers
  const keys = Object.keys(top5[0]);
  cacheSheet.appendRow(keys);
  
  // Write Rows
  top5.forEach(item => {
    let row = keys.map(k => {
      if (item[k] instanceof Date) return item[k].toISOString();
      return item[k];
    });
    cacheSheet.appendRow(row);
  });
}
