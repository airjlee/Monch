import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Button, Modal, TextInput, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ImageSelector from '@/components/ImageSelector';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import Camera from '@/components/Camera';
import { Post } from '@/components/Post';


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
  // useFocusEffect(
  //   React.useCallback(() => {
      
  //     router.push({
  //       pathname: "/camera",
  //     })
  //     return () => {
  
  //       setImageUri(null);
  //       setPostText('');
  //       setRestaurantName('');
  //     };
  //   }, [])
  // );

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

  return (
    <ThemedView style={styles.container}>


      {imageUri !== null && <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />}
      <ImageSelector onImageSelected={handleImageSelected} />
      <Button title="Take Photo" onPress={() => router.push('/index')} />
      <Button title="Remove Photo" onPress={() => setImageUri(null)} />

      {/* {imageUri && (
        <ThemedText>Image selected: {imageUri}</ThemedText>
      )} */}

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
      <Button title="Back" onPress={() => router.replace('/(tabs)')} />

      {/* <Modal visible={showCamera} animationType="none">
        <Camera onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />
      </Modal> */}
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