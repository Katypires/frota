import React, { useContext, useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";


interface Veiculo {
    id: string | number;
    nome: string;
    marca: string;
    placa: string;
    status: string;
}

interface FormData {
    nome: string;
    marca: string;
    placa: string;
    status: string;
}

export default function Veiculo() {
    const { signOut } = useContext(AuthContext);
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | number | null>(null);

    const [formData, setFormData] = useState<FormData>({
        nome: "",
        marca: "",
        placa: "",
        status: "",
    });

    async function fetchVeiculos() {
        setLoading(true);
        try {
            const response = await api.get("/veiculo");
            setVeiculos(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if (!formData.nome || !formData.marca || !formData.placa || !formData.status) return;

        setLoading(true);
        try {
            const response = await api.post("/veiculo", formData);
            setFormData({ nome: "", marca: "", placa: "", status: "" });
            fetchVeiculos();
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
            await api.put(`/veiculo/${editingId}`, formData);
            setFormData({ nome: "", marca: "", placa: "", status: "" });
            setEditing(false);
            setEditingId(null);
            fetchVeiculos();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteItem(id: string | number) {
        try {
            await api.delete(`/veiculo/${id}`);
            setVeiculos(veiculos.filter((m) => m.id !== id));
        } catch (e) {
            console.log(e);
        }
    }

    async function loadEditItem(id: string | number) {
        try {
            const response = await api.get(`/veiculo/${id}`);
            const data = response.data;

            setFormData({
                nome: data.nome,
                marca: data.marca,
                placa: data.placa,
                status: data.status,
            });

            setEditing(true);
            setEditingId(id);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchVeiculos();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Gerenciamento de Veiculos</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>SAIR</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{editing ? "Editar Veiculo" : "Adicionar Veiculo"}</Text>

                {["nome", "marca", "placa", "status"].map((field) => (
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
                <Text style={styles.tableTitle}>Lista de Veiculos</Text>

                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Nome</Text>
                    <Text style={[styles.tableHeaderText, styles.placaColumn]}>Matrícula</Text>
                    <Text style={[styles.tableHeaderText, styles.actionColumn]}>Ações</Text>
                </View>

                <ScrollView style={styles.tableContent}>
                    {loading ? (
                        <Text style={styles.loadingText}>Carregando...</Text>
                    ) : veiculos.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum veiculo cadastrado</Text>
                    ) : (
                        veiculos.map((veiculo) => (
                            <View key={String(veiculo.id)} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.idColumn]}>{veiculo.id}</Text>
                                <Text style={[styles.tableCell, styles.nameColumn]}>{veiculo.nome}</Text>
                                <Text style={[styles.tableCell, styles.placaColumn]}>{veiculo.placa}</Text>
                                <View style={[styles.actionColumn, styles.actionButtons]}>
                                    <TouchableOpacity style={styles.editButton} onPress={() => loadEditItem(veiculo.id)}>
                                        <Icon name="edit" size={16} color="#999" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(veiculo.id)}>
                                        <Icon name="trash-2" size={16} color="#999" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>

                <TouchableOpacity style={styles.refreshButton} onPress={fetchVeiculos} disabled={loading}>
                    <Text style={styles.refreshButtonText}>Atualizar Lista</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
