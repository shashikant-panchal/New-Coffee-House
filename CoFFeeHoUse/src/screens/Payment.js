import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

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

  // const handleConfirmOrder = async () => {
  //   const orderTime = new Date();
  //   setProcessingOrder(true);
  //   const orderData = {
  //     userId: '65f67c2c2ed30f7531e5386d',
  //     items: cartItems,
  //     totalAmount: totalPrice,
  //     orderTime: orderTime,
  //   };

  //   try {
  //     const response = await axios.post(
  //       'http://192.168.1.21:3000/api/orders',
  //       orderData,
  //     );

  //     setProcessingOrder(false);
  //     setOrderPlaced(true);

  //     setTimeout(() => {
  //       setOrderPlaced(false);
  //       dispatch(removeAllItems());
  //       navigation.navigate('Orders', {
  //         orderTime: orderTime,
  //       });
  //     }, 3000);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setProcessingOrder(false);
  //   }
  // };

  const handleConfirmOrder = async () => {
    setProcessingOrder(true);

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
        items: cartItems,
        totalAmount: totalPrice,
        orderTime: orderTime,
        paymentId: paymentResponse.razorpay_payment_id,
      };

      const mongoDBResponse = await axios.post(
        'http://your-mongodb-api-url/orders',
        orderData,
      );

      setProcessingOrder(false);
      setOrderPlaced(true);

      setTimeout(() => {
        setOrderPlaced(false);
        dispatch(removeAllItems());
        navigation.navigate('Orders');
      }, 3000);
    } catch (error) {
      console.error('Payment Error:', error);
      setProcessingOrder(false);
    }
  };
  const handlePaymentOptionSelect = option => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Payment Method</Text>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === 'CreditCard' && styles.selectedOption,
        ]}
        onPress={() => handlePaymentOptionSelect('CreditCard')}>
        <Text style={styles.optionText}>Credit Card</Text>
        <Text style={styles.cardNumber}>**** **** **** 1234</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === 'UPI' && styles.selectedOption,
        ]}
        onPress={() => handlePaymentOptionSelect('UPI')}>
        <Text style={styles.optionText}>UPI</Text>
        <View style={styles.upiIconsContainer}>
          <Text style={styles.upiIcon}>GPay</Text>
          <Text style={styles.upiIcon}>PhonePe</Text>
          <Text style={styles.upiIcon}>Paytm</Text>
          <Text style={styles.upiIcon}>Apple Pay</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === 'Wallet' && styles.selectedOption,
        ]}
        onPress={() => handlePaymentOptionSelect('Wallet')}>
        <Text style={styles.optionText}>Wallet</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.totalPriceText}>Total Price: ₹{totalPrice}</Text>
        <TouchableOpacity
          style={styles.confirmOrderButton}
          onPress={handleConfirmOrder}>
          <Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
      {processingOrder && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.overlayText}>Processing Order...</Text>
        </View>
      )}
      {orderPlaced && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Order Placed!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  selectedOption: {
    borderColor: '#3498db',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 16,
    color: '#555',
  },
  upiIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upiIcon: {
    fontSize: 16,
    color: '#555',
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
