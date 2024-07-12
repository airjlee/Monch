import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ImageCarousel from './imageCarousel';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Post } from '@/components/Post';

interface PostModalProps {
  isVisible: boolean;
  onClose: () => void;
  post: Post | null;
}

const PostModal: React.FC<PostModalProps> = ({ isVisible, onClose, post }) => {
    if (!post) return null;
    const insets = useSafeAreaInsets();
    const insetsStyles = {
        closeButton: {
            ...styles.closeButton,
            top: insets.top,
        },
        modalContent: {
            ...styles.modalContent,
            marginTop: insets.top + 50,
        },
    };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity 
          style={insetsStyles.closeButton}
          onPress={onClose}
        >
          <Feather name="x" size={24} color="#333" />
        </TouchableOpacity>
        <ScrollView style={insetsStyles.modalContent}>
          <ImageCarousel images={post.images} onImagePress={() => {}}/>
          <View style={styles.modalTextContent}>
            <Text style={styles.modalUsername}>{post.username}</Text>
            <Text style={styles.modalRestaurantName}>{post.restaurantName}</Text>
            <Text style={styles.modalRating}>Rating: {post.rating}</Text>
            <Text style={styles.modalCaption}>{post.caption}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalContent: {
    flex: 1,
    marginTop: 50,
  },
  modalTextContent: {
    padding: 15,
  },
  modalUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalRestaurantName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  modalRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  modalCaption: {
    fontSize: 14,
  },
});

export default PostModal;