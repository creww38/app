import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

const useCamera = (options = {}) => {
  const {
    initialType = Camera.Constants.Type.back,
      quality = 0.8,
      autoFocus = Camera.Constants.AutoFocus.on,
      flashMode = Camera.Constants.FlashMode.off,
      ratio = '16:9',
  } = options;
  
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(initialType);
  const [flash, setFlash] = useState(flashMode);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const toggleCameraType = () => {
    setCameraType(current =>
      current === Camera.Constants.Type.back ?
      Camera.Constants.Type.front :
      Camera.Constants.Type.back
    );
  };
  
  const toggleFlash = () => {
    setFlash(current => {
      switch (current) {
        case Camera.Constants.FlashMode.off:
          return Camera.Constants.FlashMode.on;
        case Camera.Constants.FlashMode.on:
          return Camera.Constants.FlashMode.auto;
        case Camera.Constants.FlashMode.auto:
          return Camera.Constants.FlashMode.off;
        default:
          return Camera.Constants.FlashMode.off;
      }
    });
  };
  
  const takePicture = async () => {
    if (!cameraRef || !isCameraReady) {
      Alert.alert('Error', 'Kamera belum siap');
      return null;
    }
    
    try {
      const photo = await cameraRef.takePictureAsync({
        quality,
        base64: true,
        exif: true,
        skipProcessing: Platform.OS === 'android',
      });
      
      return {
        ...photo,
        timestamp: new Date().toISOString(),
        cameraType,
        flash,
      };
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Gagal mengambil foto');
      return null;
    }
  };
  
  const recordVideo = async () => {
    if (!cameraRef || !isCameraReady) {
      Alert.alert('Error', 'Kamera belum siap');
      return null;
    }
    
    try {
      setIsRecording(true);
      const video = await cameraRef.recordAsync({
        quality: Camera.Constants.VideoQuality['720p'],
        maxDuration: 60,
        mute: false,
      });
      
      return {
        ...video,
        timestamp: new Date().toISOString(),
        cameraType,
        flash,
      };
    } catch (error) {
      console.error('Error recording video:', error);
      Alert.alert('Error', 'Gagal merekam video');
      return null;
    } finally {
      setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (cameraRef && isRecording) {
      cameraRef.stopRecording();
      setIsRecording(false);
    }
  };
  
  const pickImageFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permission.granted) {
        Alert.alert('Izin diperlukan', 'Butuh izin akses galeri');
        return null;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality,
        base64: true,
      });
      
      if (!result.canceled) {
        return {
          ...result.assets[0],
          source: 'gallery',
          timestamp: new Date().toISOString(),
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Gagal memilih gambar');
      return null;
    }
  };
  
  const handleCameraReady = () => {
    setIsCameraReady(true);
  };
  
  return {
    // State
    hasPermission,
    cameraRef,
    cameraType,
    flash,
    isCameraReady,
    isRecording,
    
    // Refs
    setCameraRef,
    
    // Actions
    toggleCameraType,
    toggleFlash,
    takePicture,
    recordVideo,
    stopRecording,
    pickImageFromGallery,
    handleCameraReady,
    
    // Constants
    Camera,
  };
};

export default useCamera;