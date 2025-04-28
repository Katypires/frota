import React, { useContext, useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";

interface UnidadeVeiculo {
    id: string | number;
    unidade_id: string;
    veiculo_id: string;
    status: string;
    unidade?: {
        id: string | number;
        nome: string;
    };
    veiculo?: {
        id: string | number;
        placa: string;
    };
}

interface FormData {
    unidade_id: string;
    veiculo_id: string;
    status: string;
}

export default function UnidadeVeiculoScreen() {
    const { signOut } = useContext(AuthContext);
    const [unidadeVeiculos, setUnidadeVeiculos] = useState<UnidadeVeiculo[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | number | null>(null);

    const [formData, setFormData] = useState<FormData>({
        unidade_id: "",
        veiculo_id: "",
        status: "",
    });

    async function fetchUnidadeVeiculos() {
        setLoading(true);
        try {
            const response = await api.get("/unidade_veiculo");
            setUnidadeVeiculos(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if (!formData.unidade_id || !formData.veiculo_id) return;

        setLoading(true);
        try {
            await api.post("/unidade_veiculo", formData);
            setFormData({ unidade_id: "", veiculo_id: "", status: "" });
            fetchUnidadeVeiculos();
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
            await api.put(`/unidade_veiculo/${editingId}`, formData);
            setFormData({ unidade_id: "", veiculo_id: "", status: "" });
            setEditing(false);
            setEditingId(null);
            fetchUnidadeVeiculos();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteItem(id: string | number) {
        try {
            await api.delete(`/unidade_veiculo/${id}`);
            setUnidadeVeiculos(unidadeVeiculos.filter((m) => m.id !== id));
        } catch (e) {
            console.log(e);
        }
    }

    async function loadEditItem(id: string | number) {
        try {
            const response = await api.get(`/unidade_veiculo/${id}`);
            const data = response.data;

            setFormData({
                unidade_id: data.unidade_id,
                veiculo_id: data.veiculo_id,
                status: data.status,
            });

            setEditing(true);
            setEditingId(id);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUnidadeVeiculos();
        fetchUnidades();
        fetchVeiculos();
    }, []);

    async function fetchUnidades() {
        try {
            const response = await api.get("/unidade");
            setUnidades(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchVeiculos() {
        try {
            const response = await api.get("/veiculo");
            setVeiculos(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const [unidades, setUnidades] = useState<any[]>([]);
    const [veiculos, setVeiculos] = useState<any[]>([]);


    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{editing ? "Editar Unidade Veiculo" : "Adicionar Unidade Veiculo"}</Text>

                {["unidade", "veiculo", "status"].map((field) => (
                    field === "status" ? (
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
                    ) : (
                        <Picker
                            key={field}
                            selectedValue={(formData as any)[field]}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, [field]: value }))
                            }
                            style={styles.input}
                        >
                            <Picker.Item label={`Selecione o ${field}`} value="" />
                            {(field === "unidade" ? unidades : veiculos).map((item) => (
                                <Picker.Item
                                    key={item.id}
                                    label={field === "unidade" ? item.nome : item.placa}
                                    value={item.id}
                                />
                            ))}
                        </Picker>
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
                <Text style={styles.tableTitle}>Lista de Unidade Veiculos</Text>

                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Unidade</Text>
                    <Text style={[styles.tableHeaderText, styles.placaColumn]}>Veículo</Text>
                    <Text style={[styles.tableHeaderText, styles.actionColumn]}>Ações</Text>
                </View>

                <ScrollView style={styles.tableContent}>
                    {loading ? (
                        <Text style={styles.loadingText}>Carregando...</Text>
                    ) : unidadeVeiculos.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum registro</Text>
                    ) : (
                        unidadeVeiculos.map((item) => (
                            <View key={String(item.id)} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.idColumn]}>
                                    {item.id}</Text>
                                <Text style={[styles.tableCell, styles.nameColumn]}>
                                    {item.unidade ? item.unidade.nome : 'Sem unidade'}
                                </Text>
                                <Text style={[styles.tableCell, styles.placaColumn]}>
                                    {item.veiculo ? item.veiculo.placa : 'Sem veículo'}
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
                </ScrollView>

                <TouchableOpacity style={styles.refreshButton} onPress={fetchUnidadeVeiculos} disabled={loading}>
                    <Text style={styles.refreshButtonText}>Atualizar Lista</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
