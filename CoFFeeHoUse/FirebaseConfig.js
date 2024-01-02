import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB9GDKfGX6AO6Zpg5laV7RexyKYHSkUbkI',
  authDomain: 'coffee-house-67328.firebaseapp.com',
  projectId: 'coffee-house-67328',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default {firebaseConfig, firebase, auth};

