import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';

export type Post = {
    id: string;
    username: string;
    imageUrl: string;
    content: string;
};

type PostPageProps = {
  route: {
    params: {
      post: Post;
    };
  };
};

const PostPage: React.FC<PostPageProps> = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  contentContainer: {
    padding: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
  },
});

export default PostPage;