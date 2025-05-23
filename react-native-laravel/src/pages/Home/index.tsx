import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../contexts/AuthContext";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'react-native';


export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();

    const cards = [
        { title: "Motoristas", icon: "user", route: "Motorista" },
        { title: "Unidades", icon: "layers", route: "Unidade" },
        { title: "Veiculos", icon: "truck", route: "Veiculo" },
        { title: "Unidade Veiculos", icon: "grid", route: "UnidadeVeiculo" },
        { title: "Viagem", icon: "map", route: "Viagem" },
        { title: "Finalizar Viagem", icon: "check-circle", route: "FinalizarViagem" },
        { title: "Câmera", icon: "camera", route: "Camera" },
        { title: "Gerar Qrcode", icon: "", route: "GerarQrcode" },
        { title: "Read Qrcode", icon: "", route: "ReadQrcode" },
        // { title: "Relatórios", icon: "file-text", route: "Relatorio" },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <StatusBar backgroundColor="#333" barStyle="light-content" />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Bem-vindo ao Sistema</Text>

                        {user && (
                            <View style={styles.usuarioContainer}>
                                <Text style={styles.usuarioNome}>{user.name}</Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity onPress={signOut}>
                        <Icon name="log-out" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>



                <View style={styles.cardsContainer}>
                    {cards.map((card, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() => navigation.navigate(card.route as never)}
                        >
                            <Icon name={card.icon} size={32} color="#4F4F4F" />
                            <Text style={styles.cardTitle}>{card.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
