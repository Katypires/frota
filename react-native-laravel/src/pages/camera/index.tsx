import { useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function Camera() {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.textMensagem}>Você precisa dar permissão para exibir a câmera.</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Permitir</Text>
                </ TouchableOpacity>
            </View >
        );
    }

    return (
        <View style={styles.container}>
            <Text>Permissão concedida!</Text>
        </View>
    );
}