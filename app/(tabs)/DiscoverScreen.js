import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AnimatedHeader from '../components/AnimatedHeader';
import CardSiswa from '../components/CardSiswa';
import { colors } from '../../../styles/colors';

const DiscoverScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedFilter, setSelectedFilter] = useState('semua');
  
  // Data dummy untuk contoh
  const [siswaData, setSiswaData] = useState([
    { id: '1', nama: 'Ahmad Fauzi', nis: '2023001', kelas: 'XII IPA 1', status: 'Hadir' },
    { id: '2', nama: 'Budi Santoso', nis: '2023002', kelas: 'XII IPA 1', status: 'Izin' },
    { id: '3', nama: 'Citra Dewi', nis: '2023003', kelas: 'XII IPA 1', status: 'Sakit' },
    { id: '4', nama: 'Dian Pratama', nis: '2023004', kelas: 'XII IPA 1', status: 'Alpha' },
    { id: '5', nama: 'Eka Putri', nis: '2023005', kelas: 'XII IPA 2', status: 'Hadir' },
    { id: '6', nama: 'Fajar Nugroho', nis: '2023006', kelas: 'XII IPA 2', status: 'Hadir' },
    { id: '7', nama: 'Gita Maya', nis: '2023007', kelas: 'XII IPA 2', status: 'Izin' },
    { id: '8', nama: 'Hadi Wijaya', nis: '2023008', kelas: 'XII IPA 2', status: 'Sakit' },
  ]);
  
  const filters = [
    { id: 'semua', label: 'Semua' },
    { id: 'hadir', label: 'Hadir' },
    { id: 'izin', label: 'Izin' },
    { id: 'sakit', label: 'Sakit' },
    { id: 'alpha', label: 'Alpha' },
  ];
  
  const filteredData = siswaData.filter(siswa => {
    if (selectedFilter === 'semua') return true;
    return siswa.status.toLowerCase() === selectedFilter;
  });
  
  const stats = {
    total: siswaData.length,
    hadir: siswaData.filter(s => s.status === 'Hadir').length,
    izin: siswaData.filter(s => s.status === 'Izin').length,
    sakit: siswaData.filter(s => s.status === 'Sakit').length,
    alpha: siswaData.filter(s => s.status === 'Alpha').length,
  };
  
  const handleAbsen = (siswa) => {
    // Implementasi absensi
    console.log('Absensi untuk:', siswa.nama);
  };
  
  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(filter.id)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === filter.id && styles.filterTextActive,
        ]}
      >
        {filter.label}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <AnimatedHeader title="Discover" scrollY={scrollY} />
      
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Total Siswa</Text>
            <Text style={styles.statsValue}>{stats.total}</Text>
          </View>
          <View style={[styles.statsCard, { backgroundColor: colors.successLight }]}>
            <Text style={styles.statsTitle}>Hadir</Text>
            <Text style={[styles.statsValue, { color: colors.success }]}>
              {stats.hadir}
            </Text>
          </View>
          <View style={[styles.statsCard, { backgroundColor: colors.warningLight }]}>
            <Text style={styles.statsTitle}>Izin</Text>
            <Text style={[styles.statsValue, { color: colors.warning }]}>
              {stats.izin}
            </Text>
          </View>
          <View style={[styles.statsCard, { backgroundColor: colors.infoLight }]}>
            <Text style={styles.statsTitle}>Sakit</Text>
            <Text style={[styles.statsValue, { color: colors.info }]}>
              {stats.sakit}
            </Text>
          </View>
          <View style={[styles.statsCard, { backgroundColor: colors.dangerLight }]}>
            <Text style={styles.statsTitle}>Alpha</Text>
            <Text style={[styles.statsValue, { color: colors.danger }]}>
              {stats.alpha}
            </Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(renderFilterButton)}
        </ScrollView>

        {/* List Siswa */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Daftar Siswa ({filteredData.length})
          </Text>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <CardSiswa
                siswa={item}
                onAbsen={handleAbsen}
                onPress={() => console.log('Detail:', item.nama)}
              />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  statsCard: {
    width: '18%',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  statsTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  filtersContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filtersContent: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  listContainer: {
    marginTop: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 12,
  },
});

export default DiscoverScreen;