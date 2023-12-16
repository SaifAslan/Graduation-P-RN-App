import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React, { useCallback, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {Linking, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import { store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import home from './src/pages/Home';
import AppHeader from './src/components/Header';
import Product from './src/pages/Product';
import StickyFooter from './src/components/StickyFooter';
import Cart from './src/pages/Cart';
import Favourites from './src/pages/Favourites';
import Profile from './src/pages/Profile';
import Checkout from './src/pages/Checkout';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import { initPaymentSheet, useStripe } from '@stripe/stripe-react-native';
import Success from './src/pages/Success';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  let persistor = persistStore(store);

  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <Provider store={store}>
      {/* wrapping the app with redux persis wrapper to persist the redux data in async storage */}
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppHeader />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={home} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Success" component={Success} />
          </Stack.Navigator>
          <StickyFooter />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
