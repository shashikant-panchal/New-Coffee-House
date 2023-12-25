import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet, Button} from 'react-native';
import Header from '../components/ToolBar';

const HomeScreen = () => {
  const dummyData = [
    {
      id: 1,
      name: 'Espresso',
      image:
        'https://blogstudio.s3.theshoppad.net/coffeeheroau/ec178d83e5f597b162cda1e60cb64194.jpg',
      price: 199.99,
      grams: 30,
    },
    {
      id: 2,
      name: 'Latte',
      image:
        'https://www.foodandwine.com/thmb/CCe2JUHfjCQ44L0YTbCu97ukUzA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Latte-FT-BLOG0523-09569880de524fe487831d95184495cc.jpg',
      price: 249.99,
      grams: 300,
    },
    {
      id: 3,
      name: 'Cappuccino',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1200px-Cappuccino_at_Sightglass_Coffee.jpg',
      price: 299.99,
      grams: 250,
    },
    {
      id: 4,
      name: 'Americano',
      image:
        'https://izzycooking.com/wp-content/uploads/2022/09/Americano-Coffee-thmbnail.jpg',
      price: 179.99,
      grams: 240,
    },
    {
      id: 5,
      name: 'Cold Brew',
      image:
        'https://www.simplyrecipes.com/thmb/t9ZeQC3Nb2YUoQTnxUJrjJbnKEA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Cold-Brew-Coffee-LEAD-16-428691bcdd594281b2f5dc6dbc8235e4.jpg',
      price: 349.99,
      grams: 400,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {dummyData.map(product => (
          <View style={styles.card} key={product.id}>
            <Image source={{uri: product.image}} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
            <Text style={styles.grams}>{product.grams} grams</Text>
            <Button title="Add to cart" color={'brown'} />
          </View>
        ))}
      </ScrollView>
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
