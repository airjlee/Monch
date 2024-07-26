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
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', result.user);
      setUser(result.user);
      router.replace('/(tabs)');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

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
      <Text style={styles.monchText}>Monch</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.continueButton} onPress={signInWithEmail} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle} disabled={loading}>
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    monchText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginBottom: 15,
      borderRadius: 10,
    },
    continueButton: {
      backgroundColor: '#008000',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    orText: {
      textAlign: 'center',
      marginVertical: 15,
    },
    socialButton: {
      borderWidth: 1,
      borderColor: '#000',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    socialButtonText: {
      fontSize: 16,
    },
    signupText: {
      marginTop: 20,
      textAlign: 'center',
      color: '#008000',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
  });
