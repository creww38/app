import * as BarcodeScanner from 'expo-barcode-scanner';

export const requestCameraPermission = async () => {
  try {
    const { status } = await BarcodeScanner.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

export const scanBarcode = async () => {
  try {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      throw new Error('Camera permission not granted');
    }
    
    const result = await BarcodeScanner.scanFromURLAsync(
      'https://example.com/qr-code.png',
      [BarcodeScanner.BarCodeType.qr]
    );
    
    if (result && result.length > 0) {
      return result[0].data;
    }
    
    return null;
  } catch (error) {
    console.error('Error scanning barcode:', error);
    throw error;
  }
};

export const generateQRCodeData = (studentData) => {
  // Format data siswa untuk QR Code
  const qrData = {
    nis: studentData.nis,
    nama: studentData.nama,
    kelas: studentData.kelas,
    timestamp: new Date().toISOString(),
  };
  
  return JSON.stringify(qrData);
};

export const parseQRCodeData = (qrData) => {
  try {
    const data = JSON.parse(qrData);
    
    // Validasi data yang diperlukan
    const requiredFields = ['nis', 'nama', 'kelas'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Data QR Code tidak lengkap. Field yang hilang: ${missingFields.join(', ')}`);
    }
    
    return {
      nis: data.nis,
      nama: data.nama,
      kelas: data.kelas,
      timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      isValid: true,
    };
  } catch (error) {
    console.error('Error parsing QR code data:', error);
    return {
      isValid: false,
      error: error.message,
      rawData: qrData,
    };
  }
};

export const validateAttendanceQR = (qrData, studentList) => {
  const parsedData = parseQRCodeData(qrData);
  
  if (!parsedData.isValid) {
    return {
      success: false,
      message: 'QR Code tidak valid',
      error: parsedData.error,
    };
  }
  
  // Cari siswa berdasarkan NIS
  const student = studentList.find(s => s.nis === parsedData.nis);
  
  if (!student) {
    return {
      success: false,
      message: 'Siswa tidak ditemukan',
      data: parsedData,
    };
  }
  
  // Validasi data
  if (student.nama !== parsedData.nama || student.kelas !== parsedData.kelas) {
    return {
      success: false,
      message: 'Data tidak sesuai',
      expected: student,
      received: parsedData,
    };
  }
  
  // Validasi timestamp (maksimal 5 menit yang lalu)
  const qrTime = new Date(parsedData.timestamp);
  const currentTime = new Date();
  const timeDiff = (currentTime - qrTime) / (1000 * 60); // dalam menit
  
  if (timeDiff > 5) {
    return {
      success: false,
      message: 'QR Code sudah kadaluarsa',
      timeDiff: Math.round(timeDiff),
    };
  }
  
  return {
    success: true,
    message: 'Validasi berhasil',
    student: student,
    timestamp: parsedData.timestamp,
  };
};

export const QRCodeTypes = {
  STUDENT_ATTENDANCE: 'student_attendance',
  CLASS_INFO: 'class_info',
  EMERGENCY_CONTACT: 'emergency_contact',
};

export const createQRCodePayload = (type, data) => {
  const payload = {
    version: '1.0',
    type: type,
    data: data,
    timestamp: new Date().toISOString(),
    app: 'AbsensiSiswaMobile',
  };
  
  return JSON.stringify(payload);
};