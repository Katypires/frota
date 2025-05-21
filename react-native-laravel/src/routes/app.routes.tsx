import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Motorista from "../pages/Motorista";
import Unidade from "../pages/Unidade";
import Veiculo from "../pages/Veiculo";
import UnidadeVeiculo from "../pages/UnidadeVeiculo";
import Viagem from "../pages/Viagem";
import FinalizarViagem from "../pages/FinalizarViagem";
import Camera from "../pages/Camera";
import GerarQrcode from "../pages/GerarQrcode";
import ReadQrcode from "../pages/ReadQrcode";

const Stack = createNativeStackNavigator();

export type StackParamsList = {
    Menu: undefined;
};

function AppRoutes() {
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
                    title: "Motoristas",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
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
                }}
            />
            <Stack.Screen
                name="Viagem"
                component={Viagem}
                options={{
                    title: "Viagens",
                    headerStyle: {
                        backgroundColor: '#333',
                    },
                    headerTintColor: '#FFF',
                }}
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
                }}
            />
        </Stack.Navigator>
    );
}

export default AppRoutes;