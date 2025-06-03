import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function RegisterUser() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation<any>();

  async function handleRegister() {
    try {
      const response = await api.post('/register', {
        name: nome,
        email,
        password: senha,
      });


      const user = response.data?.data?.user;

      console.log("Usuário criado:", user);  

      if (user && user.id) {
        navigation.navigate('Profissional', { userId: user.id });  
      } else {
        console.warn("Usuário criado, mas sem ID.");
      }

    } catch (error: any) {
      console.error('Erro ao registrar:', error?.response?.data || error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#282A36"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#282A36"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor="#282A36"
      />
      <Button title="Avançar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    color: '#282A36',
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
