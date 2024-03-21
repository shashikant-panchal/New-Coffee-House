import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import {removeAllItems} from '../Redux/cartSlice';

const PaymentScreen = ({route, navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const {cartItems, totalPrice} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setOrderPlaced(false);
    };
  }, []);

  const handleConfirmOrder = async () => {
    const orderTime = new Date().toLocaleTimeString();
    setProcessingOrder(true);
    const orderData = {
      userId: '65f67c2c2ed30f7531e5386d',
      items: cartItems,
      totalAmount: totalPrice,
      orderTime: orderTime,
    };

    try {
      const response = await axios.post(
        'http://192.168.1.21:3000/api/orders',
        orderData,
      );

      setProcessingOrder(false);
      setOrderPlaced(true);

      setTimeout(() => {
        setOrderPlaced(false);
        dispatch(removeAllItems());
        navigation.navigate('Orders', {
          orderTime: orderTime,
        });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setProcessingOrder(false);
    }
  };

  const handlePaymentOptionSelect = option => {
    setSelectedOption(option);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-photo/brown-concrete-wall-with-scratches-vector_53876-143109.jpg',
      }}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Payment Method</Text>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'Wallet' && styles.selectedOption,
          ]}
          onPress={() => handlePaymentOptionSelect('Wallet')}>
          <Text style={styles.optionText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'CreditCard' && styles.selectedOption,
          ]}
          onPress={() => handlePaymentOptionSelect('CreditCard')}>
          <Text style={styles.optionText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'UPI' && styles.selectedOption,
          ]}
          onPress={() => handlePaymentOptionSelect('UPI')}>
          <Text style={styles.optionText}>UPI</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.totalPriceText}>Total Price: ₹{totalPrice}</Text>
          <TouchableOpacity
            style={styles.confirmOrderButton}
            onPress={handleConfirmOrder}>
            <Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      {processingOrder && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.overlayText}>Processing Order...</Text>
        </View>
      )}
      {orderPlaced && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Order Placed!</Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  selectedOption: {
    backgroundColor: '#ffa500', // orange color
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  confirmOrderButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  confirmOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default PaymentScreen;
