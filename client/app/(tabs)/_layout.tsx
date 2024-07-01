import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Post } from '@/components/Post';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const [posts, setPosts] = useState<Post[]>([]);
  const colorScheme = useColorScheme();

  const handlePost = (p : Post ) => {
    setPosts(posts.concat([p]));
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'camera' : 'camera-outline'} color={color} />
          ),
    
          // tabBarStyle: { display: "none" } // remove nav
        }}
        // initialParams={{ handlePost }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
