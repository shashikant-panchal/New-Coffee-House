import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {removeAllItems} from '../Redux/cartSlice';

const PaymentScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {totalPrice} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setOrderPlaced(false);
    };
  }, []);

  const handleConfirmOrder = () => {
    setProcessingOrder(true);
    setTimeout(() => {
      setProcessingOrder(false);
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
        dispatch(removeAllItems());
        navigation.navigate('Cart');
      }, 3000);
    }, 3000);
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
