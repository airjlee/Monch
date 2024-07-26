import React, { useState, useContext, useEffect } from 'react';
import { View, Button, ActivityIndicator, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  //this doesn't work for some reason
  useEffect(() => {     
    onAuthStateChanged(auth, (user) => {       
        console.log("USER: " + user + " " + user?.email);       
        if (user) {         
            router.replace("/(tabs)");       
        }     
    }); 
}, []);

  const signInWithEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login (you might want to navigate to a different screen or show a success message)
      console.log('User signed in:', result.user);
      setUser(result.user);
      router.replace('/(tabs)');
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful login
      console.log('User signed in:', result.user);
      setUser(result.user);
      router.replace('/(tabs)');
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError(null);
    try {
      console.log("not yet");
      // const result = await signInWithPopup(auth, provider);
      // // Handle successful login
      // console.log('User signed in:', result.user);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={signInWithEmail} disabled={loading}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button]} onPress={signInWithGoogle} disabled={loading}>
        <Text style={styles.buttonText}>sign in with Google</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
