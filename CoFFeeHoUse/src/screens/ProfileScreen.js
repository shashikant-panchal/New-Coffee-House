import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterPress = async () => {
    try {
      const response = await fetch('http://192.168.1.21:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.status === 201) {
        alert('User registration successful');
      } else {
        alert('User registration failed. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Register"
        onPress={handleRegisterPress}
        buttonStyle={styles.registerButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2B48C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  registerButton: {
    backgroundColor: '#8B4513',
    width: '80%',
    borderRadius: 5,
    textAlign:'center'
  },
});

export default ProfileScreen;
