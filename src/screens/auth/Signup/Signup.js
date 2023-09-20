import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

const Signup = () => {
  const [image1, setImage1] = useState('');

  useEffect(() => {
    console.log(image1);
  });

  // custom comps

  const InputFields = ({
    title,
    placeholder,
    value,
    setValue,
    height,
    multiline,
    textAlignVertical,
  }) => {
    return (
      <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
        <Text style={{fontWeight: '600', color: '#333333'}}>{title}</Text>
        <TextInput
          style={[styles.inputFields, {height: height}]}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          multiline={multiline}
        />
      </View>
    );
  };
  const ImagePickr = ({select, setSelected}) => {
    return (
      <TouchableOpacity
        style={styles.imageTab}
        onPress={() => {
          gallery(setSelected);
        }}>
        <View style={styles.image}>
          <Image style={styles.image} source={{uri: select.path}} />
          <TouchableOpacity
            style={styles.minus}
            onPress={() => {
              setSelected('');
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../../../assets/images/minus.png')}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const gallery = setSelected => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      var filename = image.path.replace(/^.*[\\\/]/, '');
      const data = {type: image.mime, path: image.path, name: filename};
      console.log(data);
      setSelected(data);
    });
  };

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../../assets/images/signup.jpg')}
        style={styles.topImage}
      />
      <View
        style={{
          borderColor: '#E3E9F2',
          borderWidth: 1,
          width: '95%',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 18, fontWeight: '700', color: '#333333'}}>
          Sign-up
        </Text>
        <View style={styles.cameraIconCont}>
          <Icon name="camera-retro" type={'font-awesome'} size={14} />
        </View>
      </View>
      <View style={{width: '100%'}}>
        <InputFields
          title={'First Name'}
          placeholder="Enter your first Name"
          height={45}
        />
        <InputFields
          height={45}
          title={'Last Name'}
          placeholder="Enter your last Name"
        />
        <InputFields
          height={45}
          title={'Accupation'}
          placeholder="What do you do.."
        />
        <InputFields
          height={45}
          title={'Education'}
          placeholder="What is you education"
        />
        <InputFields
          height={45}
          title={'Education'}
          placeholder="What is you education"
        />
        <InputFields
          height={100}
          title={'Bio'}
          placeholder="Write something about yourself"
          multiline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topImage: {
    width: '50%',
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cameraIconCont: {
    backgroundColor: '#E3E9F2',
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  pickerCont: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  imageTab: {
    width: 80,
    height: 80,
    borderColor: '#888888',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  placeholder: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#888888',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  minus: {
    width: 15,
    height: 15,
    position: 'absolute',
    zIndex: 100,
    top: -4,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  inputFields: {
    width: '100%',
    alignSelf: 'center',
    height: 40,
    borderColor: '#333333',
    backgroundColor: '#E3E9F2',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
    marginTop: 5,
  },
});
export default Signup;
