import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import React from 'react';

interface IProps {
  placeholder: string;
  additionalStyle: {};
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (value: string) => void;
  textContentType?:
    | 'none'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'newPassword'
    | 'nickname'
    | 'oneTimeCode'
    | 'organizationName'
    | 'password'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'URL'
    | 'username';
}

export default function AppTextInput({
  placeholder,
  additionalStyle,
  textContentType,
  secureTextEntry,
  value,
  onChangeText
}: IProps) {
  return (
    <TextInput
    secureTextEntry={secureTextEntry??false}
      style={{...styles.input, ...additionalStyle}}
      placeholder={placeholder}
      textContentType={textContentType}
      value={value}
      onChangeText={onChangeText}
      
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginHorizontal:20,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
});
