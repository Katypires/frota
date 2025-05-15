import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { TextInput } from 'react-native-paper';
import { styles } from "./styles";

export default function GerarQRCode() {
    const [viaturaInfo, setViaturaInfo] = useState({
        numero: "",
        placa: "",
        modelo: "",
        equipe: "",
        status: "",
    });

    const [qrData, setQrData] = useState("");

    const gerarQRCode = () => {
        if (Object.values(viaturaInfo).every((field) => field.trim() !== "")) {
            setQrData(JSON.stringify(viaturaInfo)); 
        } else {
            setQrData("");
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Gerar QR Code</Text>
                <View style={styles.fieldContainerSmall}>
                    <TextInput
                        label="Número"
                        placeholder="Número"
                        value={viaturaInfo.numero}
                        onChangeText={(text) => setViaturaInfo({ ...viaturaInfo, numero: text })}
                        keyboardType="number-pad"
                        mode="outlined"
                        dense
                    />

                    <TextInput
                        label="Placa"
                        placeholder="Placa"
                        value={viaturaInfo.placa}
                        onChangeText={(text) => setViaturaInfo({ ...viaturaInfo, placa: text })}
                        mode="outlined"
                        dense
                    />
                    <TextInput
                        label="Modelo"
                        placeholder="Modelo"
                        value={viaturaInfo.modelo}
                        onChangeText={(text) => setViaturaInfo({ ...viaturaInfo, modelo: text })}
                        mode="outlined"
                        dense
                    />
                    <TextInput
                        label="Equipe"
                        placeholder="Equipe"
                        value={viaturaInfo.equipe}
                        onChangeText={(text) => setViaturaInfo({ ...viaturaInfo, equipe: text })}
                        mode="outlined"
                        dense
                    />
                    <TextInput
                        label="Status"
                        placeholder="Status"
                        value={viaturaInfo.status}
                        onChangeText={(text) => setViaturaInfo({ ...viaturaInfo, status: text })}
                        mode="outlined"
                        dense
                    />

                    <TouchableOpacity style={styles.button} onPress={gerarQRCode}>
                        <Text style={styles.buttonText}>Gerar</Text>
                    </TouchableOpacity>

                    {
                        qrData ? (
                            <View style={styles.qrContainer}>
                                <Text style={styles.qrTitle}>QR Code Gerado:</Text>
                                <QRCode value={qrData} size={200} />
                            </View>
                        ) : (
                            <Text style={styles.message}>Preencha todos os campos para gerar o QR Code</Text>
                        )
                    }
                </View >
            </View >
        </ScrollView>
    );
}

