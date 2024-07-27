import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Button, Text, View, TouchableOpacity, FlatList, TextInput,  } from "react-native";
import {Feather} from '@expo/vector-icons';
import {ThemedView} from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UserProfile} from "@/components/UserProfile";
import PostModal from '@/components/individualPost';
import {Post} from '@/components/Post';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from '@/hooks/AuthContext';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';



// dummy profile array to intitially represent posts
// we will write a fetch from server to get actual posts
const Daniel: UserProfile = {
    username: 'ledaniel',
    imageUrl: require('../../assets/images/danielpfp.jpg'),
    bio: 'Sum calm.',
    location: 'Seattle, WA'
};


// dummy post array to intitially represent posts
// we will write a fetch from server to get actual posts
const posts: Post[] = [
    {
        id: '1',
        username: 'airjlee',
        rating: 1,
        restaurantName: "",
        images: [
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150'],
        caption: 'fire food',

    },
    {
        id: '2',
        username: 'hemkeshb',
        rating: 1,
        restaurantName: "",
        images: [
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150'],
        caption: 'this was gasssss',
    },
    {
        id: '3',
        username: 'alexshuozeng',
        rating: 1,
        restaurantName: "",
        images: [
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150'],
        caption: 'ts hitttt',
    },
    {
        id: '4',
        username: 'ledaniel',
        rating: 1,
        restaurantName: "",
        images: [
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150',
            'https://via.placeholder.com/350x150'],
        caption: 'yummy',
    },
];

export default function Profile() {
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
    const [selectedPostIndex, setSelectedPostIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [postsArray, setPostsArray] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, setUser } = useAuth();
    
    const router = useRouter();

    useEffect(() => {
        handlePostsRetrieve();
      }, []);
      
      const handlePostsRetrieve = async () => {
        try{
          setIsLoading(true);
          const response = await fetch("http://localhost:8080/api/posts", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
          })
          if(!response.ok){
            throw new Error("not ok");
          }
          const data = await response.json();
          console.log("POST SUCCESS", data);
          setPostsArray(data);
          setError(null);
        } catch (error) {
          console.error("error: ", error);
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setIsLoading(false);
        }
    }

    const handleLogout = async () => {
        await auth.signOut();
        setUser(null);
        router.replace('/(auth)');
      };

    const handlePostPress = (postIndex: number) => {
        setSelectedPostIndex(postIndex);
        setModalVisible(true);
    };

    const renderPostItem = ({item, index}: { item: Post, index: number }) => (
        <TouchableOpacity
            style={styles.postItem}
            onPress={() => handlePostPress(index)}>
            <Image source={{uri: item.images[0]}} style={styles.postImage}/>
        </TouchableOpacity>
    );

    // select initial profile
    const [selectedProfile, setSelectedProfile] = useState(Daniel);
    const [name, setName] = useState(selectedProfile.username);
    const [image, setImage] = useState(selectedProfile.imageUrl);
    const [bio, setBio] = useState(selectedProfile.bio);
    const [location, SetLocation] = useState(selectedProfile.location);
    const [edit, setEdit] = useState(false);

    // Capture image from camera roll
    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.75,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setImage(imageUri);
            // Save image URI to AsyncStorage
            try {
                await AsyncStorage.setItem('profileImage', imageUri);
            } catch (error) {
                console.error('Failed to save image:', error);
            }
        }
    };
    const loadImage = async () => {
        try {
            const savedImage = await AsyncStorage.getItem('profileImage');
            if (savedImage) {
                setImage(savedImage);
            }
        } catch (error) {
            console.error('Failed to load image:', error);
        }
    };
    loadImage();

    return (
        <ThemedView style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity onPress={onCaptureImage}>
                    <Image
                        source={typeof image === 'string'
                            ? {uri: image}
                            : image}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <Text style={styles.profileName}>{user?.displayName}</Text>
                <View style={styles.profileDetails}>
                    {!edit && (
                        <View style={styles.editRow}>
                            <Text>
                                {bio}
                            </Text>
                            <TouchableOpacity onPress={() => setEdit(true)}>
                                <Ionicons name="create-outline" size={24} />
                            </TouchableOpacity>
                        </View>
                    )}
                    {edit && (
                        <View style={styles.editRow}>
                            <TextInput
                                placeholder="Your bio"
                                value={bio || ''}
                                onChangeText={setBio}
                                style={[styles.inputField, { width: 100 }]}
                            />
                            <TouchableOpacity onPress={() => setEdit(false)}>
                                <Ionicons name="checkmark-outline" size={24} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Text style={styles.detailsText}>{location}</Text>
                <Button title="Logout" onPress={handleLogout} />
            </View>
            
            <View style={styles.sortContainer}>
                <TouchableOpacity style={styles.sortButton}>
                    <Feather name="sliders" size={24} color="#333"/>
                </TouchableOpacity>
            </View>
            {isLoading ? (
            <ThemedText>Loading...</ThemedText>
        ) : error ? (
            <ThemedText>Error: {error}</ThemedText>
        ) : (
            <FlatList
                // data={posts}
                data={postsArray}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                numColumns={3}
                columnWrapperStyle={styles.postRow}
                contentContainerStyle={styles.postContainer}
            />
        )}
            <PostModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                // post={selectedPost}
                post={postsArray[selectedPostIndex]}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    }
    ,
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: 'center',
        gap: 7,
        marginBottom: 24,
    },
    profileHeader: {
        alignItems: 'center',
        marginVertical: 20,
    }
    ,
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5,
    }
    ,
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    }
    ,
    profileDetails: {
        flexDirection: 'row',
        gap: 6,
        marginHorizontal: 20,
    }
    ,
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    }
    ,
    detailsText: {
        fontSize: 16,
        marginVertical: 5,
    }
    ,
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 10,
        marginHorizontal: 15,
    }
    ,
    sortButton: {
        padding: 5,
    }
    ,
    sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
    ,
    postRow: {
        justifyContent: 'flex-start',
        marginHorizontal: 0,
    }
    ,
    postItem: {
        width: '33.33%',
        aspectRatio: 1,
        padding: 1,
    }
    ,
    postImage: {
        width: '100%',
        height: '100%',
    }
    ,
    postContainer: {
        marginHorizontal: -1,
    }
    ,
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    }
    ,
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
        padding: 10,
    }
    ,
    modalContent: {
        flex: 1,
        marginTop: 50,
    }
    ,
    modalImage: {
        width: '100%',
        aspectRatio: 1,
    }
    ,
    modalTextContent: {
        padding: 15,
    }
    ,
    modalUsername: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    }
    ,
    modalRestaurantName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    }
    ,
    modalRating: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    }
    ,
    modalCaption: {
        fontSize: 14,
    },
    editRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
});