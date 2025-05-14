import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraView: {
        height: 400,
        justifyContent: "flex-end",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 32,
    },
    button: {
        padding: 16,
        borderRadius: 8,
        alignSelf: "center",
        alignItems: "center",
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
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
        alignSelf: "baseline",
    },

    takePhoto: {
        width: 80,
        height: 80,
        backgroundColor: "#333",
        borderRadius: 50,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        borderWidth: 2,
        position: 'absolute',
        bottom: 10,

    },
   
});