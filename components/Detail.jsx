import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DetailScreen = ({ route }) => {
  const { countryName } = route.params;
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const countryData = response.data[0];
        setCountryDetails(countryData);
      } catch (error) {
        console.error('Erro ao carregar detalhes do país:', error);
      }
    };

    fetchCountryDetails();
  }, [countryName]);

  const formatCurrencies = () => {
    if (countryDetails && countryDetails.currencies) {
      const currenciesArray = Object.values(countryDetails.currencies).map(
        (currency) => {
          if (typeof currency === 'string') {
            return currency;
          } else if (currency.name) {
            return currency.name;
          } else {
            return 'N/A';
          }
        }
      );

      return currenciesArray.join(', ');
    } else {
      return 'N/A';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {countryDetails && (
        <>
          <Image
            source={{ uri: countryDetails.flags.png }}
            style={styles.flag}
            resizeMode="contain"
          />
          <Text style={styles.name}>{countryDetails.name.common}</Text>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Capital:</Text>
            <Text style={styles.detailText}>
              {countryDetails.capital ? countryDetails.capital[0] : 'N/A'}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Região:</Text>
            <Text style={styles.detailText}>{countryDetails.region}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Área:</Text>
            <Text style={styles.detailText}>
              {countryDetails.area} km²
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>População:</Text>
            <Text style={styles.detailText}>
              {countryDetails.population
                ? countryDetails.population.toLocaleString()
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Linguagens:</Text>
            <Text style={styles.detailText}>
              {countryDetails.languages
                ? Object.values(countryDetails.languages).join(', ')
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Moedas:</Text>
            <Text style={styles.detailText}>{formatCurrencies()}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  flag: {
    width: 200,
    height: 120,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailText: {
    fontSize: 16,
  },
});

export default DetailScreen;
