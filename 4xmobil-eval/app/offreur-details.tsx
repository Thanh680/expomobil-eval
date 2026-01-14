import { useState, useEffect } from 'react';
import { ThemedView } from '@/components/themed-view';
import {StyleSheet, TouchableOpacity, View, Text, Pressable,Image, ScrollView,ActivityIndicator  } from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router';
import {Link} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from 'expo-router';

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
        nbRdv: number;
        prix: number;
    }

    const { id } = useLocalSearchParams<{ id: string }>();

    const [offreur, setOffreur] = useState<Offreur | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

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
            } catch (error) {
                console.error(error);
            }finally {
                setLoading(false);
            }
        };

        loadOffreur();
    }, [id]);

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

                <Image source={{ uri: offreur.avatar }} style={styles.avatar} />

                <Text style={styles.titre}>{offreur.titre}</Text>
                <Text style={styles.nom}>
                    {offreur.prenom} {offreur.nom}, {offreur.age} ans
                </Text>

                <Text style={styles.note}>⭐ {offreur.note} • {offreur.nbRdv} RDV</Text>
                <Text style={styles.ville}>{offreur.ville}</Text>

                <View style={styles.separator} />

                <Text style={styles.section}>Description</Text>
                <Text style={styles.description}>{offreur.description}</Text>

                <View style={styles.separator} />

                <Text style={styles.prix}>{offreur.prix}€ / heure</Text>
                <Link
                    href={{
                        pathname: "/offreur-note",
                        params: { id: offreur.id },
                    }}
                    asChild
                >
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Prendre RDV</Text>
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
        backgroundColor: '#FF385C', // Airbnb red
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
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 16,
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
        color: '#2e7d32',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
});