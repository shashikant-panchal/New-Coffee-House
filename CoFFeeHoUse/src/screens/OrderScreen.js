import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const OrderScreen = ({route, navigation}) => {
  const cartItems = route && route.params ? route.params.cartItems : [];
  const orderTime = route && route.params ? route.params.orderTime : {};

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://192.168.1.21:3000/api/orders');
      setOrders(response.data.orders);
      console.log(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
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
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigateToProductView(item)}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Price: ₹{item.price}</Text>
        <Text style={styles.price}>Ordered at: {orderTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {cartItems?.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <View style={{}}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>Orders History</Text>
          <FlatList
            data={orders}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View>
                {/* <Text>Order ID: {item._id}</Text>
                <Text>User ID: {item.userId}</Text> */}
                {/* <Text>Total Amount: ${item.totalAmount.toFixed(2)}</Text> */}
                <FlatList
                  data={item.items}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row', borderWidth:0.1, padding:10}}>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 100, height: 100}}
                      />
                      <Text>{item.name}</Text>
                      <Text>{item.price.toFixed(2)}</Text>
                      <Text>{item.quantity}</Text>
                    </View>
                  )}
                />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#666',
  },
});

export default OrderScreen;
