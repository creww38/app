import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Screens - imported from app/(tabs) directory
import DashboardScreen from '../app/(tabs)/dashboardscreen';
import ScanScreen from '../app/(tabs)/scanscreen';
import DiscoverScreen from '../app/(tabs)/discoverscreen';
import SearchScreen from '../app/(tabs)/searchscreen';
import CreateScreen from '../app/(tabs)/createscreen';
import RulesScreen from '../app/(tabs)/rulesscreen';
import ProfileScreen from '../app/(tabs)/profilescreen';

// Components
import BottomTabBar from '../components/BottomTabBar';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DashboardMain"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ScanStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ScanMain"
      component={ScanScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const DiscoverStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DiscoverMain"
      component={DiscoverScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchMain"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const CreateStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CreateMain"
      component={CreateScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const RulesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="RulesMain"
      component={RulesScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileMain"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
        },
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardStack}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Scan" 
        component={ScanStack}
        options={{
          title: 'Scan',
        }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverStack}
        options={{
          title: 'Discover',
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchStack}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen 
        name="Create" 
        component={CreateStack}
        options={{
          title: 'Create',
        }}
      />
      <Tab.Screen 
        name="Rules" 
        component={RulesStack}
        options={{
          title: 'Rules',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;