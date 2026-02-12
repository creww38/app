import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import CameraUpload from '../components/CameraUpload';
import { colors } from '../../styles/colors';

const CreateScreen = () => {
  const [formData, setFormData] = useState({
    nis: '',
    nama: '',
    kelas: '',
    tanggalLahir: new Date(),
    alamat: '',
    namaOrtu: '',
    telepon: '',
    foto: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const kelasOptions = [
    'X IPA 1', 'X IPA 2', 'X IPA 3',
    'XI IPA 1', 'XI IPA 2', 'XI IPA 3',
    'XII IPA 1', 'XII IPA 2', 'XII IPA 3',
    'X IPS 1', 'X IPS 2', 'X IPS 3',
    'XI IPS 1', 'XI IPS 2', 'XI IPS 3',
    'XII IPS 1', 'XII IPS 2', 'XII IPS 3',
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('tanggalLahir', selectedDate);
    }
  };

  const validateForm = () => {
    if (!formData.nis.trim()) {
      Alert.alert('Error', 'NIS wajib diisi');
      return false;
    }
    if (!formData.nama.trim()) {
      Alert.alert('Error', 'Nama wajib diisi');
      return false;
    }
    if (!formData.kelas) {
      Alert.alert('Error', 'Kelas wajib dipilih');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Simulasi submit data
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menambahkan data siswa ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Simpan',
          onPress: () => {
            console.log('Data submitted:', formData);
            Alert.alert('Sukses', 'Data siswa berhasil ditambahkan');
            // Reset form
            setFormData({
              nis: '',
              nama: '',
              kelas: '',
              tanggalLahir: new Date(),
              alamat: '',
              namaOrtu: '',
              telepon: '',
              foto: null,
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-add" size={32} color={colors.primary} />
        <Text style={styles.title}>Tambah Data Siswa</Text>
        <Text style={styles.subtitle}>Lengkapi data siswa di bawah ini</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Foto Siswa */}
        <CameraUpload
          label="Foto Siswa"
          onImageSelected={(image) => handleChange('foto', image)}
          maxSizeMB={2}
        />

        {/* NIS */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>NIS *</Text>
          <TextInput
            style={styles.input}
            value={formData.nis}
            onChangeText={(text) => handleChange('nis', text)}
            placeholder="Masukkan NIS"
            keyboardType="numeric"
          />
        </View>

        {/* Nama Lengkap */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nama Lengkap *</Text>
          <TextInput
            style={styles.input}
            value={formData.nama}
            onChangeText={(text) => handleChange('nama', text)}
            placeholder="Masukkan nama lengkap"
          />
        </View>

        {/* Kelas */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Kelas *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.kelas}
              onValueChange={(itemValue) => handleChange('kelas', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Pilih Kelas" value="" />
              {kelasOptions.map((kelas, index) => (
                <Picker.Item key={index} label={kelas} value={kelas} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Tanggal Lahir */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {formData.tanggalLahir.toLocaleDateString('id-ID')}
            </Text>
            <Ionicons name="calendar" size={20} color={colors.primary} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.tanggalLahir}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Alamat */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Alamat</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.alamat}
            onChangeText={(text) => handleChange('alamat', text)}
            placeholder="Masukkan alamat"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Nama Orang Tua */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nama Orang Tua/Wali</Text>
          <TextInput
            style={styles.input}
            value={formData.namaOrtu}
            onChangeText={(text) => handleChange('namaOrtu', text)}
            placeholder="Masukkan nama orang tua/wali"
          />
        </View>

        {/* Nomor Telepon */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nomor Telepon</Text>
          <TextInput
            style={styles.input}
            value={formData.telepon}
            onChangeText={(text) => handleChange('telepon', text)}
            placeholder="Masukkan nomor telepon"
            keyboardType="phone-pad"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Simpan Data Siswa</Text>
        </TouchableOpacity>

        <Text style={styles.note}>* Wajib diisi</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  textArea: {
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

export default CreateScreen;