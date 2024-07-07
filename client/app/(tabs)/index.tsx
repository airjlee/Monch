import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Image, TextInput, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Post } from '@/components/Post';
import { SearchBar } from '@/components/SearchBar';


// dummy post array to intitially represent posts
// we will write a fetch from server to get actual posts
const posts: Post[] = [
  {
    id: '1',
    username: 'airjlee',
    imageUrl: 'https://via.placeholder.com/350x150',
    content: 'fire food',
  },
  {
    id: '2',
    username: 'hemkeshb',
    imageUrl: 'https://via.placeholder.com/350x150',
    content: 'this was gasssss',
  },
  {
    id: '3',
    username: 'alexshuozeng',
    imageUrl: 'https://via.placeholder.com/350x150',
    content: 'ts hitttt',
  },
  {
    id: '4',
    username: 'ledaniel',
    imageUrl: 'https://via.placeholder.com/350x150',
    content: 'yummy',
  },
];



const PostItem: React.FC<Post> = ({ username, imageUrl, content }) => (
  <View style={styles.post}>
    <View style={styles.postHeader}>
      <Image
        source={{ uri: 'https://via.placeholder.com/40' }}
        style={styles.avatar}
      />
      <ThemedText style={styles.username}>{username}</ThemedText>
    </View>
    <Image source={{ uri: imageUrl }} style={styles.postImage} />
    <View style={styles.postContent}>
      <ThemedText style={styles.postText}>{content}</ThemedText>
    </View>
  </View>
);

export default function HomeScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Implement search logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} />
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostItem
              id={item.id}
              username={item.username}
              imageUrl={item.imageUrl}
              content={item.content}
            />
          )}
          contentContainerStyle={styles.postsContainer}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postsContainer: {
    padding: 16,
  },
  post: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',

  },
  postImage: {
    width: '100%',
    height: 350,
  },
  postContent: {
    padding: 10,
  },
  postText: {
    fontSize: 16,
  },
});