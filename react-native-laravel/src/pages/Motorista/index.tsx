import React, { useContext, useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";


interface Motorista {
    id: string | number;
    nome: string;
    cpf: string;
    matricula: string;
    status: string;
}

interface FormData {
    nome: string;
    cpf: string;
    matricula: string;
    status: string;
}

export default function Motorista() {
    const { signOut } = useContext(AuthContext);
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | number | null>(null);

    const [formData, setFormData] = useState<FormData>({
        nome: "",
        cpf: "",
        matricula: "",
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
        if (!formData.nome || !formData.cpf || !formData.matricula || !formData.status) return;

        setLoading(true);
        try {
            const response = await api.post("/motorista", formData);
            setFormData({ nome: "", cpf: "", matricula: "", status: "" });
            fetchMotoristas();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleEditItem() {
        if (!editingId) return;

        setLoading(true);
        try {
            await api.put(`/motorista/${editingId}`, formData);
            setFormData({ nome: "", cpf: "", matricula: "", status: "" });
            setEditing(false);
            setEditingId(null);
            fetchMotoristas();
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
        } catch (e) {
            console.log(e);
        }
    }

    async function loadEditItem(id: string | number) {
        try {
            const response = await api.get(`/motorista/${id}`);
            const data = response.data;

            setFormData({
                nome: data.nome,
                cpf: data.cpf,
                matricula: data.matricula,
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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Gerenciamento de Motoristas</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>SAIR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{editing ? "Editar Motorista" : "Adicionar Motorista"}</Text>

                {["nome", "cpf", "matricula", "status"].map((field) => (
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
                    {/* <Text style={[styles.tableHeaderText, styles.cpfColumn]}>CPF</Text> */}
                    <Text style={[styles.tableHeaderText, styles.matriculaColumn]}>Matrícula</Text>
                    {/* <Text style={[styles.tableHeaderText, styles.statusColumn]}>Status</Text> */}
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
                                <Text style={[styles.tableCell, styles.nameColumn]}>{motorista.nome}</Text>
                                {/* <Text style={[styles.tableCell, styles.cpfColumn]}>{motorista.cpf}</Text> */}
                                <Text style={[styles.tableCell, styles.matriculaColumn]}>{motorista.matricula}</Text>
                                {/* <Text style={[styles.tableCell, styles.statusColumn]}>{motorista.status}</Text> */}
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
