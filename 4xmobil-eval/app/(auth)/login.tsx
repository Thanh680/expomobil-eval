import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link, router } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://172.17.18.16:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 401) {
                alert('Email ou mot de passe incorrect');
                return;
            }

            if (!response.ok) {
                alert('Erreur serveur');
                return;
            }
            const user = await response.text();

            // Redirection conditionnelle
            if (user === "true") {
                router.replace('/(offreur)/offreur');
            } else {
                router.replace('/(loueur)/loueur');
            }


        } catch (error) {
            console.error(error);
            alert('Impossible de contacter le serveur');
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Se connecter</Text>
            <Text style={styles.subtitle}>
                Bienvenue, connectez-vous pour continuer
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Adresse email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>

            <View style={styles.links}>
                <Link href="/register" style={styles.link}>
                    Créer un compte
                </Link>
            </View>
            <View style={[styles.links, { marginTop: 30 }]}>
                <Link href="/offreur" style={styles.link}>
                    Accès offreur sans connexion
                </Link>
            </View>
            <View style={[styles.links, { marginTop: 10 }]}>
                <Link href="/loueur" style={styles.link}>
                    Accès loueur sans connexion
                </Link>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 6,
    },
    subtitle: {
        color: '#717171',
        marginBottom: 24,
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 14,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FF385C',
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    links: {
        marginTop: 24,
        alignItems: 'center',
        gap: 12,
    },
    link: {
        color: '#FF385C',
        fontWeight: '500',
    },
});
