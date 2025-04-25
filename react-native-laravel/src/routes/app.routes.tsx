import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../pages/Menu";
import Motorista from "../pages/Motorista";

const Stack = createNativeStackNavigator();

export type StackParamsList = {
    Menu: undefined;
};

function AppRoutes() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen
                name="Menu"
                component={Menu}
                options={{ headerShown: false }}
            /> */}
            <Stack.Screen
                name="Motorista"
                component={Motorista}
                options={{ title: "Motoristas" }}
            />
        </Stack.Navigator>
    );
}

export default AppRoutes;