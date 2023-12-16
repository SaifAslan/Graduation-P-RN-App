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
import {useAppDispatch} from '../redux/hooks';
import axios from 'axios';
import {mainServiceURL} from '../utils/constants';
import {login} from '../redux/feature/userinfoSlice';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({email: '', password: ''});
  const navigation = useNavigation<ProfileProps>();
  const passwordValidator = () => {
    return loginInfo.password.length < 8 ? false : true;
  };

  const dispatch = useAppDispatch();
  const handleLogin = () => {
    if (!passwordValidator()) {
      return Alert.prompt('Error', 'Password must be at least 8 characters');
    }

    axios
      .post(mainServiceURL() + '/authentication/login', {
        email: loginInfo.email,
        password: loginInfo.password?.toString(),
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(
            login({
              name: response.data.user.name,
              email: response.data.user.email,
              accessToken: response.data.user.accessToken,
              phone: response.data.user.phone,
              surname: response.data.user.surname,
              imageUrl: response.data.user.imageUrl,
              _id:response.data.user._id
            }),
          );
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', response.data.message);
        }
      })
      .catch(error => Alert.alert(error.response.data.message));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Leaf</Text>
      <View style={styles.form}>
        <AppTextInput
          placeholder="Email"
          additionalStyle={{}}
          value={loginInfo.email}
          onChangeText={text => {
            setLoginInfo(prev => {
              return {...prev, email: text};
            });
          }}
        />
        <AppTextInput
          value={loginInfo.password}
          secureTextEntry={true}
          placeholder="Password"
          additionalStyle={{}}
          textContentType="password"
          onChangeText={text => {
            setLoginInfo(prev => {
              return {...prev, password: text};
            });
          }}
        />
      </View>
      <AppButton
        onPress={() => {handleLogin()}}
        PressableStyle={styles.btnPressable}
        ViewStyle={styles.btnView}
        Content={<Text style={{fontSize: 18, color: 'white'}}>SIGN IN</Text>}
      />
      <Text style={styles.bottomText}>Don't have an account?</Text>
      <Text style={styles.bottomText}>
        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={styles.signUpText}>
          SIGN UP
        </Text>{' '}
        Now!
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
    fontSize: 60,
  },
  form: {
    marginTop: 102,
    width: '100%',
    height: 118,
    justifyContent: 'space-between',
  },
  btnPressable: {
    width: 190,
    height: 54,
    backgroundColor: '#333333',
    marginTop: 75,
    marginBottom: 60,
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
