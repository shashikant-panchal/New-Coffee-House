import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../components/ToolBar';
import {useDispatch} from 'react-redux';
import {addToCart} from '../Redux/cartSlice';

const ProductView = ({route}) => {
  const {image, name, size, price} = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: route.params.productId,
        name: route.params.name,
        image: route.params.image,
        price: parseFloat(route.params.price), 
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.card}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.size}>Size: {size}</Text>
        <Text style={styles.price}>₹{price}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(route.params.productId)}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.addToCartButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    padding: 24,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  size: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    color: 'green',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: 'brown',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buyButton: {
    backgroundColor: 'brown',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductView;
