import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';
import axios from 'axios';

const API_URL = 'http://10.8.4.111:8000/api';

export default function GerarQrCode() {
  const [placas, setPlacas] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [veiculoDetalhes, setVeiculoDetalhes] = useState(null);
  const [mostrarQrCode, setMostrarQrCode] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [loadingPlacas, setLoadingPlacas] = useState(true);


  useEffect(() => {
    fetch(`${API_URL}/veiculo`)
      .then(res => res.json())
      .then(data => setPlacas(data))
      .catch(err => console.error('Erro ao buscar placas:', err));
  }, []);

  useEffect(() => {
    if (veiculoSelecionado) {
      setCarregando(true);
      fetch(`${API_URL}/veiculo/${veiculoSelecionado}`)
        .then(res => res.json())
        .then(data => {
          setVeiculoDetalhes(data);
          setMostrarQrCode(false);
        })
        .catch(err => console.error('Erro ao buscar veículo:', err))
        .finally(() => setCarregando(false));
    }
  }, [veiculoSelecionado]);

  useEffect(() => {
    const carregarPlacas = async () => {
      try {
        const response = await axios.get(`${API_URL}/veiculo`);
        setPlacas(response.data);
      } catch (error) {
        console.error('Erro ao carregar placas:', error);
      } finally {
        setLoadingPlacas(false);
      }
    };

    carregarPlacas();
  }, []);


  const gerarQrCode = () => {
    setMostrarQrCode(true);
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Selecionar Veículo:</Text>

        {loadingPlacas ? (
          <Text style={styles.loadingText}>Carregando veiculos...</Text>
        ) : (

          <Picker
            selectedValue={veiculoSelecionado}
            onValueChange={(value) => setVeiculoSelecionado(value)}
            style={styles.select}
          >
            <Picker.Item label="Escolha uma placa" value={null} />
            {placas.map(veiculo => (
              <Picker.Item key={veiculo.id} label={veiculo.placa} value={veiculo.id} />
            ))}
          </Picker>
        )}

        {carregando && <ActivityIndicator size="large" color="#0000ff" />}

        {veiculoDetalhes && (
          <View style={styles.formContainer}>
            <Text style={styles.text}>Nome: {veiculoDetalhes.nome}</Text>
            <Text style={styles.text}>Placa: {veiculoDetalhes.placa}</Text>
            <Text style={styles.text}>Marca: {veiculoDetalhes.marca}</Text>
            <Text style={styles.text}>Modelo: {veiculoDetalhes.modelo}</Text>
            <Text style={styles.text}>Status: {veiculoDetalhes.status}</Text>
            <TouchableOpacity style={styles.button} onPress={gerarQrCode}>
              <Text style={styles.buttonText}>Gerar QR Code</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View  >
        {mostrarQrCode && veiculoDetalhes && (
          <View style={styles.ContainerQr}>
            <QRCode
              value={JSON.stringify(veiculoDetalhes)}
              size={200}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

