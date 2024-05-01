import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/ToolBar';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../Redux/cartSlice';
import {useNavigation} from '@react-navigation/native';

const ProductView = ({route}) => {
  const {image, name, size, price, description} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector(state => state.cart);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: route.params.productId,
        name: route.params.name,
        image: route.params.image,
        price: parseFloat(route.params.price),
      }),
    );
    navigation.navigate('Cart');
  };

  const ProductViewUI = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Image source={{uri: image}} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.size}>Size: {size}ml</Text>
          <Text style={styles.price}>₹{price}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ProductViewUI />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  size: {
    fontSize: 17,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 16,
  },
  description: {
    fontSize: 17,
    color: 'black',
    lineHeight: 28,
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: '#FF6F61',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductView;
