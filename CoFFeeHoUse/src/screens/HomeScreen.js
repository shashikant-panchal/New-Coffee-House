import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../components/ToolBar';
import { Data } from '../data/data';
import { addToCart } from '../Redux/cartSlice';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      }),
    );
  };

  const navigateToProductView = (product) => {
    navigation.navigate('ProductView', {
      productId: product.id,
      image: product.image,
      name: product.name,
      size: product.grams,
      price: product.price.toFixed(2),
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToProductView(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        <Text style={styles.grams}>{item.grams} grams</Text>
        <Button
          title="Add to cart"
          color={'brown'}
          onPress={() => handleAddToCart(item)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={Data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  grams: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
