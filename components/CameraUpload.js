import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const CameraUpload = ({ onImageSelected, label, maxSizeMB = 5 }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const pickImage = async (source) => {
    try {
      let result;
      
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Izin diperlukan', 'Butuh izin akses kamera');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Izin diperlukan', 'Butuh izin akses galeri');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }
      
      if (!result.canceled) {
        const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
        const fileSizeMB = fileInfo.size / (1024 * 1024);
        
        if (fileSizeMB > maxSizeMB) {
          Alert.alert(
            'File terlalu besar',
            `Maksimal ${maxSizeMB}MB. File Anda ${fileSizeMB.toFixed(2)}MB`
          );
          return;
        }
        
        setImage(result.assets[0].uri);
        if (onImageSelected) {
          onImageSelected(result.assets[0]);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  };
  
  const removeImage = () => {
    setImage(null);
    if (onImageSelected) {
      onImageSelected(null);
    }
  };
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Ionicons name="close-circle" size={24} color={colors.danger} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickImage('camera')}
            disabled={uploading}
          >
            <Ionicons name="camera" size={32} color={colors.primary} />
            <Text style={styles.uploadText}>Ambil Foto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickImage('gallery')}
            disabled={uploading}
          >
            <Ionicons name="images" size={32} color={colors.primary} />
            <Text style={styles.uploadText}>Dari Galeri</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.note}>
        Ukuran maksimal: {maxSizeMB}MB. Format: JPG, PNG
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  uploadButton: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    width: '45%',
  },
  uploadText: {
    marginTop: 8,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  note: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CameraUpload;