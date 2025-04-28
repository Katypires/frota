import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../contexts/AuthContext";
import { styles } from "./styles"; // você vai criar um styles separado para o Home

export default function Home() {
    const { signOut } = useContext(AuthContext);
    const navigation = useNavigation();

    const cards = [
        { title: "Motoristas", icon: "user", route: "Motorista" },
        { title: "Unidades", icon: "layers", route: "Unidade" },
        { title: "Veiculos", icon: "truck", route: "Veiculo" },
        { title: "Unidade Veiculos", icon: "truck", route: "UnidadeVeiculo" },
        // { title: "Relatórios", icon: "file-text", route: "Relatorio" },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem-vindo ao Sistema</Text>
              
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
    );
}
