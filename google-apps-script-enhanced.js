// ========================================
// STUDENTHUB - ENHANCED GOOGLE APPS SCRIPT
// ========================================
// With Authentication & Image Support

const PROJECTS_SHEET = 'Projects';
const PROFILES_SHEET = 'Profiles';
const USERS_SHEET = 'Users';

// ====== MAIN HANDLERS ======
function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch (action) {
      case 'getProjects':
        return getProjects();
      case 'getProfiles':
        return getProfiles();
      case 'login':
        return login(e.parameter.email, e.parameter.password);
      default:
        return createResponse('error', 'Invalid action');
    }
  } catch (error) {
    return createResponse('error', error.toString());
  }
}

function doPost(e) {
  try {
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
      default:
        return createResponse('error', 'Invalid action');
    }
  } catch (error) {
    return createResponse('error', error.toString());
  }
}

// ====== AUTHENTICATION ======
function signup(userData) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  
  // Initialize sheet with headers if empty
  if (usersSheet.getLastRow() === 0) {
    usersSheet.appendRow([
      'email',
      'password',
      'name',
      'university',
      'major',
      'profilePicture',
      'linkedin',
      'github',
      'bio',
      'timestamp'
    ]);
  }
  
  // Check if user already exists
  const data = usersSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === userData.email) {
      return createResponse('error', 'Email already registered');
    }
  }
  
  // Add new user
  usersSheet.appendRow([
    userData.email,
    hashPassword(userData.password), // Simple hash
    userData.name,
    userData.university || '',
    userData.major || '',
    userData.profilePicture || '',
    '',
    '',
    '',
    userData.timestamp
  ]);
  
  // Also add to profiles sheet
  addProfile({
    name: userData.name,
    email: userData.email,
    university: userData.university,
    major: userData.major,
    profilePicture: userData.profilePicture,
    timestamp: userData.timestamp
  });
  
  return createResponse('success', {
    name: userData.name,
    email: userData.email,
    profilePicture: userData.profilePicture,
    university: userData.university,
    major: userData.major
  });
}

function login(email, password) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  const data = usersSheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return createResponse('error', 'No users found');
  }
  
  const headers = data[0];
  const emailIndex = headers.indexOf('email');
  const passwordIndex = headers.indexOf('password');
  const nameIndex = headers.indexOf('name');
  const profilePictureIndex = headers.indexOf('profilePicture');
  const universityIndex = headers.indexOf('university');
  const majorIndex = headers.indexOf('major');
  const linkedinIndex = headers.indexOf('linkedin');
  const githubIndex = headers.indexOf('github');
  const bioIndex = headers.indexOf('bio');
  
  // Find user
  for (let i = 1; i < data.length; i++) {
    if (data[i][emailIndex] === email) {
      const storedPassword = data[i][passwordIndex];
      const hashedPassword = hashPassword(password);
      
      if (storedPassword === hashedPassword) {
        return createResponse('success', {
          name: data[i][nameIndex],
          email: data[i][emailIndex],
          profilePicture: data[i][profilePictureIndex] || null,
          university: data[i][universityIndex] || '',
          major: data[i][majorIndex] || '',
          linkedin: data[i][linkedinIndex] || '',
          github: data[i][githubIndex] || '',
          bio: data[i][bioIndex] || ''
        });
      } else {
        return createResponse('error', 'Invalid password');
      }
    }
  }
  
  return createResponse('error', 'User not found');
}

function updateProfile(profileData) {
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  const data = usersSheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return createResponse('error', 'No users found');
  }
  
  const headers = data[0];
  const emailIndex = headers.indexOf('email');
  
  // Find and update user
  for (let i = 1; i < data.length; i++) {
    if (data[i][emailIndex] === profileData.email) {
      usersSheet.getRange(i + 1, 1, 1, headers.length).setValues([[
        profileData.email,
        data[i][1], // Keep existing password
        profileData.name,
        profileData.university || '',
        profileData.major || '',
        profileData.profilePicture || '',
        profileData.linkedin || '',
        profileData.github || '',
        profileData.bio || '',
        data[i][9] // Keep original timestamp
      ]]);
      
      // Also update profiles sheet
      updateProfilesSheet(profileData);
      
      return createResponse('success', 'Profile updated');
    }
  }
  
  return createResponse('error', 'User not found');
}

