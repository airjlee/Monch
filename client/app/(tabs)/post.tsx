import { Image, StyleSheet, Platform, Button } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import  ImageSelector from '@/components/ImageSelector';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';




export default function PostScreen()  {
  const [postText, setPostText] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);


  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
  };

  const handlePost = () => {
    console.log('Posting with text:', postText, 'and image:', imageUri);
  };


  return (
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Post</ThemedText>
        {/* <ImageSelector onImageSelected={handleImageSelected} /> */}
        <Button title="Post" onPress={handlePost} />
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
