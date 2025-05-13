import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        height: 400,

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 32,
    },
    button: {
        backgroundColor: "#000",
        padding: 16,
        width: 200,
        margin: 10,
        borderRadius: 8,
        alignSelf: "center",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    textMensagem: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 32,
        color: "#000",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    qrText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "auto",
        marginTop: 10,
        margin: 10,
    },
    photo: {
        width: 150,
        height: 150
    },
});