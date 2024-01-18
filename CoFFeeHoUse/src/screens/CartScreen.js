import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { increaseQuantity, decreaseQuantity, removeItem } from '../Redux/cartSlice';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  return (
    <View style={styles.container}>
      {cart.items.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cart.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>Price: ₹{item.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => handleDecrease(item.id)}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => handleIncrease(item.id)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    marginBottom: 16,
  },
  continueShoppingButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueShoppingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    padding: 5,
  },
});

export default CartScreen;
