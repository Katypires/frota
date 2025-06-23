import React, { useContext, useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";


interface Motorista {
    id: string | number;
    profissional_id: string | number;
    cnh: string;
    validade: string;
    categoria: string;
    user_id: string | number;
    status: string;
}

interface FormData {
    profissional_id: string | number;
    cnh: string;
    validade: string;
    categoria: string;
    user_id: string | number;
    status: string;
}

export default function Motorista() {
    const { signOut } = useContext(AuthContext);
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | number | null>(null);

    const [formData, setFormData] = useState<FormData>({
        profissional_id: "",
        cnh: "",
        validade: "",
        categoria: "",
        user_id: "",
        status: "",
    });

    async function fetchMotoristas() {
        setLoading(true);
        try {
            const response = await api.get("/motorista");
            setMotoristas(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if (!formData.profissional_id || !formData.user_id || formData.status === "") {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }
    
        const formattedData = {
            ...formData,
            categoria: formData.categoria ? formData.categoria.split(',') : [], 
            status: formData.status === 'Ativo' ? true : false, 
        };
    
        setLoading(true);
        try {
            const response = await api.post("/motorista", formattedData);
            setFormData({ profissional_id: "", cnh: "", validade: "", categoria: "", user_id: "", status: "" });
            fetchMotoristas();
    
            Alert.alert("Sucesso", "Motorista cadastrado com sucesso!");
        } catch (e) {
            console.error('Erro ao cadastrar motorista:', e?.response?.data || e.message);
            Alert.alert("Erro", "Ocorreu um erro ao cadastrar o motorista. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    async function handleEditItem() {
        if (!editingId) return;

        setLoading(true);
        try {
            await api.put(`/motorista/${editingId}`, formData);
            setFormData({ profissional_id: "", cnh: "", validade: "", categoria: "", user_id: "", status: "" });
            setEditing(false);
            setEditingId(null);
            fetchMotoristas();

            Alert.alert("Sucesso", "Motorista atualizado com sucesso!");

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteItem(id: string | number) {
        try {
            await api.delete(`/motorista/${id}`);
            setMotoristas(motoristas.filter((m) => m.id !== id));
            Alert.alert("Sucesso", "Motorista excluído com sucesso!");
        } catch (e) {
            console.log(e);
        }
    }

    async function loadEditItem(id: string | number) {
        try {
            const response = await api.get(`/motorista/${id}`);
            const data = response.data;

            setFormData({
                profissional_id: data.profissional_id,
                cnh: data.cnh,
                validade: data.validade,
                categoria: data.categoria,
                user_id: data.user_id,
                status: data.status,
            });

            setEditing(true);
            setEditingId(id);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchMotoristas();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Gerenciamento de Motoristas</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>SAIR</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{editing ? "Editar Motorista" : "Adicionar Motorista"}</Text>

                {["profissional_id", "cnh", "validade", "categoria", "user_id", "status"].map((field) => (
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
                        <TextInput
                            key={field}
                            placeholder={`Digite o ${field}`}
                            placeholderTextColor="#7C7C8A"
                            style={styles.input}
                            value={(formData as any)[field]}
                            onChangeText={(text: string) =>
                                setFormData((prev) => ({ ...prev, [field]: text }))
                            }
                        />
                    )
                ))}

                <TouchableOpacity
                    style={styles.button}
                    onPress={editing ? handleEditItem : handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? "Carregando..." : editing ? "Editar" : "Salvar"}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Lista de Motoristas</Text>

                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Nome</Text>
                    <Text style={[styles.tableHeaderText, styles.matriculaColumn]}>Matrícula</Text>
                    <Text style={[styles.tableHeaderText, styles.actionColumn]}>Ações</Text>
                </View>

                <ScrollView style={styles.tableContent}>
                    {loading ? (
                        <Text style={styles.loadingText}>Carregando...</Text>
                    ) : motoristas.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum motorista cadastrado</Text>
                    ) : (
                        motoristas.map((motorista) => (
                            <View key={String(motorista.id)} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.idColumn]}>{motorista.id}</Text>
                                <Text style={[styles.tableCell, styles.nameColumn]}>{motorista.profissional_id}</Text>
                                <Text style={[styles.tableCell, styles.matriculaColumn]}>{motorista.validade}</Text>
                                <View style={[styles.actionColumn, styles.actionButtons]}>
                                    <TouchableOpacity style={styles.editButton} onPress={() => loadEditItem(motorista.id)}>
                                        <Icon name="edit" size={16} color="#999" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(motorista.id)}>
                                        <Icon name="trash-2" size={16} color="#999" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>

                <TouchableOpacity style={styles.refreshButton} onPress={fetchMotoristas} disabled={loading}>
                    <Text style={styles.refreshButtonText}>Atualizar Lista</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
