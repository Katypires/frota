import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#000",  
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",  
        fontSize: 18,
        fontWeight: "bold",
    },
    qrContainer: {
        marginTop: 20,
        alignItems: "center",
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
});
