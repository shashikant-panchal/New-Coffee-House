import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Updated to MaterialCommunityIcons

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutUs from '../screens/AboutUs';
import ProductViewScreen from '../screens/ProductViewScreen';
import Register from '../screens/Register';
import PaymentScreen from '../screens/Payment';
import ProductScreen from '../screens/Products';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProductView" component={ProductViewScreen} />
    <Stack.Screen name="Products" component={ProductScreen} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="Orders" component={OrderScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="Orders" component={OrderScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarBadge:
          route.name === 'Cart' && cartItemCount > 0 ? cartItemCount : null,
        tabBarActiveTintColor: '#FF6F61', // Vibrant red for active tab
        tabBarInactiveTintColor: '#A8A8A8', // Light gray for inactive tab
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Clean white background
          borderTopWidth: 0, // No border at the top
          elevation: 10, // Add elevation for shadow effect
          height: 80, // Increased height for the tab bar
          paddingBottom: 10, // Padding for a little more space
        },
        headerShown: false,
        labelStyle: {
          fontSize: 16, // Increased font size for larger labels
          fontWeight: 'bold', // Bold labels
          marginTop: 5, // Add some space between icon and label
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size * 1.5} /> // Larger icon
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <Icon name="cart" color={color} size={size * 1.5} /> // Larger icon
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({color, size}) => (
            <Icon name="clipboard-list" color={color} size={size * 1.5} /> // Larger icon
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size * 1.5} /> // Larger icon
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