function updateProfilesSheet(profileData) {
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  const data = profilesSheet.getDataRange().getValues();
  
  if (data.length <= 1) return;
  
  const headers = data[0];
  const emailIndex = headers.indexOf('email');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][emailIndex] === profileData.email) {
      profilesSheet.getRange(i + 1, 1, 1, headers.length).setValues([[
        profileData.name,
        profileData.email,
        profileData.university || '',
        profileData.major || '',
        profileData.linkedin || '',
        profileData.github || '',
        profileData.bio || '',
        profileData.profilePicture || '',
        data[i][8] // Keep timestamp
      ]]);
      return;
    }
  }
}

// Simple password hashing (for demonstration - use proper hashing in production)
function hashPassword(password) {
  return Utilities.base64Encode(Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    password
  ));
}

// ====== PROJECT OPERATIONS ======
function getProjects() {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return createResponse('success', []);
  }
  
  const headers = data[0];
  const projects = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const project = {};
    
    headers.forEach((header, index) => {
      project[header] = row[index];
    });
    
    project.upvotes = parseInt(project.upvotes) || 0;
    projects.push(project);
  }
  
  return createResponse('success', projects);
}

function addProject(projectData) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  
  // Initialize sheet with headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'id',
      'authorName',
      'authorEmail',
      'authorPicture',
      'title',
      'description',
      'link',
      'tech',
      'projectImage',
      'upvotes',
      'timestamp'
    ]);
  }
  
  // Add project
  sheet.appendRow([
    projectData.id,
    projectData.authorName,
    projectData.authorEmail,
    projectData.authorPicture || '',
    projectData.title,
    projectData.description,
    projectData.link || '',
    projectData.tech || '',
    projectData.projectImage || '',
    projectData.upvotes || 0,
    projectData.timestamp
  ]);
  
  return createResponse('success', 'Project added successfully');
}

function updateUpvotes(projectId, upvotes) {
  const sheet = getOrCreateSheet(PROJECTS_SHEET);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === projectId) {
      sheet.getRange(i + 1, 10).setValue(upvotes); // Column 10 is upvotes
      return createResponse('success', 'Upvotes updated');
    }
  }
  
  return createResponse('error', 'Project not found');
}

// ====== PROFILE OPERATIONS ======
function getProfiles() {
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return createResponse('success', []);
  }
  
  const headers = data[0];
  const profiles = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const profile = {};
    
    headers.forEach((header, index) => {
      profile[header] = row[index];
    });
    
    profiles.push(profile);
  }
  
  return createResponse('success', profiles);
}

function addProfile(profileData) {
  const sheet = getOrCreateSheet(PROFILES_SHEET);
  
  // Initialize sheet with headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'name',
      'email',
      'university',
      'major',
      'linkedin',
      'github',
      'bio',
      'profilePicture',
      'timestamp'
    ]);
  }
  
  // Check if profile exists
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === profileData.email) {
      // Update existing
      sheet.getRange(i + 1, 1, 1, 9).setValues([[
        profileData.name,
        profileData.email,
        profileData.university || '',
        profileData.major || '',
        profileData.linkedin || '',
        profileData.github || '',
        profileData.bio || '',
        profileData.profilePicture || '',
        profileData.timestamp
      ]]);
      return createResponse('success', 'Profile updated');
    }
  }
  
  // Add new
  sheet.appendRow([
    profileData.name,
    profileData.email,
    profileData.university || '',
    profileData.major || '',
    profileData.linkedin || '',
    profileData.github || '',
    profileData.bio || '',
    profileData.profilePicture || '',
    profileData.timestamp
  ]);
  
  return createResponse('success', 'Profile added');
}

// ====== UTILITY FUNCTIONS ======
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  
  return sheet;
}

function createResponse(status, data) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: status,
      data: data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== SAMPLE DATA INITIALIZATION ======
function initializeSampleData() {
  // Create sample user
  signup({
    name: 'Demo Student',
    email: 'demo@university.edu',
    password: 'demo123',
    university: 'Tech University',
    major: 'Computer Science',
    timestamp: new Date().toISOString()
  });
  
  // Add sample project
  addProject({
    id: Date.now().toString(),
    authorName: 'Demo Student',
    authorEmail: 'demo@university.edu',
    title: 'AI Study Assistant',
    description: 'A machine learning application that helps students study more effectively.',
    link: 'https://github.com/demo/study-ai',
    tech: 'Python, TensorFlow, React',
    upvotes: 15,
    timestamp: new Date().toISOString()
  });
  
  Logger.log('Sample data initialized! Login: demo@university.edu / demo123');
}
