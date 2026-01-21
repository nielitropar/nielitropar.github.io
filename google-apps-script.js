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
  try {
    // Handle direct function calls during testing
    if (!e || !e.parameter) {
      return createResponse('error', 'No parameters provided. Use web app URL with ?action=...');
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
        return createResponse('error', 'Invalid action. Available: getProjects, getProfiles, getComments, login, test');
    }
  } catch (error) {
    Logger.log('doGet Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

function doPost(e) {
  try {
    // Handle direct function calls during testing
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse('error', 'No POST data provided');
    }
    
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
    Logger.log('doPost Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

// ====== TEST FUNCTION ======
function testConnection() {
  Logger.log('Testing connection...');
  
  // Test sheet creation
  const usersSheet = getOrCreateSheet(USERS_SHEET);
  const projectsSheet = getOrCreateSheet(PROJECTS_SHEET);
  const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
  const commentsSheet = getOrCreateSheet(COMMENTS_SHEET);
  const sharesSheet = getOrCreateSheet(SHARES_SHEET);
  
  Logger.log('✓ Users sheet: ' + usersSheet.getName());
  Logger.log('✓ Projects sheet: ' + projectsSheet.getName());
  Logger.log('✓ Profiles sheet: ' + profilesSheet.getName());
  Logger.log('✓ Comments sheet: ' + commentsSheet.getName());
  Logger.log('✓ Shares sheet: ' + sharesSheet.getName());
  
  return 'All sheets created successfully!';
}

// ====== AUTHENTICATION ======
function signup(userData) {
  try {
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
      Logger.log('Initialized Users sheet with headers');
    }
    
    // Check if user already exists
    const data = usersSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === userData.email) {
        return createResponse('error', 'Email already registered');
      }
    }
    
    // Hash password
    const hashedPassword = hashPassword(userData.password);
    
    // Add new user
    usersSheet.appendRow([
      userData.email,
      hashedPassword,
      userData.name,
      userData.university || '',
      userData.major || '',
      userData.profilePicture || '',
      '',
      '',
      '',
      userData.timestamp || new Date().toISOString()
    ]);
    
    Logger.log('User created: ' + userData.email);
    
    // Also add to profiles sheet
    addProfile({
      name: userData.name,
      email: userData.email,
      university: userData.university,
      major: userData.major,
      profilePicture: userData.profilePicture,
      timestamp: userData.timestamp || new Date().toISOString()
    });
    
    return createResponse('success', {
      name: userData.name,
      email: userData.email,
      profilePicture: userData.profilePicture || null,
      university: userData.university || '',
      major: userData.major || ''
    });
  } catch (error) {
    Logger.log('Signup Error: ' + error.toString());
    return createResponse('error', 'Signup failed: ' + error.toString());
  }
}

function login(email, password) {
  try {
    if (!email || !password) {
      return createResponse('error', 'Email and password required');
    }
    
    const usersSheet = getOrCreateSheet(USERS_SHEET);
    const data = usersSheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return createResponse('error', 'No users found. Please sign up first.');
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
          Logger.log('Login successful: ' + email);
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
  } catch (error) {
    Logger.log('Login Error: ' + error.toString());
    return createResponse('error', 'Login failed: ' + error.toString());
  }
}

function updateProfile(profileData) {
  try {
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
          profileData.name || data[i][2],
          profileData.university || '',
          profileData.major || '',
          profileData.profilePicture || '',
          profileData.linkedin || '',
          profileData.github || '',
          profileData.bio || '',
          data[i][9] // Keep original timestamp
        ]]);
        
        Logger.log('Profile updated: ' + profileData.email);
        
        // Also update profiles sheet
        updateProfilesSheet(profileData);
        
        return createResponse('success', 'Profile updated');
      }
    }
    
    return createResponse('error', 'User not found');
  } catch (error) {
    Logger.log('Update Profile Error: ' + error.toString());
    return createResponse('error', 'Update failed: ' + error.toString());
  }
}

