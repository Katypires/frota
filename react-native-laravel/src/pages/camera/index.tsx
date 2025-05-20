import { Link } from "expo-router";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import { styles } from "./styles";

type CameraFacing = "front" | "back";
type CameraFlash = "on" | "off" | "auto";

export default function Camera() {
    const [cameraReady, setCameraReady] = useState(false);
    const [cameraFlash, setCameraFlash] = useState<CameraFlash>('off');
    const [cameraFacing, setCameraFacing] = useState<CameraFacing>('back');
    const [qrResult, setQrResult] = useState<any | null>(null);
    const zoomLevels = [0, 0.25, 0.5, 0.75, 1];
    const [zoomIndex, setZoomIndex] = useState(0);
    const [photoFile, setPhotoFile] = useState<string | null>(null);
    const [permission, requestPermission] = useCameraPermissions();

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

    const handleCameraFacing = () => {
        if (cameraFacing === 'front') {
            setCameraFacing('back');
        } else {
            setCameraFacing('front');
        }
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
    const handleBarCode = (result: BarcodeScanningResult) => {
        try {
            const json = JSON.parse(result.data);
            setQrResult(json);
        } catch (error) {
            console.warn("QR Code inválido:", error);
            setQrResult(null);
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
                facing={cameraFacing}
                flash={cameraFlash}
                zoom={zoomLevels[zoomIndex]}
                onBarcodeScanned={handleBarCode}
                onCameraReady={hadleCameraReady}
            >
                <View>
                    <Pressable style={[styles.button, { marginLeft: 'auto' }]} onPress={handleZoom}>
                        <Feather name="zoom-in" size={20} color="#fff" />
                    </Pressable>

                    <Pressable style={[styles.button, { marginLeft: 'auto' }]} onPress={handleCameraFlash}>
                        <Feather name={cameraFlash === 'off' ? 'zap-off' : 'zap'} size={20} color="#fff" />
                    </Pressable>

                    <Pressable style={[styles.button, { marginLeft: 'auto' }]} onPress={handleCameraFacing}>
                        <Feather name="refresh-cw" size={20} color="#fff" />
                    </Pressable>

                    <Pressable style={styles.takePhoto} onPress={handleTakePicture}>
                        <Feather name="camera" size={25} color="#fff" />
                    </Pressable>
                </View>

            </CameraView>

            <View style={styles.buttonContainer}>


            </View>

            {photoFile &&
                <Image source={{ uri: photoFile }} style={styles.photo} />
            }
            {qrResult && (
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.qrText}>Informações da viatura:</Text>
                    <Text style={styles.qrText}>Nome: {qrResult.nome}</Text>
                    <Text style={styles.qrText}>Placa: {qrResult.placa}</Text>
                    <Text style={styles.qrText}>Marca: {qrResult.marca}</Text>
                    <Text style={styles.qrText}>Modelo: {qrResult.modelo}</Text>
                    <Text style={styles.qrText}>Status: {qrResult.status}</Text>
                </View>
            )}
        </View>
    );
}

