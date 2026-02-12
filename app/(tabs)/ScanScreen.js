// src/screens/ScanScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Alert,
  Vibration,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const ScanScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  const [showResult, setShowResult] = useState(false);
  const [scanning, setScanning] = useState(true);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const resultSlideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Kami membutuhkan izin kamera untuk memindai QR Code
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

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      Vibration.vibrate();
      
      // Animasi scan berhasil
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Parse data siswa dari QR code
      try {
        const studentData = JSON.parse(data);
        setScanResult(studentData);
        
        // Show result modal
        setTimeout(() => {
          setShowResult(true);
          Animated.spring(resultSlideAnim, {
            toValue: 0,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }).start();
        }, 500);
      } catch (error) {
        Alert.alert('Error', 'QR Code tidak valid');
        setTimeout(() => setScanned(false), 2000);
      }
    }
  };

  const handleRescan = () => {
    Animated.timing(resultSlideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(false);
      setScanned(false);
      setScanResult(null);
    });
  };

  const handleConfirm = () => {
    // Simpan ke database
    Alert.alert(
      'Konfirmasi',
      `Presensi ${scanResult?.name} berhasil dicatat?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya',
          onPress: () => {
            Animated.timing(resultSlideAnim, {
              toValue: height,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setShowResult(false);
              setScanned(false);
              setScanResult(null);
              navigation.goBack();
            });
          },
        },
      ]
    );
  };

  const toggleFlash = () => {
    setFlashMode(flashMode === 'off' ? 'torch' : 'off');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.cameraContainer, { opacity: fadeAnim }]}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
          flash={flashMode}
        >
          {/* Overlay */}
          <View style={styles.overlay}>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
              
              <Text style={styles.title}>Scan QR Code</Text>
              
              <TouchableOpacity
                style={styles.flashButton}
                onPress={toggleFlash}
              >
                <Icon
                  name={flashMode === 'off' ? 'flash-off' : 'flash'}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            {/* Scanner Frame */}
            <View style={styles.scannerFrame}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
              
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              />
            </View>

            {/* Instructions */}
            <View style={styles.instructions}>
              <Text style={styles.instructionText}>
                Arahkan kamera ke QR Code siswa
              </Text>
              <Text style={styles.subInstruction}>
                Pastikan QR Code berada dalam bingkai
              </Text>
            </View>

            {/* Manual Input */}
            <TouchableOpacity
              style={styles.manualButton}
              onPress={() => navigation.navigate('ManualInput')}
            >
              <Icon name="keyboard-outline" size={20} color="white" />
              <Text style={styles.manualText}>Input Manual</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </Animated.View>

      {/* Result Modal */}
      <Modal
        visible={showResult}
        transparent
        animationType="none"
        onRequestClose={handleRescan}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.resultContainer,
              {
                transform: [{ translateY: resultSlideAnim }],
              },
            ]}
          >
            {/* Success Animation */}
            <LottieView
              source={require('../../assets/animations/success.json')}
              autoPlay
              loop={false}
              style={styles.successAnimation}
            />
            
            <Text style={styles.resultTitle}>Presensi Berhasil!</Text>
            
            <View style={styles.studentInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nama:</Text>
                <Text style={styles.infoValue}>{scanResult?.name}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>NIS:</Text>
                <Text style={styles.infoValue}>{scanResult?.nis}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Kelas:</Text>
                <Text style={styles.infoValue}>{scanResult?.class}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Waktu:</Text>
                <Text style={styles.infoValue}>
                  {new Date().toLocaleTimeString('id-ID')}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rescanButton]}
                onPress={handleRescan}
              >
                <Icon name="refresh" size={20} color="#667eea" />
                <Text style={styles.rescanText}>Scan Lagi</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Icon name="check-circle" size={20} color="white" />
                <Text style={styles.confirmText}>Konfirmasi</Text>
              </TouchableOpacity>
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
    backgroundColor: 'black',
  },
  permissionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  flashButton: {
    padding: 10,
  },
  scannerFrame: {
    width: width * 0.7,
    height: width * 0.7,
    alignSelf: 'center',
    marginTop: 50,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#667eea',
    borderTopLeftRadius: 20,
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#667eea',
    borderTopRightRadius: 20,
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#667eea',
    borderBottomLeftRadius: 20,
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#667eea',
    borderBottomRightRadius: 20,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  instructions: {
    alignItems: 'center',
    marginTop: 40,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  subInstruction: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
  },
  manualText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    minHeight: height * 0.6,
  },
  successAnimation: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  studentInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 15,
  },
  rescanButton: {
    backgroundColor: '#f0f4ff',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  confirmButton: {
    backgroundColor: '#667eea',
  },
  rescanText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ScanScreen;