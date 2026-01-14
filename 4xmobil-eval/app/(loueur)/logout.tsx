import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Logout() {
    useEffect(() => {
        const logout = async () => {
            router.replace('/(auth)/login');
        };
        logout();
    }, []);

    return null; // pas de UI
}
