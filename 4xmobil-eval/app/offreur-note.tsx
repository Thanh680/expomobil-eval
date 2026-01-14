import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import {useLocalSearchParams} from "expo-router";

interface StarIconProps {
    filled: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ filled }) => (
    <Text style={styles.star}>
        {filled ? '★' : '☆'}
    </Text>
);

export default function RatingScreen() {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const { id } = useLocalSearchParams<{ id: string }>();

    const handleSubmit = async (): Promise<void> => {
        if (rating > 0) {
            setSubmitted(true);
            try {
                const response = await fetch(
                    `http://172.17.18.16:8080/api/offreur/${id}/rate?rating=${rating}`,
                    {
                        method: 'PUT',
                    }
                );

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'envoi de la notation');
                }
            } catch (err) {
                throw new Error('Impossible d\'envoyer votre avis. Veuillez réessayer.');
                console.error('Erreur:', err);
            }
        }
    };


    if (submitted) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                    <Text style={styles.successTitle}>Merci pour votre avis !</Text>
                    <Text style={styles.successText}>
                        Votre notation a été enregistrée avec succès.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.title}>Notez le service</Text>
                    <Text style={styles.subtitle}>Votre avis compte</Text>

                    <View style={styles.starsContainer}>
                        <View style={styles.starsRow}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => setRating(star)}
                                    style={styles.starButton}
                                    activeOpacity={0.7}
                                >
                                    <StarIcon filled={star <= rating} />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.ratingText}>
                            {rating > 0 ? `${rating} étoile${rating > 1 ? 's' : ''}` : 'Appuyez pour noter'}
                        </Text>
                    </View>


                    <TouchableOpacity
                        style={[styles.button, rating === 0 && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={rating === 0}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.buttonText, rating === 0 && styles.buttonTextDisabled]}>
                            Envoyer mon avis
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4FF',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    starsContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    starButton: {
        padding: 4,
    },
    star: {
        fontSize: 48,
        color: '#FCD34D',
    },
    ratingText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#4F46E5',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonTextDisabled: {
        color: '#9CA3AF',
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#D1FAE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkmark: {
        fontSize: 40,
        color: '#10B981',
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
        textAlign: 'center',
    },
    successText: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 32,
        textAlign: 'center',
    },
});