import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Share
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleLogin = async () => {
    console.log('Login request payload:', {email, password});
    try {
      const apiUrl = 'http://192.168.1.21:3000/api/login';
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      console.log('User logged in:', response.data);

      const {name, phoneNumber} = response.data;
      const userData = {name, phoneNumber};
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Invalid credentials. Please try again.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      Alert.alert('Error', `Login failed: ${error.response.data.error}`, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userData');
    setUser(null);
    navigation.navigate('Profile');
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register');
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app!',
        url: 'https://coffeehouse.com',
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-photo/brown-concrete-wall-with-scratches-vector_53876-143109.jpg',
      }}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        {!user ? (
          <>
            <Text style={styles.title}>Coffee Login</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegisterNavigation}>
              <Text style={styles.registerText}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.accountSection}>
              <FontAwesome5 name="user" size={24} color="#4A2B18" />
              <Text style={styles.accountText}>Welcome, {user.name}!</Text>
            </View>
            <View style={styles.accountSection}>
              <FontAwesome5 name="phone" size={24} color="#4A2B18" />
              <Text style={styles.accountText}>
                Phone Number: {user.phoneNumber}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate('Orders');
              }}>
              <FontAwesome5 name="history" size={24} color="#4A2B18" />
              <Text style={styles.menuItemText}>Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={shareApp}>
              <FontAwesome5 name="share-alt" size={24} color="#4A2B18" />
              <Text style={styles.menuItemText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate('AboutUs');
              }}>
              <FontAwesome5 name="info-circle" size={24} color="#4A2B18" />
              <Text style={styles.menuItemText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4A2B18',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#4A2B18',
  },
  input: {
    height: 40,
    borderColor: '#4A2B18',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#4A2B18',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  registerButton: {
    alignItems: 'center',
  },
  registerText: {
    color: '#4A2B18',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  accountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#4A2B18',
  },
  signOutButton: {
    backgroundColor: '#B03226',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  accountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#4A2B18',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#4A2B18',
  },
  signOutButton: {
    backgroundColor: '#4A2B18',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
