import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const BannerCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      name: 'Espresso',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg/1280px-Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg',
    },
    {
      id: 2,
      name: 'Latte',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/1024px-Caffe_Latte_at_Pulse_Cafe.jpg',
    },
    {
      id: 3,
      name: 'Cappuccino',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1200px-Cappuccino_at_Sightglass_Coffee.jpg',
    },
    {
      id: 4,
      name: 'Americano',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Espresso_Americano.jpeg/1280px-Espresso_Americano.jpeg',
    },
    {
      id: 5,
      name: 'Cold Brew',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ColdBrewCoffeein_Cans.png/1920px-ColdBrewCoffeein_Cans.png',
    },
    {
      id: 6,
      name: 'Mocha',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mocaccino-Coffee.jpg/1280px-Mocaccino-Coffee.jpg',
    },
    {
      id: 7,
      name: 'Flat White',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Flat_white_coffee_with_pretty_feather_pattern.jpg/800px-Flat_white_coffee_with_pretty_feather_pattern.jpg',
    },
    {
      id: 8,
      name: 'Macchiato',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ethiopian_caff%C3%A8_macchiato.jpg/1280px-Ethiopian_caff%C3%A8_macchiato.jpg',
    },
    {
      id: 9,
      name: 'Affogato',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Vinoteca%2C_Smithfield%2C_London_%284485849609%29.jpg/1920px-Vinoteca%2C_Smithfield%2C_London_%284485849609%29.jpg',
    },
    {
      id: 10,
      name: 'Irish Coffee',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Irish_coffee_glass.jpg/800px-Irish_coffee_glass.jpg',
    },
    {
      id: 11,
      name: 'Turkish Coffee',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Two_Turkish_coffee.jpg/1920px-Two_Turkish_coffee.jpg',
    },
    {
      id: 12,
      name: 'Vietnamese Iced Coffee',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ca_Phe_Sua_Da.jpg/1280px-Ca_Phe_Sua_Da.jpg',
    },
    {
      id: 13,
      name: 'Gibraltar',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/d/d6/Gibraltar_coffee%2C_Ritual_Roasters.jpg',
    },
    {
      id: 14,
      name: 'Café au Lait',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Caf%C3%A9_au_lait.jpg/1280px-Caf%C3%A9_au_lait.jpg',
    },
    {
      id: 15,
      name: 'Vienna Coffee',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wiener_Melange_0363wien_img_9691.jpg/800px-Wiener_Melange_0363wien_img_9691.jpg',
    },
    {
      id: 16,
      name: 'Red Eye',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Frenchpress-wiki.jpg/330px-Frenchpress-wiki.jpg',
    },
    {
      id: 17,
      name: 'Cortado',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/1/16/Caf%C3%A9Cortado%28Tallat%29.jpg',
    },
    {
      id: 18,
      name: 'Ristretto',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ristretto_-_by_Charles_Haynes.jpg/1280px-Ristretto_-_by_Charles_Haynes.jpg',
    },
    {
      id: 19,
      name: 'Nitro Cold Brew',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Nitro_Cold_Brew.jpg/800px-Nitro_Cold_Brew.jpg',
    },
    {
      id: 20,
      name: 'Decaf',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Coffee_cup_in_Hanoi%2C_Vietnam.jpg/1920px-Coffee_cup_in_Hanoi%2C_Vietnam.jpg',
    },
  ];

  const renderCarouselItem = ({item, index}) => (
    <View style={styles.carouselItem}>
      <Image source={{uri: item.image}} style={styles.bannerImage} />
      <Text style={styles.bannerTitle}>{item.name}</Text>
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
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
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
