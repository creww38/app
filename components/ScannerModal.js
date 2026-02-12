import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const ScannerModal = ({ visible, onClose, onScan }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (visible) {
      requestPermission();
    }
  }, [visible]);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-off" size={64} color={colors.gray} />
          <Text style={styles.permissionText}>
            Butuh akses kamera untuk memindai QR code
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Izinkan Kamera</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.permissionButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (isScanning) {
      setIsScanning(false);
      Alert.alert(
        'QR Code Terdeteksi',
        `Data: ${data}`,
        [
          {
            text: 'Scan Lagi',
            onPress: () => setIsScanning(true),
          },
          {
            text: 'Selesai',
            onPress: () => {
              onScan(data);
              onClose();
            },
          },
        ]
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Scan QR Code</Text>
          <View style={{ width: 28 }} />
        </View>

        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        >
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>
              Arahkan kamera ke QR Code siswa
            </Text>
          </View>
        </CameraView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            QR Code akan otomatis terdeteksi
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: colors.black,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  scanText: {
    color: colors.white,
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  footerText: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.7,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: colors.textPrimary,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  permissionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  cancelButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScannerModal;