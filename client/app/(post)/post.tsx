import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Button, TextInput, Image, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import ImageSelector from '@/components/ImageSelector';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { Post } from '@/components/Post';
import { useAuth } from '@/hooks/AuthContext';

const ITEM_WIDTH = 50;  // Width of each rating item
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PostScreen() {
  console.log('PostScreen rendered');
  const router = useRouter();
  const { capturedImageUri } = useLocalSearchParams();
  const [postText, setPostText] = useState<string>('');
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5.0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (capturedImageUri) {
      setImageUri(capturedImageUri as string);
    }
  }, [capturedImageUri]);

  useEffect(() => {
    scrollToRating(rating);
  }, []);

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
    setShowPhotoOptions(false);
  };

  const handlePost = async () => {
    const post: Post = {
      id: "1",
      username: user?.email === undefined  || user?.email == null ? "" : user?.email,
      rating: rating,
      restaurantName: restaurantName,
      images: imageUri === null ? [] : [imageUri],
      caption: postText,
    }
    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })

      if (!response.ok) {
        throw new Error("not ok");
      }

      const data = await response.json();
      console.log("success: ", data);

    } catch (error) {
      console.error("error: ", error);
    }

  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / ITEM_WIDTH);
    const newRating = (index + 10) / 10;
    setRating(Math.max(1, Math.min(10, newRating)));
  };

  const scrollToRating = (targetRating: number) => {
    if (scrollViewRef.current) {
      const index = Math.round((targetRating - 1) * 10);
      scrollViewRef.current.scrollTo({ x: index * ITEM_WIDTH, animated: true });
    }
  };

  const handleRatingPress = (r: number) => {
    setRating(r);
    scrollToRating(r);
  };

  const renderRatingCarousel = () => {
    const ratings = Array.from({ length: 91 }, (_, i) => (i + 10) / 10);
    return (
      <View style={styles.ratingCarouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ratingCarousel}
          contentContainerStyle={styles.ratingCarouselContent}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {ratings.map((r) => (
            <TouchableOpacity key={r} onPress={() => handleRatingPress(r)} style={styles.ratingItem}>
              <ThemedText style={rating === r ? styles.selectedRating : styles.ratingText}>
                {r.toFixed(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.centerIndicator} pointerEvents="none" />
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>


      <TouchableOpacity style={styles.imageContainer} onPress={() => setShowPhotoOptions(true)}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <ThemedText>Tap to add photo</ThemedText>
        )}
      </TouchableOpacity>

      {showPhotoOptions && (
        <View style={styles.photoOptions}>
          <Button title="Take Photo" onPress={() => router.back()} />
          <ImageSelector onImageSelected={handleImageSelected} />
          {imageUri && <Button title="Remove Photo" onPress={() => setImageUri(null)} />}
        </View>
      )}

      <TextInput
        style={styles.textInput}
        placeholder="Restaurant Name..."
        value={restaurantName}
        onChangeText={setRestaurantName}
      />

      <TextInput
        style={[styles.textInput, styles.captionInput]}
        placeholder="Enter caption..."
        value={postText}
        onChangeText={setPostText}
        multiline
      />

      {renderRatingCarousel()}
      {/* <ThemedText style={styles.selectedRatingText}>Selected Rating: {rating.toFixed(1)}</ThemedText> */}

      
      <Link href={'/(tabs)'} asChild >
       <Button title="Post" onPress={handlePost} />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  captionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingCarouselContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingCarousel: {
    width: '100%',
  },
  ratingCarouselContent: {
    paddingHorizontal: SCREEN_WIDTH / 2 - 20 - ITEM_WIDTH / 2,
  },
  ratingItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: 16,
  },
  selectedRating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedRatingText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: SCREEN_WIDTH / 2 - 1,
    width: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});