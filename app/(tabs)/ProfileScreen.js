import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../styles/colors';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    nama: 'Ahmad Fauzi',
    nis: '2023001',
    kelas: 'XII IPA 1',
    email: 'ahmad.fauzi@example.com',
    telepon: '081234567890',
    alamat: 'Jl. Merdeka No. 123, Jakarta',
    foto: null,
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    biometricLogin: false,
  });

  const menuItems = [
    {
      title: 'Akun',
      icon: 'person-circle',
      items: [
        { icon: 'lock-closed', label: 'Ubah Password', action: () => console.log('Ubah Password') },
        { icon: 'mail', label: 'Email', action: () => console.log('Email') },
        { icon: 'call', label: 'Nomor Telepon', action: () => console.log('Telepon') },
      ],
    },
    {
      title: 'Aplikasi',
      icon: 'settings',
      items: [
        { icon: 'notifications', label: 'Notifikasi', type: 'switch', key: 'notifications' },
        { icon: 'moon', label: 'Mode Gelap', type: 'switch', key: 'darkMode' },
        { icon: 'sync', label: 'Sinkronisasi Otomatis', type: 'switch', key: 'autoSync' },
        { icon: 'finger-print', label: 'Login Biometrik', type: 'switch', key: 'biometricLogin' },
        { icon: 'language', label: 'Bahasa', value: 'Indonesia', action: () => console.log('Bahasa') },
      ],
    },
    {
      title: 'Lainnya',
      icon: 'ellipsis-horizontal',
      items: [
        { icon: 'help-circle', label: 'Bantuan', action: () => console.log('Bantuan') },
        { icon: 'document-text', label: 'Ketentuan Layanan', action: () => console.log('Ketentuan') },
        { icon: 'shield-checkmark', label: 'Kebijakan Privasi', action: () => console.log('Privasi') },
        { icon: 'information-circle', label: 'Tentang Aplikasi', action: () => console.log('Tentang') },
      ],
    },
  ];

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin diperlukan', 'Butuh izin akses galeri');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUserData(prev => ({ ...prev, foto: result.assets[0].uri }));
    }
  };

  const handleSettingToggle = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {userData.foto ? (
            <Image source={{ uri: userData.foto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color={colors.white} />
            </View>
          )}
          <View style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color={colors.white} />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{userData.nama}</Text>
        <Text style={styles.nis}>{userData.nis}</Text>
        <Text style={styles.kelas}>{userData.kelas}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={16} color={colors.primary} />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Info Kontak */}
      <View style={styles.infoCard}>
        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userData.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Text style={styles.infoLabel}>Telepon</Text>
          <Text style={styles.infoValue}>{userData.telepon}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.infoLabel}>Alamat</Text>
          <Text style={styles.infoValue} numberOfLines={2}>{userData.alamat}</Text>
        </View>
      </View>

      {/* Menu Settings */}
      {menuItems.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name={section.icon} size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <View style={styles.menuCard}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.menuItem}
                onPress={item.action}
                disabled={!item.action && item.type !== 'switch'}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon} size={22} color={colors.textSecondary} />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <View style={styles.menuItemRight}>
                  {item.type === 'switch' ? (
                    <Switch
                      value={settings[item.key]}
                      onValueChange={(value) => handleSettingToggle(item.key, value)}
                      trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
                      thumbColor={settings[item.key] ? colors.primary : colors.gray}
                    />
                  ) : item.value ? (
                    <Text style={styles.menuValue}>{item.value}</Text>
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={colors.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Version Info */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Versi 1.0.0</Text>
        <Text style={styles.copyright}>© 2024 Absensi Siswa Mobile</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  nis: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  kelas: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
  },
  editButtonText: {
    marginLeft: 8,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    width: 80,
    marginLeft: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 16,
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.danger,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    padding: 24,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  copyright: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default ProfileScreen;