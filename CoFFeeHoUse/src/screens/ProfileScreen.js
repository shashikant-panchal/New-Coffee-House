import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import FirebaseConfig from '../../FirebaseConfig';

const ProfileScreen = () => {
  const {auth} = FirebaseConfig;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      console.log('Starting registration...');

      if (!email || !password) {
        console.log('Invalid email or password');
        Alert.alert('Error', 'Please enter both email and password');
        return;
      }

      console.log('Creating user with email and password:', email, password);
      await auth().createUserWithEmailAndPassword(email, password);

      // Fetch the user details after successful registration
      const user = auth().currentUser;
      if (user) {
        console.log('Registration successful!');
        Alert.alert(
          'Success',
          'Registration successful!\nEmail: ' + user.email,
        );
        // Additional actions after successful registration (e.g., navigation)
        // ...
      }
    } catch (error) {
      console.error('Registration Error:', error);

      let errorMessage = 'An error occurred during registration';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email address is already in use by another account.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }

      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee House</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4F3A2D',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#4F3A2D',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: '#4F3A2D',
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
