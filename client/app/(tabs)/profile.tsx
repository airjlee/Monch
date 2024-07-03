import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Post } from '@/components/Post';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const DanielLePFP = require('../../assets/images/danielpfp.jpg');


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

export default function Profile() {
    const insets = useSafeAreaInsets(); // allows for dynamic positioning on different devices based on different notches
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

    const [selectedPost, setSelectedPost] = useState<Post|null>(null);

    const renderPostItem = ({ item }: { item: Post }) => (
        <TouchableOpacity 
            style={styles.postItem}
            onPress={() => setSelectedPost(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        </TouchableOpacity>
    );

    // when post is selected, opens up the individual post page
    const renderPostModal = () => (
        <Modal
            visible={selectedPost !== null}
            animationType="slide"
            transparent={false} // makes it full the whole background
            onRequestClose={() => setSelectedPost(null)} // enables the back button on android
            >
            <View style={styles.modalContainer}>
                <TouchableOpacity 
                    style={insetsStyles.closeButton}
                    onPress={() => setSelectedPost(null)}
                >
                    <Feather name="x" size={24} color="#333" />
                </TouchableOpacity>
                <ScrollView style={insetsStyles.modalContent}>
                    {selectedPost && (
                        <>
                            <Image source={{ uri: selectedPost.imageUrl }} style={styles.modalImage} />
                            <View style={styles.modalTextContent}>
                                <Text style={styles.modalUsername}>{selectedPost.username}</Text>
                                <Text style={styles.modalPostContent}>{selectedPost.content}</Text>
                            </View>
                        </>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );

    return (
        <ThemedView style={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={DanielLePFP}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Daniel Le</Text>
            </View>
            <View style={styles.profileDetails}>
                <Text style={styles.detailsText}>Sum calm.</Text>
                <Text style={styles.detailsTitle}>Location:</Text>
                <Text style={styles.detailsText}>Seattle, WA</Text>
            </View>
            
            <View style={styles.sortContainer}> 
                <TouchableOpacity style={styles.sortButton}>
                    <Feather name="sliders" size={24} color="#333" />
                </TouchableOpacity>
            </View>
            
            <FlatList // posts grid
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                numColumns={3}
                columnWrapperStyle={styles.postRow}
                contentContainerStyle={styles.postContainer}
            />
            {renderPostModal()}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileHeader: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileDetails: {
        marginHorizontal: 20,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    detailsText: {
        fontSize: 16,
        marginVertical: 5,
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 10,
        marginHorizontal: 15,
    },
    sortButton: {
        padding: 5,
    },
    sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    postRow: {
        justifyContent: 'flex-start',
        marginHorizontal: 0,
    },
    postItem: {
        width: '33.33%',
        aspectRatio: 1,
        padding: 1,
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    postContainer: {
        marginHorizontal: -1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
        padding: 10,
    },
    modalContent: {
        flex: 1,
        marginTop: 50,
    },
    modalImage: {
        width: '100%',
        aspectRatio: 1,
    },
    modalTextContent: {
        padding: 15,
    },
    modalUsername: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    modalPostContent: {
        fontSize: 14,
    },
});