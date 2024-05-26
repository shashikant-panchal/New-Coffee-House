import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSave = async () => {
    if (!name || !email || !phoneNumber || !password) {
      Alert.alert('Error', 'Please fill all the fields to continue.');
      return;
    }

    try {
      const apiUrl = 'https://coffee-house-back-end.vercel.app/api/users';

      const response = await axios.post(apiUrl, {
        name,
        email,
        phoneNumber,
        password,
      });

      console.log('User data saved:', response.data);

      Alert.alert('Success', 'User registration successful!');
      navigation.navigate('Profile', {name, phoneNumber});
      setName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to register user. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={{uri: 'https://source.unsplash.com/featured/?coffee'}}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Profile</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.separator}></View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4A2B18',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#4A2B18',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#4A2B18',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#4A2B18',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  separator: {
    marginVertical: 16,
    borderBottomColor: '#4A2B18',
    borderBottomWidth: 1,
    width: '100%',
  },
  loginText: {
    color: '#4A2B18',
    fontSize: 16,
  },
});

export default Register;
