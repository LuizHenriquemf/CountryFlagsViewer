import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
  const { countryName } = route.params;
  const [countryDetails, setCountryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    loadCountryDetails();
  }, []);

  const loadCountryDetails = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      const details = response.data[0];
      setCountryDetails(details);
    } catch (error) {
      console.error('Erro ao carregar os detalhes do país:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: countryDetails.flags[0] }}
        style={styles.image}
        onError={() => console.log('A imagem não foi carregada')}
      />
      <Text style={styles.name}>{countryDetails.name.common}</Text>
      <Text style={styles.capital}>Capital: {countryDetails.capital}</Text>
      <Text style={styles.population}>População: {countryDetails.population.toLocaleString()}</Text>
      <Text style={styles.area}>Área: {countryDetails.area} sq km</Text>
      <Text style={styles.title}>Linguagem:</Text>
      <FlatList
        data={Object.keys(countryDetails.languages)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.value}>{item}</Text>
        )}
      />
      <Text style={styles.title}>Moedas:</Text>
      <FlatList
        data={Object.keys(countryDetails.currencies)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.value}>{item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  image: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  capital: {
    fontSize: 18,
    textAlign: 'center',
  },
  population: {
    fontSize: 16,
    textAlign: 'center',
  },
  area: {
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    
  },
});

export default DetailScreen;
