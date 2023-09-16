import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCountries();
  }, [page]);

  const loadCountries = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/all?page=${page}&pageSize=10`
      );
      const newCountries = response.data;

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.flags[0] }}
        style={styles.image}
        onError={() => console.log('A imagem não foi carregada')}
      />
      <View>
        <Text style={styles.name}>{item.name.common}</Text>
        <Text style={styles.population}>
          Population: {item.population ? item.population.toLocaleString() : 'N/A'}
        </Text>
        <Text style={styles.capital}>
        Capital: {item.capital ? item.capital[0] : 'N/A'}
      </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={countries}
          keyExtractor={(item) => item.cca2}
          renderItem={renderItem}
          onEndReached={loadMoreCountries}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isLoading && <ActivityIndicator />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  item: {
    backgroundColor: 'aqua',
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  population: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default HomeScreen;
