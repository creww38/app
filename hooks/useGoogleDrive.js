import { useState, useEffect, useCallback } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Platform } from 'react-native';
import {
  uploadToGoogleDrive,
  downloadFromGoogleDrive,
  listFiles,
  createFolder,
  deleteFile
} from '../utils/googleDrive';

WebBrowser.maybeCompleteAuthSession();

const useGoogleDrive = (config = {}) => {
  const {
    androidClientId,
    iosClientId,
    webClientId,
    scopes = [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
    ],
  } = config;
  
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
    scopes,
  });
  
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);
  
  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const userInfo = await response.json();
      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', 'Gagal mengambil informasi pengguna');
    }
  };
  
  const signIn = async () => {
    try {
      setIsLoading(true);
      await promptAsync();
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', 'Gagal masuk dengan Google');
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = () => {
    setUser(null);
    setAccessToken(null);
    setFiles([]);
  };
  
  const uploadFile = useCallback(async (file, folderId = null, onProgress = null) => {
    if (!accessToken) {
      Alert.alert('Error', 'Silakan login terlebih dahulu');
      return null;
    }
    
    try {
      setIsLoading(true);
      const result = await uploadToGoogleDrive(file, accessToken, folderId, onProgress);
      
      if (result) {
        Alert.alert('Sukses', 'File berhasil diupload');
        await refreshFileList();
      }
      
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Gagal mengupload file');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);
  
  const downloadFile = useCallback(async (fileId, onProgress = null) => {
    if (!accessToken) {
      Alert.alert('Error', 'Silakan login terlebih dahulu');
      return null;
    }
    
    try {
      setIsLoading(true);
      const result = await downloadFromGoogleDrive(fileId, accessToken, onProgress);
      return result;
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Error', 'Gagal mendownload file');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);
  
  const listAllFiles = useCallback(async (folderId = null) => {
    if (!accessToken) {
      return [];
    }
    
    try {
      setIsLoading(true);
      const fileList = await listFiles(accessToken, folderId);
      setFiles(fileList);
      return fileList;
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);
  
  const refreshFileList = useCallback(async () => {
    return await listAllFiles();
  }, [listAllFiles]);
  
  const createNewFolder = useCallback(async (folderName, parentFolderId = null) => {
    if (!accessToken) {
      Alert.alert('Error', 'Silakan login terlebih dahulu');
      return null;
    }
    
    try {
      setIsLoading(true);
      const folder = await createFolder(folderName, accessToken, parentFolderId);
      
      if (folder) {
        Alert.alert('Sukses', 'Folder berhasil dibuat');
        await refreshFileList();
      }
      
      return folder;
    } catch (error) {
      console.error('Error creating folder:', error);
      Alert.alert('Error', 'Gagal membuat folder');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, refreshFileList]);
  
  const deleteFileById = useCallback(async (fileId) => {
    if (!accessToken) {
      Alert.alert('Error', 'Silakan login terlebih dahulu');
      return false;
    }
    
    try {
      Alert.alert(
        'Konfirmasi',
        'Apakah Anda yakin ingin menghapus file ini?',
        [
          { text: 'Batal', style: 'cancel' },
          {
            text: 'Hapus',
            style: 'destructive',
            onPress: async () => {
              setIsLoading(true);
              const success = await deleteFile(fileId, accessToken);
              
              if (success) {
                Alert.alert('Sukses', 'File berhasil dihapus');
                await refreshFileList();
              }
            },
          },
        ]
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      Alert.alert('Error', 'Gagal menghapus file');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, refreshFileList]);
  
  const searchFiles = useCallback(async (query) => {
    if (!accessToken) {
      return [];
    }
    
    try {
      setIsLoading(true);
      const allFiles = await listFiles(accessToken);
      const filteredFiles = allFiles.filter(file =>
        file.name.toLowerCase().includes(query.toLowerCase()) ||
        (file.description && file.description.toLowerCase().includes(query.toLowerCase()))
      );
      
      return filteredFiles;
    } catch (error) {
      console.error('Error searching files:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);
  
  return {
    // State
    user,
    accessToken,
    isLoading,
    files,
    isSignedIn: !!user,
    
    // Auth Actions
    signIn,
    signOut,
    request,
    
    // File Actions
    uploadFile,
    downloadFile,
    listAllFiles,
    refreshFileList,
    createNewFolder,
    deleteFileById,
    searchFiles,
  };
};

export default useGoogleDrive;