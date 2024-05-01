import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import {Data} from '../data/data';
import Header from '../components/ToolBar';

const ProductsScreen = ({navigation}) => {
  const navigateToProductView = product => {
    navigation.navigate('ProductView', {
      productId: product.id,
      image: product.image,
      name: product.name,
      size: product.grams,
      description: product.description,
      price: product.price.toFixed(2),
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => navigateToProductView(item)}>
        <Card style={styles.card}>
          <Card.Cover source={{uri: item.image}} />
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>{item.grams}ml</Paragraph>
            <Paragraph>{item.price}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={'Products'} />
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 16,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
  card: {
    elevation: 4,
  },
});

export default ProductsScreen;
