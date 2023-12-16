import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IAddressRequest} from '../interfaces/address';
import {MAIN_GREY_COLOR} from '../utils/constants';

interface IProps {
  address: IAddressRequest;
  profile?: boolean;
  list: boolean;
  changeClb?: () => void;
  selectClb?: (address: IAddressRequest) => void;
  deleteClb?: (address: IAddressRequest) => void;
}
export default function AddressCard({
  address,
  list,
  changeClb,
  selectClb,
  deleteClb,
  profile,
}: IProps) {
  const {title, city, state, street, country, postalCode} = address;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{street + ', ' + city + ', ' + state + ', ' + country}</Text>
        <Text>{postalCode}</Text>
        {list ? (
          <View style={styles.btnsContainer}>
            {/* @ts-ignore */}
            <Pressable onPress={() => deleteClb(address)}>
              <Text style={styles.deleteBtn}>Delete</Text>
            </Pressable>
            {!profile && (
              //@ts-ignore
              <Pressable onPress={() => selectClb(address)}>
                <Text style={styles.selectBtn}>Select</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <Pressable onPress={changeClb}>
            <Text style={styles.changeBtn}>Change</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    // width:'90%'
  },
  innerContainer: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: MAIN_GREY_COLOR,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  changeBtn: {
    color: 'green',
    marginTop: 10,
  },
  deleteBtn: {
    color: 'red',
    marginTop: 10,
    marginEnd: 10,
  },
  selectBtn: {
    color: 'blue',
    marginTop: 10,
  },
  btnsContainer: {
    flexDirection: 'row',
  },
});
