import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import axios from 'axios';

const OrderScreen = ({route}) => {
  const cartItems = route && route.params ? route.params.cartItems : [];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://192.168.0.110:3000/api/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
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
              <Text style={{fontWeight: 'bold'}}>Order ID: {item._id}</Text>
            </View>
          </View>
        ))}
        <Text style={{textAlign: 'right'}}>
          Order Time: {new Date(item.orderTime).toLocaleString()}
        </Text>
        <Text style={{textAlign: 'right'}}>
          Total Amount: ₹{item.totalAmount}
        </Text>
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
          <Text style={styles.orderHistoryTitle}>Orders History</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            keyExtractor={item => item._id}
            renderItem={renderOrderItem}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  orderItemTime: {
    fontSize: 14,
    color: '#888',
  },
});

export default OrderScreen;
