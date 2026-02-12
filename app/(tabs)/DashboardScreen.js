// src/screens/DashboardScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonLoader from '../components/SkeletonLoader';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Simulasi loading data
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Header animasi
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [220, 120],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const featuredData = [
    {
      id: 1,
      name: 'Abdul Aziz',
      class: 'XI fase F',
      time: '30 mins ago',
      status: 'Hadir',
      statusColor: '#4CAF50',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      name: 'Siti Rahayu',
      class: 'XI IPS 2',
      time: '1 hour ago',
      status: 'Terlambat',
      statusColor: '#FF9800',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 3,
      name: 'Budi Santoso',
      class: 'X IPA 3',
      time: '2 hours ago',
      status: 'Izin',
      statusColor: '#2196F3',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
  ];

  const todayData = [
    { id: 1, name: 'Kehadiran Hari Ini', count: 245, color: '#4CAF50' },
    { id: 2, name: 'Siswa Terlambat', count: 12, color: '#FF9800' },
    { id: 3, name: 'Tidak Hadir', count: 8, color: '#F44336' },
    { id: 4, name: 'Persentase', count: 96, color: '#2196F3', suffix: '%' },
  ];

  const QuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Scan')}
      >
        <View style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}>
          <Icon name="qrcode-scan" size={24} color="white" />
        </View>
        <Text style={styles.actionText}>Scan QR</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <View style={[styles.actionIcon, { backgroundColor: '#2196F3' }]}>
          <Icon name="camera" size={24} color="white" />
        </View>
        <Text style={styles.actionText}>Foto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Create')}
      >
        <View style={[styles.actionIcon, { backgroundColor: '#9C27B0' }]}>
          <Icon name="plus-circle" size={24} color="white" />
        </View>
        <Text style={styles.actionText}>Tambah</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Reports')}
      >
        <View style={[styles.actionIcon, { backgroundColor: '#FF9800' }]}>
          <Icon name="chart-bar" size={24} color="white" />
        </View>
        <Text style={styles.actionText}>Laporan</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greeting}>Selamat Pagi,</Text>
              <Text style={styles.userName}>AZIZ GANTENG </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell-outline" size={24} color="white" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        
        <QuickActions />
      </Animated.View>

      {/* Content */}
      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Presensi Terbaru</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <SkeletonLoader type="featured" />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.featuredScroll}
            >
              {featuredData.map((item) => (
                <TouchableOpacity key={item.id} style={styles.featuredCard}>
                  <View style={styles.cardHeader}>
                    <Image source={{ uri: item.avatar }} style={styles.cardAvatar} />
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardName}>{item.name}</Text>
                      <Text style={styles.cardClass}>{item.class}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.statusContainer}>
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: item.statusColor },
                        ]}
                      />
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Today's Stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Statistik Hari Ini</Text>
          </View>
          
          {loading ? (
            <SkeletonLoader type="stats" />
          ) : (
            <View style={styles.statsGrid}>
              {todayData.map((stat) => (
                <View key={stat.id} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <Text style={[styles.statCount, { color: stat.color }]}>
                      {stat.count}{stat.suffix || ''}
                    </Text>
                  </View>
                  <Text style={styles.statName}>{stat.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>
          </View>
          
          {loading ? (
            <SkeletonLoader type="activity" />
          ) : (
            <View style={styles.activityList}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <Icon name="check-circle" size={24} color="#4CAF50" />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>
                      Presensi berhasil dicatat
                    </Text>
                    <Text style={styles.activityTime}>10:30 AM • Kelas XI Fase F</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#667eea',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },
  featuredScroll: {
    marginHorizontal: -5,
  },
  featuredCard: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardClass: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  statIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statName: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  activityList: {
    marginTop: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default DashboardScreen;