import {
  Alert,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  PropsWithChildren,
  PropsWithoutRef,
  useEffect,
  useState,
} from 'react';
import {mainServiceURL} from '../utils/constants';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IProduct} from '../interfaces/product';
import ProductCard from '../components/ProductCard';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useDispatch} from 'react-redux';
import {updateFavorites} from '../redux/feature/favouriteSlice';
import {ICategory} from '../interfaces/category';
// import image1 from '../assets/images/21_64202794_1.jpg'
type SectionProps = PropsWithoutRef<{
  route: {params: {category: ICategory}};
}>;

type RootStackParamList = {
  Product: {product: IProduct};
  Category: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Category'>;

const CategoryCard = (props: any): JSX.Element => {
  return (
    <View style={CategoryStyles.container}>
      <View style={CategoryStyles.imageContainer}>
        <Image
          style={CategoryStyles.image}
          source={{
            uri: props.category.uri,
          }}
          onError={() => {
            console.log('Image Error');
          }}
        />
      </View>
      <Text style={CategoryStyles.text}>{props.category.title}</Text>
    </View>
  );
};

export default function Category({route}: SectionProps): JSX.Element {
  const [products, setProducts] = useState<IProduct[]>([]);
  const {category} = route.params;

  const userInfo = useAppSelector(state => state.userInfo);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileProps>();
  const favorites = useAppSelector(state => state.favourite);
  const getProducts = (): void => {
    axios
      .get(mainServiceURL() + '/api/products/category/' + category.title)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.log({error});
      });
  };

  useEffect(() => {
    console.log(category.title);
    
    getProducts();
  }, []);

  useEffect(() => {
    getFavourites();
  }, [userInfo._id]);

  const getFavourites = (): void => {
    userInfo._id &&
      axios
        .get(mainServiceURL() + '/api/favorites/' + userInfo._id)
        .then(response => {
          dispatch(
            updateFavorites({products: response.data.favorites.products}),
          );
        })
        .catch(err => {
          console.log({err});
          Alert.alert('Error', err.message);
        });
  };

  // console.log(favorites);

  return (
    <View style={styles.container}>
      <View style={{overflow: 'hidden'}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            padding: 20,
            backgroundColor: 'white',
          }}>
          {category.title}
        </Text>
        <FlatList
          getItemLayout={(data, index) => ({
            length: products.length,
            offset: 250 * index,
            index,
          })}
          numColumns={2}
          //@ts-ignore
          horizontal={false}
          data={products}
          style={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={itemData => {
            return (
              <Pressable
                // onPress={() => handlePharmacyClick(itemData.index)}
                onPress={() =>
                  navigation.navigate('Product', {product: itemData.item})
                }>
                <ProductCard product={itemData.item} />
              </Pressable>
            );
          }}
          // keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
  },

  categoriesContainer: {
    // width: '100%',
    backgroundColor: '#D9D9D9',
    height: 165,
    borderBottomWidth: 5,
    borderBottomColor: 'white',
  },
  productsContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 'auto',
  },
});

const CategoryStyles = StyleSheet.create({
  container: {
    margin: 5,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    width: 100,
  },
});

const categories = [
  {
    _id: 0,
    title: 'Westernwear',
    uri: 'https://images.wrangler.com/is/image/Wrangler/LWD708D-HERO?$KDP-LARGE2$',
  },
  {
    _id: 1,
    title: 'Indianwear',
    uri: 'https://i.etsystatic.com/22368382/r/il/9d6365/3248582065/il_570xN.3248582065_8lvb.jpg',
  },
  {
    _id: 2,
    title: 'Nightwear',
    uri: 'https://www.monsoon.co.uk/dw/image/v2/BDLV_PRD/on/demandware.static/-/Sites-monsoon-master-catalog/default/dw0ccd1437/images/large/21_64202794_1.jpg?sw=594&sh=761&sm=cut',
  },
  {
    _id: 4,
    title: 'Footwear',
    uri: 'https://img.davidsbridal.com/is/image/DavidsBridalInc/Set-BFRIEND-11611131-Silver?wid=510&hei=760&fit=constrain,1&resmode=sharp2&op_usm=2.5,0.3,4',
  },
  {
    _id: 4,
    title: 'Watches',
    uri: 'https://www.davidmrobinson.co.uk/wp-content/uploads/2021/07/featured-women-cover_portrait.jpg',
  },
];
