import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {removeAllItems} from '../Redux/cartSlice';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from '../Redux/cartSlice';
import Header from '../components/ToolBar';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const handleIncrease = productId => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = productId => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = productId => {
    dispatch(removeItem(productId));
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const totalPrice = getTotalPrice();

  const handlePlaceOrder = async () => {
    const options = {
      description: 'Payment for your order',
      image: 'https://your-image-url.png',
      currency: 'INR',
      key: 'rzp_test_ySD5EthQT8Wmtk',
      amount: totalPrice * 100,
      name: 'Coffee House',
      prefill: {
        email: 'avinash@gmail.com',
        contact: '7019242928',
        name: 'Avinash Ekhelikar',
      },
      theme: {color: '#3498db'},
      display: {
        maxWidth: '100%',
        maxHeight: '100%',
      },
    };

    try {
      const paymentResponse = await RazorpayCheckout.open(options);
      const orderTime = new Date();
      const orderData = {
        userId: '65f67c2c2ed30f7531e5386d',
        items: cart.items,
        totalAmount: totalPrice,
        orderTime: orderTime.toISOString(),
        paymentId: paymentResponse.razorpay_payment_id,
      };
      const mongoDBResponse = await axios.post(
        'http://192.168.1.34:3000/api/orders',
        orderData,
      );
      dispatch(removeAllItems());
      navigation.navigate('Orders');
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Cart screen focused');
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header title={'My Cart'} />
      {cart.items.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.continueShoppingButtonText}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cart.items}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.cartItem}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleDecrease(item.id)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleIncrease(item.id)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {cart.items.length > 0 && (
        <View style={styles.placeOrderContainer}>
          <View style={styles.totalItemsContainer}>
            <Text style={styles.totalItemsText}>
              Total Items: {getTotalItems()}
            </Text>
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>
              Total Price: ₹{getTotalPrice()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
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
    color: '#777',
  },
  continueShoppingButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  removeButton: {
    marginLeft: 'auto',
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  placeOrderContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  totalItemsContainer: {
    marginBottom: 8,
  },
  totalItemsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPriceContainer: {
    marginBottom: 16,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  placeOrderButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen;
