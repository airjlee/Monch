import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function profile() {
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
                {/*<Text style={styles.detailsTitle}>Bio:</Text>*/}
                <Text style={styles.detailsText}>
                    Sum calm.
                </Text>
                {/*<Text style={styles.detailsTitle}>Email:</Text>*/}
                {/*<Text style={styles.detailsText}>johndoe@example.com</Text>*/}
                <Text style={styles.detailsTitle}>Location:</Text>
                <Text style={styles.detailsText}>Seattle, WA</Text>
            </View>
        </ScrollView>
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
});