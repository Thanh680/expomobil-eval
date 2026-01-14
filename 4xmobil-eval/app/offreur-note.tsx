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

    const handleSubmit = (): void => {
        if (rating > 0) {
            setSubmitted(true);
            // Envoyez les données à votre backend ici
            console.log({ rating, comment });
        }
    };

    const resetForm = (): void => {
        setRating(0);
        setComment('');
        setSubmitted(false);
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
                    <TouchableOpacity style={styles.button} onPress={resetForm}>
                        <Text style={styles.buttonText}>Donner un autre avis</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.title}>Notez notre service</Text>
                    <Text style={styles.subtitle}>Votre avis compte pour nous</Text>

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

                    <View style={styles.commentContainer}>
                        <Text style={styles.label}>Commentaire (optionnel)</Text>
                        <TextInput
                            style={styles.textInput}
                            value={comment}
                            onChangeText={setComment}
                            placeholder="Partagez votre expérience..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
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
    commentContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: '#1F2937',
        minHeight: 100,
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