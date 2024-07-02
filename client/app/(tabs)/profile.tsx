import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Post } from '@/components/Post';
import { Feather } from '@expo/vector-icons';


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
    const renderPostItem = ( { item }: { item: Post } ) => (
        <TouchableOpacity 
            style={styles.postItem}
            onPress={() => handlePostPress(item.id)}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: './assets/images/danielpfp.jpg' }}
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
        </ScrollView>
    );
};

// opens up post page
const handlePostPress = (itemID: string) => {

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
});