import React from 'react';
import { Stack, Link, useRouter} from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';


export default function PostLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <Link href="/(tabs)" asChild>
            <TouchableOpacity>
              <Text style={{ color: 'blue', padding: 10 }}>Close</Text>
            </TouchableOpacity>
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
