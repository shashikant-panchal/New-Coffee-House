import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../components/ToolBar';
import {Data} from '../data/data';
import {addToCart} from '../Redux/cartSlice';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BannerCarousel from '../components/BannerCarousel';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = product => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      }),
    );
  };

  const navigateToProductView = product => {
    navigation.navigate('ProductView', {
      productId: product.id,
      image: product.image,
      name: product.name,
      size: product.grams,
      price: product.price.toFixed(2),
    });
  };

  const filteredData = Data.filter(item =>
    item.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
  );

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => navigateToProductView(item)}
      style={[styles.card, index % 2 !== 0 && styles.cardEven]}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      <Text style={styles.grams}>{item.grams} ml</Text>
      <Button
        title="Add to cart"
        color={'brown'}
        onPress={() => handleAddToCart(item)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Coffee..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      {filteredData.length === 0 ? (
        <Text style={styles.noResultText}>This Coffee is not available</Text>
      ) : (
        <>
          <BannerCarousel />
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'right',
                fontSize: 17,
                color: 'brown',
                paddingRight: 20,
                paddingTop: 5,
                paddingBottom: 5,
              }}>
              View All
            </Text>
          </TouchableOpacity>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 16,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#009688',
    marginBottom: 4,
    textAlign: 'center',
  },
  grams: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
    textAlign: 'center',
  },
  grams: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: '#f2f2f2',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    // paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'brown',
    borderWidth: 1.5,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default HomeScreen;
