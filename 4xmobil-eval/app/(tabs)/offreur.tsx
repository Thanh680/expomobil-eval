import { Image } from 'expo-image';
import * as Location from 'expo-location';
import {FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import { ThemedView } from '@/components/themed-view';
import {Link} from "expo-router";
import { useState, useEffect } from 'react';

export default function OffreurScreen() {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const haversine = require('haversine');

    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }

        getCurrentLocation();
    }, []);


    type offreur = {
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

    const listOffreur = async (): Promise<offreur[]> => {
        try {
            const response = await fetch('http://172.17.18.16:8080/api/offreur/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur serveur');
            }

            const data: offreur[] = await response.json();
            return data;

        } catch (error) {
            console.error(error);
            throw new Error('Impossible de contacter le serveur');
        }
    };

    let [offre, setOffre] = useState<offreur[]>([]);

    useEffect(() => {
        const loadOffreurs = async () => {
            try {
                const data = await listOffreur();
                setOffre(data);
            } catch (e) {
                alert('Erreur lors du chargement des offreurs');
            }
        };

        loadOffreurs();
    }, []);

    let text = 'Waiting...';
    let start: { latitude: number; longitude: number; };
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);

        start = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }

        const end = {
            latitude: 48.8582599,
            longitude: 2.2945006
        }

        offre = start
            ? offre.filter((item) => {
                if (!item.latitude || !item.longitude) return false;

                const distance = haversine(start, {
                    latitude: item.latitude,
                    longitude: item.longitude,
                });

                return distance < 10;
            })
            : [];

        console.log(haversine(start, end, {unit: 'km'}) +" km")
    }




  return (
      <ThemedView style={{flex:1}}>
          <SafeAreaView style={{flex:1}}>
              <FlatList style={styles.list} data={offre} renderItem={({item})=>{
                  return (
                      <Link
                          href={{
                              pathname: "/offreur-details",
                              params: { id: item.id.toString() },
                          }}
                          asChild
                      >
                      <TouchableOpacity style={styles.card} activeOpacity={0.85}>

                          <Image
                              source={{ uri: item.avatar }}
                              style={styles.image}
                          />
                          <View style={styles.info}>
                              <View style={styles.row}>
                                  <Text style={styles.title} numberOfLines={1}>
                                      {item.titre}
                                  </Text>
                                  <Text style={styles.rating}>⭐ {item.note}</Text>
                              </View>
                              {item.latitude && item.longitude && start ? (
                              <Text style={styles.location}>{item.ville} (
                                  {(haversine(
                                      start,
                                      { latitude: item.latitude, longitude: item.longitude }
                                  )).toFixed(1)}km de chez vous)</Text>
                                  ) : null }
                              <Text style={styles.price}>
                                  <Text style={styles.priceBold}>{item.prix}€</Text> / heure
                              </Text>
                          </View>
                      </TouchableOpacity>
                      </Link>
                  );
              }}>
              </FlatList>
          </SafeAreaView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
    list: {
        flex:1,
        padding: 16,
        width: '90%',
        alignSelf: "center",
    },
    image: {
        height: 220,
        width: '100%',
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
    info: {
        padding: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        marginRight: 6,
    },
    rating: {
        fontSize: 14,
    },
    location: {
        color: '#717171',
        marginTop: 4,
    },
    price: {
        marginTop: 8,
        fontSize: 14,
    },
    priceBold: {
        fontWeight: '700',
        fontSize: 16,
    },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
