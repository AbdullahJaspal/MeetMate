import React from 'react';
import Splash from './src/screens/splash';
import Login from './src/screens/auth/Login/Login';
import {SafeAreaView} from 'react-native';
import Signup from './src/screens/auth/Signup/Signup';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Signup />
    </SafeAreaView>
  );
};

export default App;
