 import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { RouteProp, useRoute } from '@react-navigation/native';
import { styles } from "./styles";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


interface Profissional {
  id: number;
  nome: string;
  cpf: string;
  matricula: string;
  celular: string;
  codigo: string;
  user_id: string | number;
  status: boolean | string;
}

type ProfissionalScreenRouteParams = {
  userId?: number;
  email?: string;
  password?: string;
};


export default function ProfissionalScreen() {
  const { user, signIn } = useContext(AuthContext);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const route = useRoute<RouteProp<{ params: ProfissionalScreenRouteParams }, 'params'>>();
  const isRegistrationFlow = !!route.params?.userId; 
  const { userId = user?.id || "", email = user?.email || "", password = "" } = route.params || {};
  const userIdParam = (route.params as { userId?: number })?.userId;
  const navigation = useNavigation<any>();



  const [formData, setFormData] = useState<Omit<Profissional, "id">>({
    nome: "",
    cpf: "",
    matricula: "",
    celular: "",
    codigo: "",
    user_id: userId || "",
    status: true,
  });
  useEffect(() => {
    if (isRegistrationFlow) {
      console.log("Fluxo de registro: parâmetros presentes.");
    } else {
      console.log("Fluxo de login: usando dados do contexto.");
    }
  }, [isRegistrationFlow]);

  const fieldLabels: { [key: string]: string } = {
    nome: "Cargo",
    cpf: "CPF",
    matricula: "Matrícula",
    celular: "Celular",
    codigo: "Código",
  };

  async function fetchProfissionais() {
    setLoading(true);
    try {
      const response = await api.get("/profissional");
      setProfissionais(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      console.log('Enviando profissional:', formData);

      const response = await api.post("/profissional", formData);

      Alert.alert("Sucesso", "Profissional cadastrado com sucesso!");

      fetchProfissionais();
      resetForm();
    } catch (e: any) {
      console.error('Erro ao cadastrar profissional:', e?.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        name: user?.name || "Nome padrão",
        email: email,
      };

      console.log('Enviando profissional:', dataToSend);

      const response = await api.post("/profissional", dataToSend);

      Alert.alert("Sucesso", "Profissional cadastrado com sucesso!");

      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],  
      });
    } catch (e: any) {
      console.error('Erro ao cadastrar profissional:', e?.response?.data || e.message);
      Alert.alert("Erro", e?.response?.data?.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }
  

  async function handleEditItem() {
    if (!editingId) return;

    setLoading(true);
    try {
      console.log('Editando profissional:', formData);

      await api.post(`/profissional/${editingId}`, {
        ...formData,
        _method: 'PUT',
      });

      Alert.alert("Sucesso", "Profissional atualizado com sucesso!");


      resetForm();
      setEditing(false);
      setEditingId(null);
      fetchProfissionais();
    } catch (e: any) {
      console.error('Erro ao editar:', e?.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  }


  async function handleDeleteItem(id: number) {
    try {
      await api.delete(`/profissional/${id}`);
      setProfissionais(profissionais.filter(p => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function loadEditItem(id: number) {
    try {
      const response = await api.get(`/profissional/${id}`);
      const { nome, cpf, matricula, celular, codigo, user_id, status } = response.data;

      setFormData({ nome, cpf, matricula, celular, codigo, user_id, status });
      setEditing(true);
      setEditingId(id);
    } catch (e) {
      console.log(e);
    }
  }

  function resetForm() {
    setFormData({
      nome: "",
      cpf: "",
      matricula: "",
      celular: "",
      codigo: "",
      user_id: user?.id || "",
      status: true,
    });
  }

  useEffect(() => {
    fetchProfissionais();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{editing ? "Editar Profissional" : "Novo Profissional"}</Text>

        {Object.keys(fieldLabels).map((field) => (
          <TextInput
            key={field}
            placeholder={fieldLabels[field]}
            placeholderTextColor="#7C7C8A"
            style={styles.input}
            value={(formData as any)[field]}
            onChangeText={(text: string) =>
              setFormData((prev) => ({ ...prev, [field]: text }))
            }
          />
        ))}

        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
          <Checkbox
            value={formData.status === true}
            onValueChange={(newValue) => setFormData((prev) => ({ ...prev, status: newValue }))}
            color={formData.status ? "#34A853" : undefined}
          />
          <Text style={{ marginLeft: 10, color: "#000" }}>Ativo</Text>
        </View>
        {userIdParam ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Carregando..." : "Cadastrar Profissional"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={editing ? handleEditItem : handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Salvando..." : editing ? "Editar" : "Salvar"}
            </Text>
          </TouchableOpacity>
        )}


        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Lista de Profissionais</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
            <Text style={[styles.tableHeaderText, styles.matriculaColumn]}>User ID</Text>
            <Text style={[styles.tableHeaderText, styles.matriculaColumn]}>Cargo</Text>
            <Text style={[styles.tableHeaderText, styles.matriculaColumn]}>Matrícula</Text>
            <Text style={[styles.tableHeaderText, styles.actionColumn]}>Ações</Text>
          </View>

          <View style={styles.tableContent}>
            {loading ? (
              <Text style={styles.loadingText}>Carregando...</Text>
            ) : profissionais.length === 0 ? (
              <Text style={styles.emptyText}>Nenhum profissional cadastrado</Text>
            ) : (
              profissionais.map((profissional) => (
                <View key={profissional.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.idColumn]}>{profissional.id}</Text>
                  <Text style={[styles.tableCell, styles.matriculaColumn]}>{profissional.user?.name || 'Sem usuário'}</Text>
                  <Text style={[styles.tableCell, styles.matriculaColumn]}>{profissional.nome}</Text>
                  <Text style={[styles.tableCell, styles.matriculaColumn]}>{profissional.matricula}</Text>
                  <View style={[styles.actionColumn, styles.actionButtons]}>
                    <TouchableOpacity style={styles.editButton} onPress={() => loadEditItem(profissional.id)}>
                      <Icon name="edit" size={16} color="#999" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(profissional.id)}>
                      <Icon name="trash-2" size={16} color="#999" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          <TouchableOpacity style={styles.refreshButton} onPress={fetchProfissionais} disabled={loading}>
            <Text style={styles.refreshButtonText}>Atualizar Lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
