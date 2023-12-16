import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {IUserInfoRegister} from '../interfaces/userInfo';
import axios from 'axios';
import {mainServiceURL} from '../utils/constants';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [userRegisteredInfo, setuserRegisteredInfo] =
    useState<IUserInfoRegister>({
      name: '',
      surname: '',
      email: '',
      password: '',
      phone: '',
      confirmPassword: '',
      _id: undefined,
    });

  const navigation = useNavigation<ProfileProps>();

  const passwordsMatch = (): boolean => {
    return userRegisteredInfo.password === userRegisteredInfo.confirmPassword;
  };

  const handleSubmitUser = () => {
    console.log(mainServiceURL() + '/authentication/create-user');

    if (passwordsMatch()) {
      axios
        .post(
          mainServiceURL() + '/authentication/create-user',
          userRegisteredInfo,
        )
        .then(response => {
          console.info('Please login using your details!');
        })
        .then(() => {
          navigation.navigate('Login');
        })
        .catch(error => {
          Alert.alert(error.response.data.message);
        });
    } else {
      Alert.alert('Error', "Passwords don't match");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Register to Leaf!</Text>
      <View style={styles.form}>
        <AppTextInput
          onChangeText={text => {
            setuserRegisteredInfo(prev => {
              return {...prev, name: text};
            });
          }}
          value={userRegisteredInfo.name}
          placeholder="Forename"
          textContentType="givenName"
          additionalStyle={{marginBottom: 20}}
        />
        <AppTextInput
          onChangeText={text => {
            setuserRegisteredInfo(prev => {
              return {...prev, surname: text};
            });
          }}
          value={userRegisteredInfo.surname}
          placeholder="Family name"
          textContentType="familyName"
          additionalStyle={{marginBottom: 20}}
        />
        <AppTextInput
          onChangeText={text => {
            setuserRegisteredInfo(prev => {
              return {...prev, phone: text};
            });
          }}
          value={userRegisteredInfo.phone}
          placeholder="Mobile number"
          textContentType="telephoneNumber"
          additionalStyle={{marginBottom: 20}}
        />
        <AppTextInput
          placeholder="Email"
          additionalStyle={{marginBottom: 20}}
          textContentType="emailAddress"
          value={userRegisteredInfo.email}
          onChangeText={text => {
            setuserRegisteredInfo(prev => {
              return {...prev, email: text};
            });
          }}
        />
        <AppTextInput
          value={userRegisteredInfo.password}
          secureTextEntry={true}
          placeholder="Password"
          additionalStyle={{marginBottom: 20}}
          textContentType="password"
          onChangeText={text => {
            setuserRegisteredInfo(prev => {
              return {...prev, password: text};
            });
          }}
        />
        <AppTextInput
          value={userRegisteredInfo.confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          additionalStyle={{}}
          textContentType="password"
          onChangeText={text => {
            setuserRegisteredInfo(prev => {
              return {...prev, confirmPassword: text};
            });
          }}
        />
      </View>
      <AppButton
        onPress={() => {
          handleSubmitUser();
        }}
        PressableStyle={styles.btnPressable}
        ViewStyle={styles.btnView}
        Content={<Text style={{fontSize: 18, color: 'white'}}>SIGN IN</Text>}
      />
      <Text style={styles.bottomText}>Do you have an account?</Text>
      <Text style={styles.bottomText}>
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.signUpText}>
          Login
        </Text>{' '}
        here!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    fontWeight: '800',
    fontSize: 40,
  },
  form: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'space-between',
  },
  btnPressable: {
    width: 190,
    height: 54,
    backgroundColor: '#333333',
    marginTop: 20,
    marginBottom: 40,
  },
  btnView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#333333',
    fontSize: 11,
    fontWeight: '300',
  },
  signUpText: {
    fontWeight: '600',
  },
});
