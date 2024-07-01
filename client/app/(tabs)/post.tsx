import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Button, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ImageSelector from '@/components/ImageSelector';
import { ThemedView } from '@/components/ThemedView';
import Camera from '@/components/Camera';

export default function PostScreen() {
  const [postText, setPostText] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // useEffect(() =>{
  //   setShowCamera(true);
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      setShowCamera(true);

      // Optional: Clean up function
      return () => {
        setShowCamera(false);
        setImageUri(null);
        setPostText('');
      };
    }, [])
  );

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
  };

  const handleCameraCapture = (uri: string) => {
    setImageUri(uri);
    setShowCamera(false);
  };

  const handlePost = () => {
    console.log('Posting with text:', postText, 'and image:', imageUri);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Post</ThemedText>
      
      <Button title="Take Photo" onPress={() => setShowCamera(true)} />
      <ImageSelector onImageSelected={handleImageSelected} />
      
      {imageUri && (
        <ThemedText>Image selected: {imageUri}</ThemedText>
      )}
      
      <Button title="Post" onPress={handlePost} />

      <Modal visible={showCamera} animationType="slide">
        <Camera onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});