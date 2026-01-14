import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import {Alert, StyleSheet, TouchableOpacity, View, Text, Pressable, ScrollView,ActivityIndicator  } from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router';
import {Link} from "expo-router";
import { useNavigation } from 'expo-router';

export default function OffreurDetails() {

    type Offreur = {
        id: number;
        titre: string;
        nom: string;
        prenom: string;
        age: number;
        latitude: number;
        longitude: number;
        ville: string;
        description: string;
        avatar: string;
        note: number;
        nbrdv: number;
        prix: number;
    }

    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();

    const [offreur, setOffreur] = useState<Offreur | null>(null);
    const [loading, setLoading] = useState(true);

    const loadOffreur = async () => {
        try {
            const response = await fetch(
                `http://172.17.18.16:8080/api/offreur/${id}`
            );

            if (!response.ok) {
                throw new Error('Erreur serveur');
            }

            const data: Offreur = await response.json();
            setOffreur(data);
            navigation.setOptions({ title: data.titre });
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!id) return;

        loadOffreur();
    }, [id]);

    const handlePress = async () => {
        try {
            const response = await fetch(
                `http://172.17.18.16:8080/api/offreur/${id}/rdv`,
                { method: 'PUT' }
            );

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Impossible de prendre le RDV');
            }

            Alert.alert('Succès', "Le RDV a bien été pris en compte");
            loadOffreur();
        } catch (error: any) {
            Alert.alert('Erreur', "Le RDV n'a pas pu être pris en compte");
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    if (!offreur) {
        return (
            <View style={styles.center}>
                <Text>Offreur introuvable</Text>
            </View>
        );
    }
    return (
        <ThemedView style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>

                        <Image source={{ uri: offreur.avatar }} style={styles.avatar} />
                    </View>
                    <View style={styles.card}>
                <Text style={styles.titre}>{offreur.titre}</Text>
                <Text style={styles.nom}>
                    {offreur.prenom} {offreur.nom}, {offreur.age} ans
                </Text>

                <Text style={styles.note}>⭐ {offreur.note} • {offreur.nbrdv} RDV</Text>
                <Text style={styles.ville}>{offreur.ville}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.card}>
                    <Text style={styles.section}>Description</Text>
                    <Text style={styles.description}>{offreur.description}</Text>
                </View>
                <View style={styles.separator} />

                <Text style={styles.prix}>{offreur.prix}€ / heure</Text>

                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Prendre RDV</Text>
                </TouchableOpacity>
                <Link
                    href={{
                        pathname: "/offreur-note",
                        params: { id: offreur.id },
                    }}
                    asChild
                >
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Noter le service</Text>
                </TouchableOpacity>
                </Link>
            </ScrollView>
        </View>
            </SafeAreaView>
        </ThemedView>
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF385C',
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        padding: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    card: {
        borderRadius: 16,
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        padding: 10,
        margin: 8,
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 220,
        width: 220
    },
    titre: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nom: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    note: {
        marginTop: 8,
        fontSize: 14,
    },
    ville: {
        marginTop: 4,
        fontSize: 14,
        color: '#777',
    },
    section: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
    },
    description: {
        fontSize: 14,
        marginTop: 8,
        lineHeight: 20,
    },
    prix: {
        marginTop: 24,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF385C',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
});