// src/screens/CameraScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { uploadToGoogleDrive } from '../../../utils/googleDrive';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const [photo, setPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const cameraRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const previewScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
          exif: true,
        });
        
        setPhoto(photoData);
        setShowPreview(true);
        
        // Animasi preview masuk
        Animated.spring(previewScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil foto');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      setShowPreview(true);
      Animated.spring(previewScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  };

  const uploadImage = async () => {
    if (!photo) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simpan ke local storage dulu
      const fileName = `absensi_${Date.now()}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      
      // Simpan base64 ke file
      await FileSystem.writeAsStringAsync(fileUri, photo.base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Upload ke Google Drive
      const uploadResult = await uploadToGoogleDrive(
        fileUri,
        fileName,
        'image/jpeg',
        (uploadProgress) => {
          setProgress(uploadProgress);
        }
      );

      Alert.alert(
        'Sukses',
        'Foto berhasil diupload ke Google Drive',
        [
          {
            text: 'OK',
            onPress: () => {
              closePreview();
              navigation.goBack();
            },
          },
        ]
      );

    } catch (error) {
      Alert.alert('Error', 'Gagal mengupload foto');
    } finally {
      setUploading(false);
    }
  };

  const closePreview = () => {
    Animated.timing(previewScale, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowPreview(false);
      setPhoto(null);
    });
  };

  const toggleCameraType = () => {
    setType((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode((current) => (current === 'off' ? 'torch' : 'off'));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Icon name="camera-off" size={80} color="#666" />
        <Text style={styles.permissionText}>
          Kami membutuhkan izin kamera untuk mengambil foto
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Berikan Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <Animated.View style={[styles.cameraContainer, { opacity: fadeAnim }]}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={type}
          flash={flashMode}
          mode="picture"
        >
          {/* Camera Controls */}
          <View style={styles.controls}>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
              
              <Text style={styles.title}>Ambil Foto</Text>
              
              <View style={styles.rightButtons}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={toggleFlash}
                >
                  <Icon
                    name={flashMode === 'off' ? 'flash-off' : 'flash'}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={toggleCameraType}
                >
                  <Icon name="camera-flip" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* View Finder */}
            <View style={styles.viewFinder}>
              <View style={styles.finderBorder} />
              <View style={styles.finderGrid}>
                <View style={styles.gridLineVertical} />
                <View style={styles.gridLineHorizontal} />
              </View>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={pickImage}
              >
                <Icon name="image-multiple" size={28} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.shutterButton}
                onPress={takePicture}
              >
                <View style={styles.shutterOuter}>
                  <View style={styles.shutterInner} />
                </View>
              </TouchableOpacity>
              
              <View style={styles.emptyButton} />
            </View>
          </View>
        </CameraView>
      </Animated.View>

      {/* Preview Modal */}
      <Modal
        visible={showPreview}
        transparent
        animationType="fade"
        onRequestClose={closePreview}
      >
        <View style={styles.previewOverlay}>
          <Animated.View
            style={[
              styles.previewContainer,
              {
                transform: [{ scale: previewScale }],
              },
            ]}
          >
            {photo && (
              <Image
                source={{ uri: photo.uri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}
            
            <View style={styles.previewActions}>
              {uploading ? (
                <View style={styles.uploadingContainer}>
                  <ActivityIndicator size="large" color="#667eea" />
                  <Text style={styles.uploadingText}>
                    Mengupload {Math.round(progress * 100)}%
                  </Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${progress * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.previewButton}
                    onPress={closePreview}
                  >
                    <Icon name="close" size={24} color="#666" />
                    <Text style={styles.buttonText}>Ulangi</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.previewButton, styles.uploadButton]}
                    onPress={uploadImage}
                  >
                    <Icon name="cloud-upload" size={24} color="white" />
                    <Text style={[styles.buttonText, styles.uploadButtonText]}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 30,
    color: '#666',
  },
  permissionButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
    marginLeft: 10,
  },
  viewFinder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finderBorder: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  finderGrid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLineVertical: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  gridLineHorizontal: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  galleryButton: {
    padding: 15,
  },
  shutterButton: {
    padding: 5,
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#f0f0f0',
  },
  emptyButton: {
    width: 28,
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
  },
  uploadButton: {
    backgroundColor: '#667eea',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  uploadButtonText: {
    color: 'white',
  },
  uploadingContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  uploadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
});

export default CameraScreen;