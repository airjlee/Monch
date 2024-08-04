import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ImageCarousel from '@/components/imageCarousel';
import Icon from 'react-native-vector-icons/AntDesign';

export type Post = {
  id: string;
  username: string;
  rating: number;
  restaurantName: string;
  images: string[];
  caption: string;
};

type PostPageProps = {
  id: string;
  username: string;
  rating: number;
  restaurantName: string;
  images: string[];
  caption: string;
  onImagePress: (imageIndex: number) => void;
};

const { width: screenWidth } = Dimensions.get('window');

const interpolateColor = (rating: number) => {
  const red = { r: 255, g: 0, b: 0 };
  const yellow = { r: 255, g: 255, b: 0 };
  const green = { r: 0, g: 255, b: 0 };

  let result;

  if (rating <= 5) {
    const ratio = (rating - 1) / 4;
    result = {
      r: Math.round(red.r + ratio * (yellow.r - red.r)),
      g: Math.round(red.g + ratio * (yellow.g - red.g)),
      b: Math.round(red.b + ratio * (yellow.b - red.b)),
    };
  } else {
    const ratio = (rating - 5) / 5;
    result = {
      r: Math.round(yellow.r + ratio * (green.r - yellow.r)),
      g: Math.round(yellow.g + ratio * (green.g - yellow.g)),
      b: Math.round(yellow.b + ratio * (green.b - yellow.b)),
    };
  }

  return `rgb(${result.r}, ${result.g}, ${result.b})`;
};


const PostPage: React.FC<PostPageProps> = ({ id, username, restaurantName, rating, images, caption, onImagePress }) => {
  return (
    <View style={styles.post}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.restaurantName}>{restaurantName}</ThemedText>
      </View>
      <View style={styles.imageContainer}>
        <ImageCarousel
          images={images}
          onImagePress={onImagePress}
        />
        <View style={[styles.ratingContainer, { backgroundColor: interpolateColor(rating) }]}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
        <TouchableOpacity style={styles.heartIconContainer}>
          <Icon name="hearto" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.postContent}>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingBottom: 5,
  },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },
  imageContainer: {
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50,
    padding: 5,
  },
  postContent: {
    paddingTop: 5,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    fontSize: 12,
    color: '#000',
    paddingLeft: 5,
  },
});

// old post comp
// const PostPage: React.FC<PostPageProps> = ({ id, username, restaurantName, rating, images, caption, onImagePress }) => {
//   return (
//     <View style={styles.post}>
//     <View style={styles.postHeader}>
//       <Image
//         source={{ uri: 'https://via.placeholder.com/40' }}
//         style={styles.avatar}
//       />
//       <View style={styles.headerText}>
//         <ThemedText style={styles.username}>{username}</ThemedText>
//         <ThemedText style={styles.restaurantName}>{restaurantName}</ThemedText>
//       </View>
//       <View style={[styles.ratingContainer, { backgroundColor: interpolateColor(rating) }]}>
//         <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
//       </View>
//     </View>
//     <ImageCarousel
//       images={images}
//       onImagePress={onImagePress}
//     />
//     <View style={styles.postsContainer}>
//         <Text style={styles.username}>{username}</Text>
//         <Text style={styles.caption}>{caption}</Text>
//       </View>
//     </View>
//   );
// };

// old post style
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   postsContainer: {
//     padding: 16,
//   },
//   post: {
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 25,
//     overflow: 'hidden',
//     backgroundColor: '#fafafa',
//   },
//   postHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   username: {
//     fontWeight: 'bold',
//   },
//   postImage: {
//     width: '100%',
//     height: 350,
//   },
//   postContent: {
//     padding: 10,
//   },
//   postText: {
//     fontSize: 16,
//   },
//   headerText: {
//     flex: 1,
//   },
//   restaurantName: {
//     fontSize: 14,
//     color: '#666',
//   },
//   rating: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   ratingContainer: {
//     borderRadius: 15,
//     paddingVertical: 2,
//     paddingHorizontal: 10,
//   },
//   ratingText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   caption: {
//     fontSize: 14,
//     color: '#000',
//   },
//   imageContainer: {
//     position: 'relative',
//   },
// });

export default PostPage;
