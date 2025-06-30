import React, { useContext, useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

interface Viagem {
  id: string | number;
  veiculo_id: string;
  motorista_id: string;
  data_viagem: string;
  nivel_combustivel: string;
  nota: string;
  status: true | "aberto" | "finalizado";
  veiculo?: { id: string | number; placa: string };
  motorista?: {
    id: string | number;
    profissional?: {
      user?: {
        name: string;
      };
    };
  };
}

interface FormData {
  veiculo_id: string;
  motorista_id: string;
  data_viagem: string;
  nivel_combustivel: string;
  nota: string;
  status: true | "aberto" | "finalizado";
}

export default function ViagemScreen() {
  const { user } = useContext(AuthContext);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [motoristas, setMotoristas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [dataHoraAtual, setDataHoraAtual] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const [formData, setFormData] = useState<FormData>({
    veiculo_id: "",
    motorista_id: "",
    data_viagem: "",
    nivel_combustivel: "",
    nota: "",
    status: "aberto",
  });

  const fieldLabels: { [key: string]: string } = {
    veiculo_id: "Veículo",
    data_viagem: "Data da Viagem",
    nivel_combustivel: "Nível de Combustível",
    nota: "Nota",
    status: "Status",
  };

  async function fetchViagens() {
    setLoading(true);
    try {
      const response = await api.get("/viagem");
      setViagens(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchViagens();
    api.get("/veiculo").then((res) => setVeiculos(res.data));
    api.get("/motorista").then((res) => setMotoristas(res.data));

    if (user?.id) {
      api.get(`/motorista/user/${user.id}`)
        .then((res) => {
          const motorista = res.data;
          setFormData((prev) => ({
            ...prev,
            motorista_id: motorista.id,
          }));
        })
        .catch((error) => {
          console.log("Erro ao buscar motorista logado:", error?.response?.data || error.message);
        });
    }
  }, []);

  useEffect(() => {
    const atualizarDataHora = () => {
      const agora = new Date();
      const dataFormatada = agora.toLocaleDateString('pt-BR');
      const horaFormatada = agora.toLocaleTimeString('pt-BR');
      setDataHoraAtual(`${dataFormatada} ${horaFormatada}`);
    };

    atualizarDataHora();

    const intervalo = setInterval(atualizarDataHora, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const onChangeDate = (event: any, date?: Date) => {
    if (event.type === "set" && date) {
      console.log("Data selecionada:", date);  
      setSelectedDate(date);

      const dataFormatada = date.toISOString().split('T')[0];  
      setFormData((prev) => ({
        ...prev,
        data_viagem: dataFormatada,
      }));

      console.log("Data atual no formData:", dataFormatada);  
    } else {
      setShowDatePicker(false);  
    }
  };


  async function handleSubmit() {
    setLoading(true);
    try {
      console.log("Enviando dados:", formData);
      await api.post("/viagem", formData);
      setFormData({
        veiculo_id: "",
        motorista_id: "",
        data_viagem: "",
        nivel_combustivel: "",
        nota: "",
        status: "aberto",
      });
      fetchViagens();
      Alert.alert("Sucesso", "Viagem cadastrado com sucesso!");
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log('Erro detalhado:', JSON.stringify(e.response.data, null, 2));
        Alert.alert("Erro", e.response.data.message || "Erro ao cadastrar viagem.")
      } else {
        console.log('Erro inesperado:', e.message || e);
        Alert.alert("Erro", "Erro ao cadastrar viagem.");
      }
    }

  }

  async function handleEditItem() {
    if (!editingId) return;
    setLoading(true);
    try {
      await api.put(`/viagem/${editingId}`, formData);
      setFormData({
        veiculo_id: "", motorista_id: "", data_viagem: "", nivel_combustivel: "", nota: "", status: "aberto"
      });
      setEditing(false);
      setEditingId(null);
      fetchViagens();
      Alert.alert("Sucesso", "Viagem atualizado com sucesso!");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteItem(id: string | number) {
    try {
      await api.delete(`/viagem/${id}`);
      setViagens(viagens.filter((v) => v.id !== id));
      Alert.alert("Sucesso", "Viagem excluído com sucesso!");
    } catch (e) {
      console.log(e);
    }
  }

  async function loadEditItem(id: string | number) {
    try {
      const response = await api.get(`/viagem/${id}`);
      setFormData(response.data);
      setEditing(true);
      setEditingId(id);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchViagens();
    api.get("/veiculo").then((res) => setVeiculos(res.data));
    api.get("/motorista").then((res) => setMotoristas(res.data));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.formContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={[styles.formTitle, { marginBottom: 0 }]}>
            {editing ? "Editar Viagem" : "Nova Viagem"}
          </Text>
          <Text style={{ fontSize: 12, color: '#555', marginLeft: 10 }}>
            {dataHoraAtual}
          </Text>
        </View>


        {Object.keys(fieldLabels).map((field) => {
          if (field === "status") {
            return (
              <View key="status" style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Checkbox
                  value={formData.status === 'aberto'}
                  onValueChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, status: newValue ? 'aberto' : 'finalizado' }))
                  }
                  color={formData.status === 'aberto' ? '#34A853' : undefined}
                />
                <Text style={{ marginLeft: 10, color: '#000' }}>Status</Text>
              </View>
            );
          }

          if (field === "veiculo_id") {
            return (
              <Picker
                key={field}
                selectedValue={(formData as any)[field]}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, [field]: value }))
                }
                style={styles.select}
              >
                <Picker.Item label={`Selecione um ${fieldLabels[field]}`} value="" />
                {veiculos.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.placa}
                    value={item.id}
                  />
                ))}
              </Picker>
            );
          }

          if (field === "data_viagem") {
            return (
              <TouchableOpacity
                key={field}
                onPress={() => {
                  if (formData.data_viagem) {
                    setSelectedDate(new Date(formData.data_viagem));
                  } else {
                    setSelectedDate(new Date());
                  }
                  setShowDatePicker(true);
                }}
                style={[styles.input, { justifyContent: 'center' }]}
              >
                <Text style={{ color: formData.data_viagem ? '#000' : '#7C7C8A' }}>
                  {formData.data_viagem || "Selecione a Data da Viagem"}
                </Text>
              </TouchableOpacity>

            );
          }

          return (
            <TextInput
              key={field}
              placeholder={fieldLabels[field]}
              placeholderTextColor="#7C7C8A"
              style={styles.input}
              value={(formData as any)[field]}
              onChangeText={(text: string) => setFormData((prev) => ({ ...prev, [field]: text }))}
            />
          );
        })}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}



        <TouchableOpacity
          style={styles.button}
          onPress={editing ? handleEditItem : handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Carregando..." : editing ? "Editar" : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Lista de Viagens</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
          <Text style={[styles.tableHeaderText, styles.nameColumn]}>Nome</Text>
          <Text style={[styles.tableHeaderText, styles.placaColumn]}>Veículo</Text>
          <Text style={[styles.tableHeaderText, styles.actionColumn]}>Ações</Text>
        </View>

        <View
          style={styles.tableContent}
        >
          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : viagens.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum registro</Text>
          ) : (
            viagens.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.idColumn]}>{item.id}</Text>
                <Text style={[styles.tableCell, styles.nameColumn]}>{item.motorista?.profissional?.user?.name || 'Sem Motorista'}</Text>
                <Text style={[styles.tableCell, styles.placaColumn]}>{item.veiculo?.placa || 'Sem Veículo'}</Text>
                <View style={[styles.actionColumn, styles.actionButtons]}>
                  <TouchableOpacity style={styles.editButton} onPress={() => loadEditItem(item.id)}>
                    <Icon name="edit" size={16} color="#999" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                    <Icon name="trash-2" size={16} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={fetchViagens} disabled={loading}>
          <Text style={styles.refreshButtonText}>Atualizar Lista</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
