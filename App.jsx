import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Using React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store/store.js';

const Stack = createNativeStackNavigator();

function App() {
 // Assuming selectUsers or another selector returns the authentication state
 const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

 return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              {/* Add other screens here */}
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginPage} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
 );
}

export default App;