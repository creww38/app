import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const RulesScreen = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const rulesSections = [
    {
      id: 'kehadiran',
      title: 'Peraturan Kehadiran',
      icon: 'time',
      content: [
        'Siswa harus hadir paling lambat 15 menit sebelum pelajaran dimulai',
        'Keterlambatan lebih dari 30 menit dianggap terlambat dan perlu surat izin',
        'Absen tanpa keterangan maksimal 3 hari dalam satu bulan',
        'Izin sakit harus disertai surat dokter',
        'Izin keluarga maksimal 2 hari dengan surat dari orang tua/wali',
      ],
    },
    {
      id: 'seragam',
      title: 'Peraturan Seragam',
      icon: 'shirt',
      content: [
        'Senin-Kamis: Seragam putih abu-abu lengkap dengan dasi',
        'Jumat: Seragam batik sekolah',
        'Sabtu: Seragam pramuka/ekstrakurikuler',
        'Sepatu hitam polos, kaos kaki putih',
        'Rambut rapi dan sesuai ketentuan sekolah',
      ],
    },
    {
      id: 'perilaku',
      title: 'Perilaku dan Tata Tertib',
      icon: 'school',
      content: [
        'Menghormati guru dan staf sekolah',
        'Tidak membawa smartphone saat jam pelajaran',
        'Tidak merokok di area sekolah',
        'Menjaga kebersihan kelas dan lingkungan sekolah',
        'Mengikuti upacara bendera setiap hari Senin',
      ],
    },
    {
      id: 'akademik',
      title: 'Ketentuan Akademik',
      icon: 'book',
      content: [
        'Nilai minimal untuk setiap mata pelajaran: 75',
        'Kehadiran minimal 85% untuk mengikuti ujian',
        'Tugas harus dikumpulkan tepat waktu',
        'Tidak menyontek saat ujian',
        'Perpustakaan buka jam 07.00 - 15.00',
      ],
    },
    {
      id: 'sanksi',
      title: 'Sanksi Pelanggaran',
      icon: 'warning',
      content: [
        'Terlambat 3x: Peringatan lisan',
        'Terlambat 5x: Panggilan orang tua',
        'Tidak seragam: Tidak diperbolehkan masuk kelas',
        'Membawa smartphone: Disita sampai akhir semester',
        'Berkelahi: Skorsing minimal 3 hari',
      ],
    },
  ];

  const importantDates = [
    { date: '1 Januari', event: 'Tahun Baru' },
    { date: '10-15 Maret', event: 'UTS Genap' },
    { date: '17 April', event: 'Hari Pendidikan' },
    { date: '1 Mei', event: 'Hari Buruh' },
    { date: '20-25 Mei', event: 'UAS Genap' },
    { date: '17 Agustus', event: 'HUT RI' },
    { date: '1 September', event: 'Awal Tahun Ajaran' },
    { date: '10-15 November', event: 'UTS Ganjil' },
    { date: '25 Desember', event: 'Natal' },
  ];

  const emergencyContacts = [
    { name: 'Bapak Guru Piket', phone: '081234567890' },
    { name: 'Ibu TU', phone: '081234567891' },
    { name: 'UKS', phone: '081234567892' },
    { name: 'Satpam', phone: '081234567893' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="document-text" size={32} color={colors.primary} />
        <Text style={styles.title}>Tata Tertib Sekolah</Text>
        <Text style={styles.subtitle}>Tahun Ajaran 2023/2024</Text>
      </View>

      {/* Peraturan Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Peraturan Sekolah</Text>
        {rulesSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.ruleCard}
            onPress={() => toggleSection(section.id)}
            activeOpacity={0.7}
          >
            <View style={styles.ruleHeader}>
              <View style={styles.ruleIconContainer}>
                <Ionicons name={section.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.ruleTitle}>{section.title}</Text>
              <Ionicons
                name={expandedSections[section.id] ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.gray}
              />
            </View>
            
            {expandedSections[section.id] && (
              <View style={styles.ruleContent}>
                {section.content.map((item, index) => (
                  <View key={index} style={styles.ruleItem}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                    <Text style={styles.ruleText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Kalender Akademik */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kalender Akademik</Text>
        <View style={styles.calendarCard}>
          {importantDates.map((item, index) => (
            <View key={index} style={styles.dateItem}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Text style={styles.eventText}>{item.event}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Kontak Darurat */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kontak Darurat</Text>
        <View style={styles.contactsCard}>
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
            >
              <View style={styles.contactInfo}>
                <Ionicons name="person-circle" size={24} color={colors.primary} />
                <Text style={styles.contactName}>{contact.name}</Text>
              </View>
              <View style={styles.contactAction}>
                <Ionicons name="call" size={20} color={colors.success} />
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Catatan */}
      <View style={styles.notesSection}>
        <Ionicons name="information-circle" size={24} color={colors.info} />
        <Text style={styles.notesText}>
          Semua peraturan berlaku efektif sejak tanggal 1 September 2023.
          Perubahan akan diinformasikan melalui pengumuman resmi sekolah.
        </Text>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  ruleCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruleIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ruleTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  ruleContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  calendarCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateContainer: {
    width: 100,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  eventText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  contactsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactName: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  contactAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactPhone: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.success,
  },
  notesSection: {
    flexDirection: 'row',
    backgroundColor: colors.infoLight,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  notesText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: colors.info,
    lineHeight: 20,
  },
});

export default RulesScreen;