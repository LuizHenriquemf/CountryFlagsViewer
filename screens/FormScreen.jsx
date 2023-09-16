import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');

  const navigation = useNavigation(); 

  const handleSave = () => {
    alert(`Nome: ${name}\nIdade: ${age}\nPaís: ${country}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Digite seu nome"
        style={styles.input}
      />
      <Text style={styles.label}>Idade:</Text>
      <TextInput
        onChangeText={(text) => setAge(text)}
        value={age}
        placeholder="Digite sua idade"
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>País:</Text>
      <TextInput
        onChangeText={(text) => setCountry(text)}
        value={country}
        placeholder="Digite seu país"
        style={styles.input}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default FormScreen;
