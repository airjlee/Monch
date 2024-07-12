import React from 'react';
import { Stack } from 'expo-router';

export default function PostLayout() {
  return (
    <Stack
    screenOptions={{
     
      headerShown: false,
    }}>
      <Stack.Screen
        name="post"
        options={{
          title: 'New Post',
        }}
      />
      
    </Stack>
  );
}