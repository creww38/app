import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    checkAuthState();
  }, []);
  
  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user_data');
      const token = await AsyncStorage.getItem('@auth_token');
      
      if (userData && token) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Simulasi API call untuk login
      // Dalam implementasi nyata, ini akan memanggil API backend
      const { username, password } = credentials;
      
      // Validasi sederhana (contoh)
      if (!username || !password) {
        throw new Error('Username dan password harus diisi');
      }
      
      // Contoh data user (dalam implementasi nyata, data ini dari API)
      const mockUser = {
        id: '1',
        username: username,
        nama: 'Ahmad Fauzi',
        role: 'guru', // atau 'siswa', 'admin'
        kelas: 'XII IPA 1',
        nis: '2023001',
        email: `${username}@sekolah.com`,
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Simpan ke AsyncStorage
      await AsyncStorage.setItem('@user_data', JSON.stringify(mockUser));
      await AsyncStorage.setItem('@auth_token', mockToken);
      await AsyncStorage.setItem('@last_login', new Date().toISOString());
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Gagal', error.message || 'Terjadi kesalahan saat login');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginWithGoogle = async (googleData) => {
    try {
      setIsLoading(true);
      
      // Simulasi login dengan Google
      // Dalam implementasi nyata, kirim token ke backend untuk verifikasi
      const mockUser = {
        id: googleData.user.id || 'google-1',
        username: googleData.user.email.split('@')[0],
        nama: googleData.user.name,
        role: 'guru',
        kelas: null,
        nis: null,
        email: googleData.user.email,
        photo: googleData.user.photo,
        isGoogleLogin: true,
      };
      
      const mockToken = 'google-jwt-token-' + Date.now();
      
      await AsyncStorage.setItem('@user_data', JSON.stringify(mockUser));
      await AsyncStorage.setItem('@auth_token', mockToken);
      await AsyncStorage.setItem('@last_login', new Date().toISOString());
      await AsyncStorage.setItem('@login_method', 'google');
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Login Gagal', 'Gagal login dengan Google');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Hapus semua data auth dari AsyncStorage
      await AsyncStorage.multiRemove([
        '@user_data',
        '@auth_token',
        '@last_login',
        '@login_method',
      ]);
      
      setUser(null);
      setIsAuthenticated(false);
      
      Alert.alert('Berhasil', 'Anda telah logout');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulasi registrasi
      // Dalam implementasi nyata, kirim data ke backend
      const { nama, email, password, confirmPassword, role } = userData;
      
      // Validasi
      if (password !== confirmPassword) {
        throw new Error('Password dan konfirmasi password tidak sama');
      }
      
      if (password.length < 6) {
        throw new Error('Password minimal 6 karakter');
      }
      
      const newUser = {
        id: 'new-' + Date.now(),
        username: email.split('@')[0],
        nama,
        role: role || 'siswa',
        email,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      
      // Dalam implementasi nyata, simpan ke backend
      // Untuk sekarang, langsung login setelah registrasi
      const loginResult = await login({ username: email, password });
      
      if (loginResult.success) {
        Alert.alert('Registrasi Berhasil', 'Akun Anda telah dibuat');
      }
      
      return loginResult;
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registrasi Gagal', error.message || 'Terjadi kesalahan saat registrasi');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      
      // Simulasi update profile
      const updatedUser = { ...user, ...profileData };
      
      await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      Alert.alert('Berhasil', 'Profile berhasil diperbarui');
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('Gagal', 'Gagal memperbarui profile');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const changePassword = async (passwordData) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = passwordData;
      
      if (newPassword !== confirmPassword) {
        throw new Error('Password baru dan konfirmasi tidak sama');
      }
      
      if (newPassword.length < 6) {
        throw new Error('Password baru minimal 6 karakter');
      }
      
      // Simulasi ganti password
      // Dalam implementasi nyata, kirim ke backend
      Alert.alert('Berhasil', 'Password berhasil diubah');
      return { success: true };
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert('Gagal', error.message || 'Gagal mengubah password');
      return { success: false, error: error.message };
    }
  };
  
  const resetPassword = async (email) => {
    try {
      // Simulasi reset password
      // Dalam implementasi nyata, kirim email ke backend
      Alert.alert(
        'Reset Password',
        'Link reset password telah dikirim ke email Anda'
      );
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert('Gagal', 'Gagal mengirim link reset password');
      return { success: false, error: error.message };
    }
  };
  
  const getUserRole = () => {
    return user?.role || 'guest';
  };
  
  const hasPermission = (requiredRole) => {
    const userRole = getUserRole();
    const roleHierarchy = {
      admin: 3,
      guru: 2,
      siswa: 1,
      guest: 0,
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        loginWithGoogle,
        logout,
        register,
        updateProfile,
        changePassword,
        resetPassword,
        getUserRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;