import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from 'react-query';
import { envConstants } from '@consts/consts';

import * as Sentry from '@sentry/react-native';

import { ApodScreen } from '@screens/Apod/Apod';
import { HomeScreen } from '@screens/Home/Home';
import { RoversScreen } from '@screens/Rovers/Rovers';
import { GalaxiesScreen } from '@screens/Galaxies/Galaxies';

import { Colors } from '@consts/consts';
import { useGlobalStore } from '@store/store';
import { LoadingSpinner } from '@components/LoadingSpinner/LoadingSpinner';

Sentry.init({
  dsn: envConstants.sentryDsn,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const queryClient = new QueryClient();
const Drawer = createDrawerNavigator();

// Menu lateral
const CustomDrawerContent = ({ navigation }: any) => {
  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.navigate('Apod')}>
        <Text style={styles.drawerText}>Astronomy Picture Of the Day</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.navigate('Galaxies')}>
        <Text style={styles.drawerText}>Galaxies</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.navigate('Rovers')}>
        <Text style={styles.drawerText}>Rovers</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenOptions = ({ navigation }: any) => ({
  headerStyle: {
    backgroundColor: '#1a1a1a', // Cor do header
  },
  headerTitleStyle: {
    fontSize: 24,
  },
  headerTintColor: Colors.purple, // Cor do texto e ícones no header
  headerLeft: () => (
    <TouchableOpacity
      style={{
        marginLeft: 10,
      }}
      onPress={() => navigation.toggleDrawer()}
    >
      <MaterialIcons name="menu" size={30} color={Colors.purple} />
    </TouchableOpacity>
  ),
});

// Navegação com Menu Lateral
const AppNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={screenOptions} />
      <Drawer.Screen name="Apod" component={ApodScreen} options={screenOptions} />
      <Drawer.Screen name="Galaxies" component={GalaxiesScreen} options={screenOptions} />
      <Drawer.Screen name="Rovers" component={RoversScreen} options={screenOptions} />
    </Drawer.Navigator>
  );
};

function App() {
  const { globalLoading } = useGlobalStore();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
        {globalLoading && <LoadingSpinner />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: Colors.darkGray,
  },
  drawerButton: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: Colors.purple,
    borderRadius: 8,
  },
  drawerText: {
    fontSize: 18,
    color: '#fff',
  },
});
