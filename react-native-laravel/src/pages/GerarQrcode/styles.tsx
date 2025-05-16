import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   
    formContainer: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    text: {
        padding: 1,
        marginBottom: 1,
    },
    button: {
        padding: 10,
        marginBottom: 10,
        height: 45,
        backgroundColor: "#333",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
    qrContainer: {
        marginTop: 20,
        alignItems: "center",
        padding: 10,
    },
    qrTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    message: {
        marginTop: 20,
        fontSize: 16,
        color: "#777",
    },
    fieldContainerSmall: {
        width: "100%",
        padding: 10,
        marginBottom: 10,

    },
    select: {
        height: 48,
        backgroundColor: "#F5F5F5",
        marginBottom: 14,
        borderRadius: 8,
        paddingHorizontal: 12,
        color: "#333",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    loadingText: {
        textAlign: "center",
        padding: 20,
        color: "#999",
    },
    ContainerQr: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 100,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: "center",
    },
});
