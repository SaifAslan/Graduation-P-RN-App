import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import AppButton from '../components/AppButton';
import {logout} from '../redux/feature/userinfoSlice';
import {Accordion, Button, List} from '@ant-design/react-native';
import axios from 'axios';
import {MAIN_GREY_COLOR, mainServiceURL} from '../utils/constants';
import {IAddressRequest} from '../interfaces/address';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';
import {IOrder} from '../interfaces/order';
import OrderCard from '../components/OrderCard';

type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
  const navigation = useNavigation<ProfileProps>();
  const userInfo = useAppSelector(state => state.userInfo);
  const dispatch = useAppDispatch();
  const [userAddresses, setUserAddresses] = useState<IAddressRequest[]>([]);
  const [addressesModal, setAddressesModal] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    userInfo.accessToken == '' && navigation.navigate('Login');
    fetchAddresses();
    fetchOrders();
  }, []);

  const [state, setState] = useState({
    activeSections: [2, 0],
  });
  const onChange = (activeSections: number[]) => {
    setState({activeSections});
  };

  const fetchOrders = () => {
    axios
      .get(mainServiceURL() + '/api/order/userOrders/' + userInfo._id)
      .then(res => {
        setOrders(res.data.orders);
      })
      .catch(err => {
        // @ts-ignore
        Alert.alert('Error', {err});
      });
  };

  const fetchAddresses = (address?: IAddressRequest): void => {
    axios
      .get(mainServiceURL() + '/api/getUserAddresses/' + userInfo._id)
      .then(response => {
        setUserAddresses(response.data.addresses);
      })
      .catch(error => {
        //@ts-ignore
        Alert.alert('Error!', {error});
      });
  };

  const deleteClb = (address: IAddressRequest) => {
    deleteOneAddress(address);
  };
  const selectClb = (address: IAddressRequest) => {
    // setSelectedAddress(address);
    setAddressesModal(false);
  };

  const deleteOneAddress = (address: IAddressRequest) => {
    axios
      .delete(mainServiceURL() + '/api/address/' + address._id)
      .then(res => {
        fetchAddresses();
      })
      .catch(err => {
        console.log({err});
        // @ts-ignore
        Alert.alert('Error!', {error});
      });
  };

  const createAddressClb = (address: IAddressRequest) => {
    fetchAddresses(address);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require('../assets/images/istockphoto-1300512215-612x612.jpg')}
      />
      <Text style={styles.name}>{userInfo.name + ' ' + userInfo.surname}</Text>
      <Accordion
        style={{width: '100%'}}
        onChange={onChange}
        activeSections={state.activeSections}>
        <Accordion.Panel header="My Orders">
          <ScrollView style={styles.scrollableView}>
            <List>
              {orders.map((order, index) => {
                return (
                  <List.Item key={index}>
                    <OrderCard order={order} />
                  </List.Item>
                );
              })}
            </List>
          </ScrollView>
        </Accordion.Panel>
        <Accordion.Panel header="Address Book">
          <ScrollView style={styles.scrollableView}>
            {/* @ts-ignore */}
            <List>
              {/* @ts-ignore */}
              {userAddresses.map((address, index) => {
                return (
                  <List.Item key={index}>
                    <AddressCard
                      profile={true}
                      deleteClb={deleteClb}
                      selectClb={selectClb}
                      list={true}
                      address={address}
                    />
                  </List.Item>
                );
              })}
              <List.Item>
                <AppButton
                  onPress={() => setModalVisible(true)}
                  ViewStyle={styles.addAddressBtnView}
                  PressableStyle={styles.addAddressBtnPressable}
                  Content={
                    <React.Fragment>
                      <Image
                        style={styles.addAddressBtnIcon}
                        source={require('../assets/images/Add_square_duotone.png')}
                      />
                      <Text style={styles.addAddressBtnText}>
                        Add New Address
                      </Text>
                    </React.Fragment>
                  }
                />
              </List.Item>
            </List>
          </ScrollView>
        </Accordion.Panel>
      </Accordion>
      <AppButton
        PressableStyle={styles.button}
        ViewStyle={styles.buttonView}
        onPress={() => {
          dispatch(logout());
        }}
        Content={
          <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
            Sign out
          </Text>
        }
      />
      <Modal
        key={1}
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onTouchCancel={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddressForm
              TitleText="Create New Address"
              clb={createAddressClb}
            />
            <Button
              onPress={() => setModalVisible(false)}
              style={{marginTop: 20}}
              type="warning">
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 50,
    objectFit: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: '300',
    marginVertical: 10,
  },
  addAddressBtnPressable: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: MAIN_GREY_COLOR,
  },
  addAddressBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addAddressBtnIcon: {
    transform: [{scale: 1.4}],
    marginBottom: 10,
  },
  addAddressBtnText: {
    color: MAIN_GREY_COLOR,
  },
  scrollableView: {
    maxHeight: 300,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
  },
  button: {
    height: 75,
    backgroundColor: '#2F2F2F',
    // flex: 3,
    width: '100%',
  },
  buttonView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