function updateProfilesSheet(profileData) {
  try {
    const profilesSheet = getOrCreateSheet(PROFILES_SHEET);
    const data = profilesSheet.getDataRange().getValues();
    
    if (data.length <= 1) return;
    
    const headers = data[0];
    const emailIndex = headers.indexOf('email');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][emailIndex] === profileData.email) {
        profilesSheet.getRange(i + 1, 1, 1, headers.length).setValues([[
          profileData.name || data[i][0],
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
  } catch (error) {
    Logger.log('Update Profiles Sheet Error: ' + error.toString());
  }
}

function hashPassword(password) {
  try {
    const digest = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      password,
      Utilities.Charset.UTF_8
    );
    return Utilities.base64Encode(digest);
  } catch (error) {
    Logger.log('Hash Password Error: ' + error.toString());
    throw error;
  }
}

// ====== PROJECT OPERATIONS ======
function getProjects() {
  try {
    const sheet = getOrCreateSheet(PROJECTS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      Logger.log('No projects found');
      return createResponse('success', []);
    }
    
    const headers = data[0];
    const projects = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const project = {};
      
      headers.forEach((header, index) => {
        project[header] = row[index] || '';
      });
      
      project.upvotes = parseInt(project.upvotes) || 0;
      
      // Get comment count for this project
      project.commentCount = getCommentCount(project.id);
      project.shareCount = getShareCount(project.id);
      
      projects.push(project);
    }
    
    Logger.log('Loaded ' + projects.length + ' projects');
    return createResponse('success', projects);
  } catch (error) {
    Logger.log('Get Projects Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

function addProject(projectData) {
  try {
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
      Logger.log('Initialized Projects sheet with headers');
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
      projectData.timestamp || new Date().toISOString()
    ]);
    
    Logger.log('Project added: ' + projectData.title);
    return createResponse('success', 'Project added successfully');
  } catch (error) {
    Logger.log('Add Project Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

function updateUpvotes(projectId, upvotes) {
  try {
    const sheet = getOrCreateSheet(PROJECTS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == projectId) {
        sheet.getRange(i + 1, 10).setValue(upvotes);
        Logger.log('Upvotes updated for project: ' + projectId);
        return createResponse('success', 'Upvotes updated');
      }
    }
    
    return createResponse('error', 'Project not found');
  } catch (error) {
    Logger.log('Update Upvotes Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

// ====== PROFILE OPERATIONS ======
function getProfiles() {
  try {
    const sheet = getOrCreateSheet(PROFILES_SHEET);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      Logger.log('No profiles found');
      return createResponse('success', []);
    }
    
    const headers = data[0];
    const profiles = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const profile = {};
      
      headers.forEach((header, index) => {
        profile[header] = row[index] || '';
      });
      
      profiles.push(profile);
    }
    
    Logger.log('Loaded ' + profiles.length + ' profiles');
    return createResponse('success', profiles);
  } catch (error) {
    Logger.log('Get Profiles Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

function addProfile(profileData) {
  try {
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
      Logger.log('Initialized Profiles sheet with headers');
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
          profileData.timestamp || new Date().toISOString()
        ]]);
        Logger.log('Profile updated: ' + profileData.email);
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
      profileData.timestamp || new Date().toISOString()
    ]);
    
    Logger.log('Profile added: ' + profileData.email);
    return createResponse('success', 'Profile added');
  } catch (error) {
    Logger.log('Add Profile Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

// ====== COMMENTS OPERATIONS ======
function getComments(projectId) {
  try {
    const sheet = getOrCreateSheet(COMMENTS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return createResponse('success', []);
    }
    
    const headers = data[0];
    const projectIdIndex = headers.indexOf('projectId');
    const comments = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (projectId && row[projectIdIndex] !== projectId) {
        continue;
      }
      
      const comment = {};
      headers.forEach((header, index) => {
        comment[header] = row[index] || '';
      });
      comments.push(comment);
    }
    
    Logger.log('Loaded ' + comments.length + ' comments for project: ' + projectId);
    return createResponse('success', comments);
  } catch (error) {
    Logger.log('Get Comments Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

function addComment(commentData) {
  try {
    const sheet = getOrCreateSheet(COMMENTS_SHEET);
    
    // Initialize sheet with headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'id',
        'projectId',
        'authorName',
        'authorEmail',
        'authorPicture',
        'comment',
        'timestamp'
      ]);
      Logger.log('Initialized Comments sheet with headers');
    }
    
    // Add comment
    sheet.appendRow([
      commentData.id || Date.now().toString(),
      commentData.projectId,
      commentData.authorName,
      commentData.authorEmail,
      commentData.authorPicture || '',
      commentData.comment,
      commentData.timestamp || new Date().toISOString()
    ]);
    
    Logger.log('Comment added to project: ' + commentData.projectId);
    return createResponse('success', 'Comment added successfully');
  } catch (error) {
    Logger.log('Add Comment Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

function getCommentCount(projectId) {
  try {
    const sheet = getOrCreateSheet(COMMENTS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) return 0;
    
    const headers = data[0];
    const projectIdIndex = headers.indexOf('projectId');
    let count = 0;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][projectIdIndex] === projectId) {
        count++;
      }
    }
    
    return count;
  } catch (error) {
    Logger.log('Get Comment Count Error: ' + error.toString());
    return 0;
  }
}

// ====== SHARES OPERATIONS ======
function addShare(shareData) {
  try {
    const sheet = getOrCreateSheet(SHARES_SHEET);
    
    // Initialize sheet with headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'id',
        'projectId',
        'sharedBy',
        'sharedWith',
        'method',
        'timestamp'
      ]);
      Logger.log('Initialized Shares sheet with headers');
    }
    
    // Add share
    sheet.appendRow([
      shareData.id || Date.now().toString(),
      shareData.projectId,
      shareData.sharedBy,
      shareData.sharedWith || '',
      shareData.method || 'link',
      shareData.timestamp || new Date().toISOString()
    ]);
    
    Logger.log('Share recorded for project: ' + shareData.projectId);
    return createResponse('success', 'Share recorded successfully');
  } catch (error) {
    Logger.log('Add Share Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

function getShareCount(projectId) {
  try {
    const sheet = getOrCreateSheet(SHARES_SHEET);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) return 0;
    
    const headers = data[0];
    const projectIdIndex = headers.indexOf('projectId');
    let count = 0;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][projectIdIndex] === projectId) {
        count++;
      }
    }
    
    return count;
  } catch (error) {
    Logger.log('Get Share Count Error: ' + error.toString());
    return 0;
  }
}

