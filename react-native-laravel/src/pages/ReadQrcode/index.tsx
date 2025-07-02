import { Link } from "expo-router";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { api } from "../../services/api";
import { ActivityIndicator } from "react-native";



type CameraFacing = "front" | "back";
type CameraFlash = "on" | "off" | "auto";

export default function Camera() {
    const [cameraReady, setCameraReady] = useState(false);
    const [cameraFlash, setCameraFlash] = useState<CameraFlash>('off');

    const [qrResult, setQrResult] = useState<any | null>(null);
    const zoomLevels = [0, 0.25, 0.5, 0.75, 1];
    const [zoomIndex, setZoomIndex] = useState(0);
    const [photoFile, setPhotoFile] = useState<string | null>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [qrError, setQrError] = useState<string | null>(null);
    const navigation = useNavigation();
    const [scanned, setScanned] = useState(false);
    const [isLoading, setIsLoading] = useState(false);




    const cameraRef = useRef<CameraView>(null);

    <Camera />
    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View>
                <Text style={styles.textMensagem}>Você precisa da permissão para exibir a câmera</Text>
                <Pressable style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Solicitar permissão</Text>
                </Pressable>
            </View>
        );
    }

    const handleCameraFlash = () => {
        switch (cameraFlash) {
            case 'off':
                setCameraFlash('on');
                break;
            case 'on':
                setCameraFlash('auto');
                break;
            case 'auto':
                setCameraFlash('off');
                break;
        }
    }
    const handleBarCode = async (result: BarcodeScanningResult) => {
        //console.log("Dados do QR Code:", result.data);
        if (scanned) return;
        setScanned(true);

        try {
            const json = JSON.parse(result.data);

            if (!json.id) {
                setQrResult(null);
                setQrError("QR Code inválido: sem identificador de veículo.");
                return;
            }

            setIsLoading(true);
            const response = await api.get(`/veiculo/${json.id}`);
            //console.log("Resposta da API:", response.data);

            setQrResult(response.data);
            setQrError(null);
        } catch (error: any) {
            setQrResult(null);
            if (error.response?.status === 404) {
                setQrError("Veículo não encontrado no sistema.");
            } else {
                setQrError("Erro ao ler QR Code ou buscar veículo.");
                console.warn("Erro abordagem QR:", error);
            }
        } finally {
            setIsLoading(false);
        }
    }





    const handleZoom = () => {
        const nextIndex = (zoomIndex + 1) % zoomLevels.length;
        setZoomIndex(nextIndex);
    };

    const hadleCameraReady = () => {
        setCameraReady(true);
    };
    const handleTakePicture = async () => {
        if (cameraReady && cameraRef.current) {
            const options = {
                quality: 0.7,
                base64: true
            };
            const photo = await cameraRef.current.takePictureAsync(options);
            if (photo) {
                setPhotoFile(photo.uri)
            }
        }
    };




    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.cameraView}
                flash={cameraFlash}
                zoom={zoomLevels[zoomIndex]}
                onBarcodeScanned={handleBarCode}
                onCameraReady={hadleCameraReady}
            >

                <View style={styles.overlay}>
                    <View style={styles.topOverlay} />
                    <View style={styles.middleRow}>
                        <View style={styles.sideOverlay} />
                        <View style={styles.scanArea}>
                            <View style={styles.cornerTopLeft} />
                            <View style={styles.cornerTopRight} />
                            <View style={styles.cornerBottomLeft} />
                            <View style={styles.cornerBottomRight} />
                        </View>
                        <View style={styles.sideOverlay} />
                    </View>
                    <View style={styles.bottomOverlay} />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, { marginLeft: 'auto' }]} onPress={handleZoom}>
                        <Feather name="zoom-in" size={20} color="#FFF" />
                    </Pressable>

                    <Pressable style={[styles.button, { marginLeft: 'auto' }]} onPress={handleCameraFlash}>
                        <Feather name={cameraFlash === 'off' ? 'zap-off' : 'zap'} size={20} color="#FFF" />
                    </Pressable>
                </View>
            </CameraView>

            <Text style={styles.textMensagem}>Aponte a câmera para o QR Code</Text>
            {isLoading && (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 16 }} />
            )}

            {photoFile &&
                <Image source={{ uri: photoFile }} style={styles.photo} />
            }
            {qrResult && (
                <View style={styles.informacao}>
                    <Text style={styles.qrText}>Informações do veículo:</Text>
                    <Text style={styles.qrText}>Nome: {qrResult.nome}</Text>
                    <Text style={styles.qrText}>Placa: {qrResult.placa}</Text>
                    <Text style={styles.qrText}>Marca: {qrResult.marca}</Text>
                    <Text style={styles.qrText}>Modelo: {qrResult.modelo}</Text>
                    <Text style={styles.qrText}>Status: {qrResult.status}</Text>
                    {qrError && (
                        <View style={{ marginTop: 12, padding: 8, backgroundColor: '#fee', borderRadius: 4 }}>
                            <Text style={{ color: 'red', textAlign: 'center' }}>{qrError}</Text>
                        </View>
                    )}

                    {qrResult && !qrError && (
                        <TouchableOpacity
                            style={styles.refreshButton}
                            onPress={() => navigation.navigate('Viagem', { veiculo: qrResult })}
                        >
                            <Text style={styles.refreshButtonText}>Ir para Viagem</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.refreshButton}
                        onPress={() => {
                            setQrResult(null);
                            setQrError(null);
                            setScanned(false);
                        }}
                    >
                        <Text style={styles.refreshButtonText}>Escanear outro QR Code</Text>
                    </TouchableOpacity>

                </View>
            )}
            {qrError && (
                <View>
                    <Text style={styles.errorText}>{qrError}</Text>
                </View>
            )}

        </View>
    );
}

