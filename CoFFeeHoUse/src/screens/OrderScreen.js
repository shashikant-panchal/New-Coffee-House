import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from '../components/ToolBar';

const OrderScreen = ({route}) => {
  const cartItems = route && route.params ? route.params.cartItems : [];

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://coffee-house-back-end.vercel.app/api/orders',
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async orderId => {
    try {
      await axios.delete(
        `https://coffee-house-back-end.vercel.app/api/orders/${orderId}`,
      );
      fetchOrders(); // Refresh orders after cancellation
      Alert.alert('Order Cancelled Successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      Alert.alert('Failed to Cancel Order');
    }
  };

  const renderOrderItem = ({item}) => {
    return (
      <View style={styles.orderContainer}>
        {item.items.map(product => (
          <View key={product.id} style={styles.orderItemContainer}>
            <Image
              source={{uri: product.image}}
              style={styles.orderItemImage}
            />
            <View style={styles.orderItemDetails}>
              <Text style={styles.orderItemName}>{product.name}</Text>
              <Text style={styles.orderItemPrice}>
                Price: ₹{product.price.toFixed(2)}
              </Text>
              <Text style={styles.orderItemQuantity}>
                Quantity: {product.quantity}
              </Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                Order ID: {item._id}
              </Text>
            </View>
          </View>
        ))}
        <Text style={{textAlign: 'right', color: 'black'}}>
          Order Time: {new Date(item.orderTime).toLocaleString()}
        </Text>
        <Text style={{textAlign: 'right', color: 'black'}}>
          Total Amount: ₹{item.totalAmount}
        </Text>
        <TouchableOpacity
          onPress={() => cancelOrder(item._id)}
          style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cartItems?.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <View style={styles.orderHistoryContainer}>
          <Header title={'Order History'} />
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#4A2B18"
              style={styles.loadingIndicator}
            />
          ) : (
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={item => item._id}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderHistoryContainer: {
    flex: 1,
  },
  orderHistoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
  },
  orderItemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  orderItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  orderItemPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  orderItemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
