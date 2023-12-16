import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import {MAIN_GREY_COLOR, mainServiceURL} from '../utils/constants';
import {useAppSelector} from '../redux/hooks';
import axios from 'axios';
import {Toast} from '@ant-design/react-native';

interface IProps {
  TitleText: string;
  clb: (value: any) => void;
}

export default function AddressForm({TitleText, clb}: IProps) {
  const userInfo = useAppSelector(state => state.userInfo);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    title: '',
    default: false,
  });
  const validateAddress = (): boolean => {
    for (let item in address) {
      //@ts-ignore
      if (address[item] === '') {
        return false;
      }
    }
    return true;
  };

  const handleAddingAddress = (): void => {
    if (validateAddress()) {
      axios
        .post(mainServiceURL() + '/api/createAddress', {
          user: userInfo._id,
          ...address,
        })
        .then(response => {
          clb(response.data.address);
        })
        .catch(error => {
          console.log({error});
        });
    } else {
      Alert.alert('Please fill all required fields!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>{TitleText}</Text>
      <AppTextInput
        placeholder={'Address Title'}
        additionalStyle={{width: '90%'}}
        value={address.title}
        onChangeText={text => {
          setAddress(prev => {
            return {...prev, title: text};
          });
        }}
      />
      <AppTextInput
        value={address.street}
        placeholder={'Street'}
        additionalStyle={{width: '90%'}}
        textContentType="streetAddressLine1"
        onChangeText={text => {
          setAddress(prev => {
            return {...prev, street: text};
          });
        }}
      />
      <AppTextInput
        value={address.city}
        placeholder={'City'}
        additionalStyle={{width: '90%'}}
        textContentType="addressCity"
        onChangeText={text => {
          setAddress(prev => {
            return {...prev, city: text};
          });
        }}
      />
      <AppTextInput
        value={address.state}
        placeholder={'State'}
        additionalStyle={{width: '90%'}}
        textContentType="addressState"
        onChangeText={text => {
          setAddress(prev => {
            return {...prev, state: text};
          });
        }}
      />
      <AppTextInput
        value={address.country}
        placeholder={'Country'}
        additionalStyle={{width: '90%'}}
        textContentType="countryName"
        onChangeText={text => {
          setAddress(prev => {
            return {...prev, country: text};
          });
        }}
      />
      <AppTextInput
        value={address.postalCode}
        placeholder={'Postal Code'}
        additionalStyle={{width: '90%'}}
        textContentType="postalCode"
        onChangeText={text => {
          setAddress(prev => {
            return {...prev, postalCode: text};
          });
        }}
      />
      {address.default ? (
        <AppButton
          PressableStyle={{...styles.btnPressable, borderColor: 'red'}}
          ViewStyle={styles.btnView}
          onPress={() => {
            setAddress(prev => {
              return {...prev, default: !prev.default};
            });
          }}
          Content={
            <React.Fragment>
              <Text style={styles.btnTextCancel}>Cancel Default Address </Text>
              <Image
                source={require('../assets/images/close_ring_duotone.png')}
              />
            </React.Fragment>
          }
        />
      ) : (
        <AppButton
          PressableStyle={styles.btnPressable}
          ViewStyle={styles.btnView}
          onPress={() => {
            setAddress(prev => {
              return {...prev, default: !prev.default};
            });
          }}
          Content={
            <React.Fragment>
              <Text style={styles.btnText}>Make it your Default Address </Text>
              <Image
                source={require('../assets/images/check_ring_round_duotone_line.png')}
              />
            </React.Fragment>
          }
        />
      )}
      <AppButton
        PressableStyle={{
          ...styles.btnPressable,
          backgroundColor: 'black',
          borderWidth: 0,
        }}
        ViewStyle={styles.btnView}
        onPress={handleAddingAddress}
        Content={
          <Text style={{...styles.btnText, color: 'white'}}>
            Save my address
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  formTitle: {
    marginBottom: 20,
    marginTop: 10,
  },
  btnPressable: {
    backgroundColor: 'white',
    height: 57,
    width: '90%',
    borderColor: MAIN_GREY_COLOR,
    borderWidth: 2,
    marginBottom: 10,
  },
  btnText: {
    color: MAIN_GREY_COLOR,
    textTransform: 'capitalize',
    fontSize: 16,
  },
  btnTextCancel: {
    color: 'red',
    textTransform: 'capitalize',
    fontSize: 16,
  },
  btnView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
