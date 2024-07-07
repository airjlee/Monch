import React from "react";
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchInputWrapper}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="What are you craving?"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
        />
      </View>
    </View>
);

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 5,
        marginTop: -12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10,
        padding: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        height: 40,
    },
});