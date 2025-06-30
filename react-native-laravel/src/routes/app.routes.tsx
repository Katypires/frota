import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Motorista from "../pages/Motorista";
import Profissional from "../pages/Profissional";
import Unidade from "../pages/Unidade";
import Veiculo from "../pages/Veiculo";
import UnidadeVeiculo from "../pages/UnidadeVeiculo";
import Viagem from "../pages/Viagem";
import FinalizarViagem from "../pages/FinalizarViagem";
import Camera from "../pages/Camera";
import GerarQrcode from "../pages/GerarQrcode";
import ReadQrcode from "../pages/ReadQrcode";
import { Text, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export type StackParamsList = {
    Menu: undefined;
};

function AppRoutes() {
    const { user } = useContext(AuthContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Motorista"
                component={Motorista}
                options={{
                    title: "Motorista",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="Profissional"
                component={Profissional}
                options={{
                    title: "Profissional",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="Unidade"
                component={Unidade}
                options={{
                    title: "Unidades",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="Veiculo"
                component={Veiculo}
                options={{
                    title: "Veiculos",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="UnidadeVeiculo"
                component={UnidadeVeiculo}
                options={{
                    title: "Unidade Veiculos",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="Viagem"
                component={Viagem}
                options={({ route }) => ({
                    title: "Viagens",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                })}
            />
            <Stack.Screen
                name="FinalizarViagem"
                component={FinalizarViagem}
                options={{
                    title: "Finalizar Viagem",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="Camera"
                component={Camera}
                options={{
                    title: "Câmera",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="GerarQrcode"
                component={GerarQrcode}
                options={{
                    title: "Gerar Qrcode",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
            <Stack.Screen
                name="ReadQrcode"
                component={ReadQrcode}
                options={{
                    title: "Ler Qrcode",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                    headerRight: () => (
                        user ? (
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{user.name}</Text>
                            </View>
                        ) : null
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default AppRoutes;