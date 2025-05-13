import React, { useContext, useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";

interface Viagem {
  id: string | number;
  veiculo_id: string;
  motorista_id: string;
  hora_chegada: string;
  local_chegada: string;
  km_chegada: string;
  km_total: string;
  nivel_combustivel: string;
  nota: string;
  status: string;
  veiculo?: { id: string | number; placa: string };
  motorista?: { id: string | number; nome: string };
}

interface FormData {
  veiculo_id: string;
  motorista_id: string;
  hora_chegada: string;
  local_chegada: string;
  km_chegada: string;
  km_total: string;
  nivel_combustivel: string;
  nota: string;
  status: string;
}

export default function ViagemScreen() {
  const { signOut } = useContext(AuthContext);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [motoristas, setMotoristas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    veiculo_id: "",
    motorista_id: "",
    hora_chegada: "",
    local_chegada: "",
    km_chegada: "",
    km_total: "",
    nivel_combustivel: "",
    nota: "",
    status: "Ativo",
  });

  const fieldLabels: { [key: string]: string } = {
    veiculo_id: "Veículo",
    motorista_id: "Motorista",
    hora_chegada: "Hora Chegada",
    local_chegada: "Local Chegada",
    km_chegada: "Km Chegada",
    km_total: "Km Total",
    nivel_combustivel: "Nivel Combustivel",
    nota: "Nota",
    status: "Status",
  };

  async function fetchViagens() {
    setLoading(true);
    try {
      const response = await api.get("/finalizar_viagem");
      setViagens(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      console.log("Enviando dados:", formData);
      await api.post("/finalizar_viagem", formData);
      setFormData({
        veiculo_id: "",
        motorista_id: "",
        hora_chegada: "",
        local_chegada: "",
        km_chegada: "",
        km_total: "",
        nivel_combustivel: "",
        nota: "",
        status: "",
      });
      fetchViagens();
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log('Erro detalhado:', JSON.stringify(e.response.data, null, 2));
      } else {
        console.log('Erro inesperado:', e.message || e);
      }
    }

  }

  async function handleEditItem() {
    if (!editingId) return;
    setLoading(true);
    try {
      await api.put(`/finalizar_viagem/${editingId}`, formData);
      setFormData({
        veiculo_id: "", motorista_id: "", hora_chegada: "" , local_chegada: "", km_chegada: "", km_total: "", nivel_combustivel: "", nota: "", status: ""
      });
      setEditing(false);
      setEditingId(null);
      fetchViagens();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteItem(id: string | number) {
    try {
      await api.delete(`/finalizar_viagem/${id}`);
      setViagens(viagens.filter((v) => v.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function loadEditItem(id: string | number) {
    try {
      const response = await api.get(`/finalizar_viagem/${id}`);
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
        <Text style={styles.formTitle}>{editing ? "Editar Viagem" : "Nova Viagem"}</Text>

        {Object.keys(fieldLabels).map((field) => (
          field === "status" ? (
            <View key="status" style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <Checkbox
                value={formData.status === 'Ativo'}
                onValueChange={(newValue) =>
                  setFormData((prev) => ({ ...prev, status: newValue ? 'Ativo' : 'Inativo' }))
                }
                color={formData.status === 'Ativo' ? '#34A853' : undefined}
              />
              <Text style={{ marginLeft: 10, color: '#000' }}>Status</Text>
            </View>
          ) : (
          field === "veiculo_id" || field === "motorista_id" ? (
            <Picker
              key={field}
              selectedValue={(formData as any)[field]}
              onValueChange={(value) => 
                setFormData((prev) => ({ ...prev, [field]: value }))
              }
              style={styles.select}
            >
              <Picker.Item label={`Selecione um ${fieldLabels[field]}`} value="" />
              {(field === "veiculo_id" ? veiculos : motoristas).map((item) => (
                <Picker.Item
                  key={item.id}
                  label={field === "veiculo_id" ? item.placa : item.nome}
                  value={item.id}
                />
              ))}
            </Picker>
          ) :
              <TextInput
                key={field}
                placeholder={fieldLabels[field]}
                placeholderTextColor="#7C7C8A"
                style={styles.input}
                value={(formData as any)[field]}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, [field]: text }))}
              />
            )
        ))}

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
          <Text style={[styles.tableHeaderText, styles.placaColumn]}>Placa</Text>
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
                <Text style={[styles.tableCell, styles.idColumn]}>
                  {item.id}</Text>
                <Text style={[styles.tableCell, styles.nameColumn]}>
                  {item.motorista?.nome || 'Sem Motorista'}
                </Text>
                <Text style={[styles.tableCell, styles.placaColumn]}>
                  {item.veiculo?.placa || 'Sem Veículo'}
                </Text>
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