// ====== UTILITY FUNCTIONS ======
function getOrCreateSheet(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      Logger.log('Created new sheet: ' + sheetName);
    }
    
    return sheet;
  } catch (error) {
    Logger.log('Get/Create Sheet Error: ' + error.toString());
    throw error;
  }
}

function createResponse(status, data) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: status,
      data: data,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== SAMPLE DATA INITIALIZATION ======
function initializeSampleData() {
  Logger.log('Initializing sample data...');
  
  try {
    // Create sample users
    signup({
      name: 'Demo Student',
      email: 'demo@nielit.gov.in',
      password: 'demo123',
      university: 'NIELIT Ropar',
      major: 'Computer Science',
      timestamp: new Date().toISOString()
    });
    
    Logger.log('Sample user created: demo@nielit.gov.in / demo123');
    
    signup({
      name: 'Sarah Chen',
      email: 'sarah@nielit.gov.in',
      password: 'sarah123',
      university: 'NIELIT Ropar',
      major: 'Software Engineering',
      timestamp: new Date().toISOString()
    });
    
    Logger.log('Second sample user created: sarah@nielit.gov.in / sarah123');
    
    // Add sample projects
    const projects = [
      {
        id: Date.now().toString(),
        authorName: 'Demo Student',
        authorEmail: 'demo@nielit.gov.in',
        authorPicture: '',
        title: 'AI Study Assistant',
        description: 'A machine learning application that helps students study more effectively by creating personalized quiz questions based on their learning patterns.',
        link: 'https://github.com/demo/study-ai',
        tech: 'Python, TensorFlow, React, Flask',
        projectImage: '',
        upvotes: 15,
        timestamp: new Date().toISOString()
      },
      {
        id: (Date.now() + 1).toString(),
        authorName: 'Sarah Chen',
        authorEmail: 'sarah@nielit.gov.in',
        authorPicture: '',
        title: 'Smart Campus Navigator',
        description: 'An AR-based mobile app that helps students navigate the NIELIT campus with real-time directions.',
        link: 'https://github.com/demo/campus-nav',
        tech: 'React Native, ARCore, Firebase',
        projectImage: '',
        upvotes: 12,
        timestamp: new Date().toISOString()
      }
    ];
    
    projects.forEach(project => {
      addProject(project);
    });
    
    Logger.log('Sample projects added');
    
    Logger.log('✓ Sample data initialized successfully!');
    Logger.log('✓ Login with: demo@nielit.gov.in / demo123');
    Logger.log('✓ Or: sarah@nielit.gov.in / sarah123');
    
    return 'Sample data initialized! Check the logs for login credentials.';
    
  } catch (error) {
    Logger.log('Initialize Sample Data Error: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}
