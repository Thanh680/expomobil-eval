import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link, router } from 'expo-router';

export default function Register() {
    const [typeUtilisateur, setTypeUtilisateur] = useState<boolean>(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [ville, setVille] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                return;
            }
            const response = await fetch('http://172.17.18.16:8080/api/auth/register', {
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

            router.replace('/(tabs)');

        } catch (error) {
            console.error(error);
            alert('Impossible de contacter le serveur');
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
                Inscrivez-vous pour commencer
            </Text>
            <View style={styles.radioGroup}>
                <TouchableOpacity
                    style={styles.radio}
                    onPress={() => setTypeUtilisateur(false)}
                >
                    <View style={[
                        styles.circle,
                        typeUtilisateur === false && styles.checked
                    ]} />
                    <Text>Offreur</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.radio}
                    onPress={() => setTypeUtilisateur(true)}
                >
                    <View style={[
                        styles.circle,
                        typeUtilisateur === true && styles.checked
                    ]} />
                    <Text>Loueur</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Nom"
                    value={nom}
                    onChangeText={setNom}
                />
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Prenom"
                    value={prenom}
                    onChangeText={setPrenom}
                />
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Age"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={(text) => {
                        // supprime tout sauf chiffres
                        const numericValue = text.replace(/[^0-9]/g, '');
                        setAge(numericValue);
                    }}
                />
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Ville"
                    value={ville}
                    onChangeText={setVille}
                />
            </View>
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

            <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Créer un compte</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Déjà un compte ? </Text>
                <Link href="/login" style={styles.link}>
                    Se connecter
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    link: {
        color: '#FF385C',
        fontWeight: '600',
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 10,
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#FF385C',
        marginRight: 6,
    },
    checked: {
        backgroundColor: '#FF385C',
    },

});
