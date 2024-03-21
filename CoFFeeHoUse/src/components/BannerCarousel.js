import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const BannerCarousel = () => {
  const carouselItems = [
    {
      title: 'Morning Brew',
      image:
        'https://izzycooking.com/wp-content/uploads/2022/09/Americano-Coffee-thmbnail.jpg',
    },
    {
      title: 'Espresso Shot',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Espresso.jpg',
    },
    {
      title: 'Cappuccino',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1200px-Cappuccino_at_Sightglass_Coffee.jpg',
    },
  ];

  const renderCarouselItem = ({item, index}) => (
    <View style={styles.carouselItem}>
      <Image source={{uri: item.image}} style={styles.bannerImage} />
      <Text style={styles.bannerTitle}>{item.title}</Text>
    </View>
  );
  

  return (
    <Carousel
      data={carouselItems}
      renderItem={renderCarouselItem}
      sliderWidth={450}
      itemWidth={450}
      loop={true}
      autoplay={true}
      autoplayInterval={1700}
    />
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width:'100%'
  },
  bannerImage: {
    width: '100%',
     height: '100%',
    resizeMode: 'stretch'
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BannerCarousel;


