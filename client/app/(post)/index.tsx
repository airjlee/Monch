import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Camera from '@/components/Camera';

export default function CameraScreen() {
  const router = useRouter();

  const handleCapture = (uri: string) => {
    router.push({
      pathname: '/post',
      params: { capturedImageUri: uri }
    });
  };

  return (
    <View style={styles.container}>
      <Camera onCapture={handleCapture} onClose={() => router.replace('/(tabs)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});