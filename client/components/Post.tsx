import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';


export type Post = {
    id: string;
    username: string;
    rating: string;
    restaurantName: string;
    images: string[];
    caption: string;
};

type PostPageProps = {
  route: {
    params: {
      post: Post;
    };
  };
};

const { width: screenWidth } = Dimensions.get('window');

const PostPage: React.FC<PostPageProps> = ({ route }) => {
  const { post } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex + 1 < post.images.length ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex - 1 >= 0 ? prevIndex - 1 : post.images.length - 1
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.arrowLeft} onPress={prevImage}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={{ uri: post.images[currentImageIndex] }} style={styles.image} />
        <TouchableOpacity style={styles.arrowRight} onPress={nextImage}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.restaurantName}>{post.restaurantName}</Text>
        <Text style={styles.rating}>Rating: {post.rating}</Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 1,
  },
  arrowText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  caption: {
    fontSize: 14,
  },
});

export default PostPage;