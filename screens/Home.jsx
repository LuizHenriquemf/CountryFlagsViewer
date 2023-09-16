import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); 

  useEffect(() => {
    loadCountries();
  }, [page]);

  const loadCountries = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/all?fields=name,flags,region,area`
      );
      const newCountries = response.data;

      newCountries.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));

      setCountries((prevCountries) => [...prevCountries, ...newCountries]);
      setError(null);
    } catch (error) {
      console.error('Erro ao carregar países:', error);
      setError('Erro ao carregar países. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreCountries = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  const handleCountryClick = (countryName) => {
    navigation.navigate('Detail', { countryName });
  };

  
  const handleFormButtonClick = () => {
    navigation.navigate('Form');
  };

  const renderCard = ({ item }) => {
    const { flags, name, region, area } = item;

    return (
      <TouchableOpacity onPress={() => handleCountryClick(name.common)}>
        <View style={styles.card}>
          <Image
            source={{ uri: flags.png }}
            style={styles.image}
            onError={() => console.log('A imagem não foi carregada')}
          />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{name.common}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Região:</Text>
              <Text style={styles.infoText}>{region}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Área:</Text>
              <Text style={styles.infoText}>{area} km²</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
            data={countries}
            keyExtractor={(item, index) => `${item.name.common}-${index}`}
            renderItem={renderCard}
            onEndReached={loadMoreCountries}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isLoading && <ActivityIndicator />}
            style={styles.flatList}
        />
      )}
      <TouchableOpacity onPress={handleFormButtonClick}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Preencher Formulário</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: 'gainsboro',
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 50,
    marginRight: 16,
    borderRadius: 4,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    marginRight: 4,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  flatList: {
    marginVertical: 16,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
