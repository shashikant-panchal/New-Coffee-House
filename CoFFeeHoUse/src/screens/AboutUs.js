import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/ToolBar';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title={'About Us'} />
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Welcome to Coffee House, your go-to app for all things coffee! Whether
          you're a connoisseur or just enjoy a good cup of joe, we've got you
          covered.
        </Text>
        <Text style={styles.contentText}>
          At Coffee House, we're passionate about bringing you the finest
          selection of coffee beans from around the world. From single-origin
          brews to specialty blends, we handpick each batch to ensure the
          highest quality and flavor.
        </Text>
        <Text style={styles.contentText}>
          But Coffee House is more than just a place to buy coffee. It's a
          community where coffee lovers can connect, share their experiences,
          and discover new brews together. Join us on our journey to explore the
          world of coffee one cup at a time!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E8D0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A4039',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20
  },
  contentText: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color: '#4A4039',
  },
});

export default AboutUsScreen;
