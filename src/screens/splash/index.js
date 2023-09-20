import React from 'react';
import {Image, View} from 'react-native';

function Splash() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{width: 320, height: 320}}></Image>
    </View>
  );
}
export default Splash;
