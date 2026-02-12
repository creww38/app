// src/utils/googleDrive.js
import * as FileSystem from 'expo-file-system';

// Konfigurasi Google Drive API
const GOOGLE_DRIVE_API_URL = 'https://www.googleapis.com/upload/drive/v3/files';
const GOOGLE_DRIVE_FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID'; // Ganti dengan ID folder Anda

// Upload file ke Google Drive
export const uploadToGoogleDrive = async (fileUri, fileName, mimeType, onProgress) => {
  try {
    // 1. Get OAuth token (ini perlu diimplementasikan sesuai dengan authentication method Anda)
    const accessToken = await getGoogleDriveToken();
    
    if (!accessToken) {
      throw new Error('Tidak ada token akses');
    }
    
    // 2. Create metadata
    const metadata = {
      name: fileName,
      mimeType: mimeType,
      parents: [GOOGLE_DRIVE_FOLDER_ID],
    };
    
    // 3. Create form data
    const form = new FormData();
    form.append('metadata', JSON.stringify(metadata), {
      type: 'application/json',
    });
    
    form.append('file', {
      uri: fileUri,
      name: fileName,
      type: mimeType,
    });
    
    // 4. Upload file
    const response = await fetch(`${GOOGLE_DRIVE_API_URL}?uploadType=multipart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/related',
      },
      body: form,
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Upload gagal: ${error}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Google Drive upload error:', error);
    throw error;
  }
};

// Helper function untuk mendapatkan token
const getGoogleDriveToken = async () => {
  try {
    // Implementasi mendapatkan token dari AsyncStorage atau AuthContext
    // Contoh menggunakan AsyncStorage:
    const token = await AsyncStorage.getItem('google_drive_token');
    return token;
    
    // Untuk implementasi lengkap, Anda perlu menggunakan Google Sign-In
    // atau OAuth2 flow
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Create folder in Google Drive
export const createFolder = async (folderName, parentFolderId = null) => {
  try {
    const accessToken = await getGoogleDriveToken();
    
    const metadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : [],
    };
    
    const response = await fetch(GOOGLE_DRIVE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });
    
    if (!response.ok) {
      throw new Error('Gagal membuat folder');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create folder error:', error);
    throw error;
  }
};

// List files in folder
export const listFiles = async (folderId = null) => {
  try {
    const accessToken = await getGoogleDriveToken();
    
    let url = `${GOOGLE_DRIVE_API_URL}?q=trashed=false`;
    
    if (folderId) {
      url += ` and '${folderId}' in parents`;
    }
    
    url += '&fields=files(id,name,mimeType,createdTime,size)';
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Gagal mengambil daftar file');
    }
    
    const result = await response.json();
    return result.files;
  } catch (error) {
    console.error('List files error:', error);
    throw error;
  }
};

// Delete file from Google Drive
export const deleteFile = async (fileId) => {
  try {
    const accessToken = await getGoogleDriveToken();
    
    const response = await fetch(`${GOOGLE_DRIVE_API_URL}/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Gagal menghapus file');
    }
    
    return true;
  } catch (error) {
    console.error('Delete file error:', error);
    throw error;
  }
};

// Download file from Google Drive
export const downloadFile = async (fileId, fileName) => {
  try {
    const accessToken = await getGoogleDriveToken();
    
    const response = await fetch(`${GOOGLE_DRIVE_API_URL}/${fileId}?alt=media`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Gagal mendownload file');
    }
    
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const base64 = await response.text();
    
    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    return fileUri;
  } catch (error) {
    console.error('Download file error:', error);
    throw error;
  }
};