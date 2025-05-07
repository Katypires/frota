import React, { useContext, useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";


interface Unidade {
    id: string | number;
    nome: string;
    status: string;
}

interface FormData {
    nome: string;
    status: string;
}

export default function Unidade() {
    const { signOut } = useContext(AuthContext);
    const [unidades, setUnidades] = useState<Unidade[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | number | null>(null);

    const [formData, setFormData] = useState<FormData>({
        nome: "",
        status: "",
    });

    async function fetchUnidades() {
        setLoading(true);
        try {
            const response = await api.get("/unidade");
            setUnidades(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if (!formData.nome || !formData.status) return;

        setLoading(true);
        try {
            const response = await api.post("/unidade", formData);
            setFormData({ nome: "", status: "" });
            fetchUnidades();
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
            await api.put(`/unidade/${editingId}`, formData);
            setFormData({ nome: "", status: "" });
            setEditing(false);
            setEditingId(null);
            fetchUnidades();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteItem(id: string | number) {
        try {
            await api.delete(`/unidade/${id}`);
            setUnidades(unidades.filter((m) => m.id !== id));
        } catch (e) {
            console.log(e);
        }
    }

    async function loadEditItem(id: string | number) {
        try {
            const response = await api.get(`/unidade/${id}`);
            const data = response.data;

            setFormData({
                nome: data.nome,
                status: data.status,
            });

            setEditing(true);
            setEditingId(id);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUnidades();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Gerenciamento de Unidades</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>SAIR</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{editing ? "Editar Unidade" : "Adicionar Unidade"}</Text>

                {["nome", "status"].map((field) => (
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
                        < TextInput
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
                <Text style={styles.tableTitle}>Lista de Unidades</Text>

                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Nome</Text>
                    <Text style={[styles.tableHeaderText, styles.actionColumn]}>Ações</Text>
                </View>

                <ScrollView style={styles.tableContent}>
                    {loading ? (
                        <Text style={styles.loadingText}>Carregando...</Text>
                    ) : unidades.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum unidade cadastrado</Text>
                    ) : (
                        unidades.map((unidade) => (
                            <View key={String(unidade.id)} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.idColumn]}>{unidade.id}</Text>
                                <Text style={[styles.tableCell, styles.nameColumn]}>{unidade.nome}</Text>
                                <View style={[styles.actionColumn, styles.actionButtons]}>
                                    <TouchableOpacity style={styles.editButton} onPress={() => loadEditItem(unidade.id)}>
                                        <Icon name="edit" size={16} color="#999" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(unidade.id)}>
                                        <Icon name="trash-2" size={16} color="#999" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>

                <TouchableOpacity style={styles.refreshButton} onPress={fetchUnidades} disabled={loading}>
                    <Text style={styles.refreshButtonText}>Atualizar Lista</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
