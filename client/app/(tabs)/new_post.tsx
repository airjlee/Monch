import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function NewPostTab() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/(post)')
      }, []);
    
    return null;
}