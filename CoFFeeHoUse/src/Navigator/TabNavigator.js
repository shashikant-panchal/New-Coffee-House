import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutUs from '../screens/AboutUs';
import ProductViewScreen from '../screens/ProductViewScreen';
import Register from '../screens/Register';
import PaymentScreen from '../screens/Payment';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProductView" component={ProductViewScreen} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="Orders" component={OrderScreen} />
  </Stack.Navigator>
);

// const OrderStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Orders" component={OrderScreen} />
//   </Stack.Navigator>
// );

const ProfileStack = () => (
  <Stack.Navigator>
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
        tabBarBadge: route.name === 'Cart' ? cartItemCount : null,
        tabBarActiveTintColor: 'brown',
        headerShown: false,
        labelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
