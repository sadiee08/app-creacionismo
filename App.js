import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native'; // Using React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { auth } from './firebase/config.js';
import Ionicons from '@expo/vector-icons/Ionicons';

import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import Logout from "./funcs/logout/logout.jsx";
import Menu from "./components/menu/menu.jsx";
import Producto from "./components/producto/index.jsx";
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const getIsSignedIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });

    return unsubscribe;
  }, []);

  return isSignedIn;
};

function StackRoutes() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Catalogos" component={Menu} initialParams={{ url: 'pedestales' }} />
      <Stack.Screen name="pedestales" component={Producto} initialParams={{ producto: 'pedestales', titulo: "Pedestales" }} />
      <Stack.Screen name="maceta-aire" component={Producto} initialParams={{ producto: 'maceta-aire', titulo: "Macetas Aire" }} />
    </Stack.Navigator>
  );
}

const App = () => {
  const isSignedIn = getIsSignedIn();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#F6F6F6', // Background color
            },
            drawerActiveTintColor: '#AEB879', // Color for active item
            drawerInactiveTintColor: '#888', // Color for inactive items
          }}
        >
          {isSignedIn ? (
            <>
              <Drawer.Screen name="Home" component={Home}
                options={{
                  drawerIcon: ({ color = "black", size = 24 }) => (<Ionicons name="home" size={size} color={color} />),
                  headerStyle: {
                    backgroundColor: '#AEB879',
                  },
                  headerTintColor: '#FFFFFF',
                }} />

              <Drawer.Screen name="Catálogos" component={StackRoutes}
                options={{
                  drawerIcon: ({ color = "black", size = 24 }) => (<Ionicons name="book" size={size} color={color} />),
                  headerStyle: {
                    backgroundColor: '#AEB879',
                  },
                  headerTintColor: '#FFFFFF',
                }} />
                
              <Drawer.Screen name="Logout" component={Logout}
                options={{
                  drawerIcon: ({ color = "black", size = 24 }) => (<Ionicons name="log-out" size={size} color={color} />),
                  headerStyle: {
                    backgroundColor: '#AEB879',
                  },
                  headerTintColor: '#FFFFFF',
                }} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;