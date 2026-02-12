import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardSiswa from '../components/CardSiswa';
import { colors } from '../../styles/colors';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'Ahmad Fauzi',
    'XII IPA 1',
    '2023001',
  ]);
  
  // Data dummy
  const allStudents = [
    { id: '1', nama: 'Ahmad Fauzi', nis: '2023001', kelas: 'XII IPA 1', status: 'Hadir' },
    { id: '2', nama: 'Budi Santoso', nis: '2023002', kelas: 'XII IPA 1', status: 'Izin' },
    { id: '3', nama: 'Citra Dewi', nis: '2023003', kelas: 'XII IPA 2', status: 'Sakit' },
    { id: '4', nama: 'Dian Pratama', nis: '2023004', kelas: 'XII IPA 2', status: 'Alpha' },
    { id: '5', nama: 'Eka Putri', nis: '2023005', kelas: 'XII IPS 1', status: 'Hadir' },
    { id: '6', nama: 'Fajar Nugroho', nis: '2023006', kelas: 'XII IPS 1', status: 'Hadir' },
    { id: '7', nama: 'Gita Maya', nis: '2023007', kelas: 'XII IPS 2', status: 'Izin' },
    { id: '8', nama: 'Hadi Wijaya', nis: '2023008', kelas: 'XII IPS 2', status: 'Sakit' },
  ];
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const results = allStudents.filter(student =>
      student.nama.toLowerCase().includes(text.toLowerCase()) ||
      student.nis.includes(text) ||
      student.kelas.toLowerCase().includes(text.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  const handleSearchSubmit = () => {
    Keyboard.dismiss();
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
  };
  
  const handleRecentSearch = (search) => {
    setSearchQuery(search);
    handleSearch(search);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  
  const removeRecentSearch = (searchToRemove) => {
    setRecentSearches(prev =>
      prev.filter(search => search !== searchToRemove)
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama, NIS, atau kelas..."
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color={colors.gray} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={searchResults.length > 0 ? searchResults : []}
        renderItem={({ item }) => (
          <CardSiswa
            siswa={item}
            onPress={() => console.log('Detail:', item.nama)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {searchQuery ? (
              <>
                <Ionicons name="search-outline" size={64} color={colors.lightGray} />
                <Text style={styles.emptyText}>
                  Tidak ditemukan hasil untuk "{searchQuery}"
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="search-outline" size={64} color={colors.lightGray} />
                <Text style={styles.emptyText}>Cari data siswa</Text>
                
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <View style={styles.recentContainer}>
                    <Text style={styles.recentTitle}>Pencarian Terakhir</Text>
                    {recentSearches.map((search, index) => (
                      <View key={index} style={styles.recentItem}>
                        <TouchableOpacity 
                          style={styles.recentTextContainer}
                          onPress={() => handleRecentSearch(search)}
                        >
                          <Ionicons name="time-outline" size={16} color={colors.gray} />
                          <Text style={styles.recentText}>{search}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeRecentSearch(search)}>
                          <Ionicons name="close" size={16} color={colors.gray} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  listContent: {
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
    textAlign: 'center',
  },
  recentContainer: {
    width: '100%',
    paddingHorizontal: 32,
    marginTop: 32,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
});

export default SearchScreen;