import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Modal, TextInput, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ImageSelector from '@/components/ImageSelector';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';


export default function PostScreen() {
  console.log('PostScreen rendered');
  const router = useRouter();
  const { capturedImageUri } = useLocalSearchParams();
  const [postText, setPostText] = useState<string>('');
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (capturedImageUri) {
      setImageUri(capturedImageUri as string);
    }
  }, [capturedImageUri]);

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
  };

  // const handleCameraCapture = (uri: string) => {
  //   setImageUri(uri);
  //   setShowCamera(false);
  // };

  const handlePost = () => {
    console.log('Posting with text:', postText, 'and image:', imageUri);
    // const p: Post = {
    //   id: "",
    //   username: "unknownUser",
    //   imageUrl: imageUri === null ? "" : imageUri,
    //   content: postText
    // }
   
    //save post to server
  };

  // WILL REPLACE IMAGE SELECTOR WITH PAGE
  return (
    <ThemedView style={styles.container}>


      {imageUri !== null && <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />}
      <ImageSelector onImageSelected={handleImageSelected} /> 
      <Button title="Take Photo" onPress={() => router.back()} />
      <Button title="Remove Photo" onPress={() => setImageUri(null)} />

      <TextInput
        style={styles.textInput}
        placeholder="Enter caption..."
        value={postText}
        onChangeText={setPostText}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Restaurant Name..."
        value={restaurantName}
        onChangeText={setRestaurantName}
      />

      <Button title="Post" onPress={handlePost} />
      <Link href={'/(tabs)'} asChild>
          <Button title="Back" />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center',

  },
  textInput: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
  },
});