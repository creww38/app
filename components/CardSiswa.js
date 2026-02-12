import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const CardSiswa = ({ siswa, onPress, onAbsen }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Hadir': return colors.success;
      case 'Izin': return colors.warning;
      case 'Sakit': return colors.info;
      case 'Alpha': return colors.danger;
      default: return colors.gray;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={40} color={colors.primary} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nama}>{siswa.nama}</Text>
          <Text style={styles.nis}>{siswa.nis}</Text>
          <Text style={styles.kelas}>{siswa.kelas}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(siswa.status) }
          ]}>
            <Text style={styles.statusText}>{siswa.status || 'Belum'}</Text>
          </View>
          {onAbsen && (
            <TouchableOpacity 
              style={styles.absenButton}
              onPress={() => onAbsen(siswa)}
            >
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nama: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  nis: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  kelas: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  absenButton: {
    padding: 4,
  },
});

export default CardSiswa;