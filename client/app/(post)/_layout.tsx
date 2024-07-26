import React from 'react';
import { Stack, Link } from 'expo-router';
import { Button, Pressable } from 'react-native';

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <Link href="/(tabs)" asChild>
            <Pressable>
              {({ pressed }) => (
                <Button 
                  title="close" 
                  onPress={() => {}} // This onPress is just a placeholder
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="post"
        options={{
          title: 'New Post',
        }}
      />
    </Stack>
  );
}