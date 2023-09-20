import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';

import {appleAuth} from '@invertase/react-native-apple-authentication';

const images = [
  require('../../../assets/images/image1.jpeg'),
  require('../../../assets/images/image2.jpeg'),
  require('../../../assets/images/image3.jpeg'),
  require('../../../assets/images/image4.jpeg'),
  require('../../../assets/images/image5.jpeg'),
  require('../../../assets/images/image6.jpeg'),
];

const Login = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const overlayColors = [
    '#FF5733',
    '#33FFA8',
    '#3366FF',
    '#FF33D6',
    '#33A8FF',
    '#FF8833',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '636909097056-ov13evqcs9d3tspbaopdpe95njgu1667.apps.googleusercontent.com',
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  async function onAppleButtonPress() {
    // performs login request
    return appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })
      .then(appleAuthRequestResponse => {
        let {identityToken, email} = appleAuthRequestResponse;
        console.log('identityToken =========>', identityToken);
        console.log('email =========>', email);
      });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(
    //   appleAuthRequestResponse.user,
    // );

    // use credentialState response to ensure the user is authenticated
  }
  const handleGoogleSignIn = async () => {
    const result = await GoogleSignin.signIn();

    console.log(result);
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{width: '100%', height: '100%', justifyContent: 'space-between'}}
        source={images[imageIndex]}>
        <View
          style={[styles.overlay, {backgroundColor: overlayColors[imageIndex]}]}
        />
        <View>
          <Image
            source={require('../../../assets/images/meetMate.png')}
            style={styles.name}></Image>
          <Image
            source={require('../../../assets/images/tagline.png')}
            style={styles.tagline}
          />
        </View>
        <View
          style={{
            width: '90%',
            height: '50%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleGoogleSignIn();
            }}
            style={[styles.socialTab]}>
            <Image
              source={require('../../../assets/images/google.png')}
              style={styles.icon}
            />
            <View style={styles.tabTextCont}>
              <Text style={styles.tabText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialTab]}>
            <Image
              source={require('../../../assets/images/facebook.png')}
              style={styles.icon}
            />
            <View style={styles.tabTextCont}>
              <Text style={styles.tabText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onAppleButtonPress();
            }}
            style={[styles.socialTab]}>
            <Image
              source={require('../../../assets/images/apple.png')}
              style={styles.icon}
            />
            <View style={styles.tabTextCont}>
              <Text style={styles.tabText}>Continue with Apple</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  name: {
    width: '45%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -40,
    tintColor: 'white',
  },
  tagline: {
    width: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -70,
    tintColor: 'white',
  },
  socialTab: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  icon: {width: '15%', height: 30, resizeMode: 'contain'},
  tabTextCont: {
    backgroundColor: 'white',
    width: '77%',
    height: 40,
    borderRadius: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
export default Login;
