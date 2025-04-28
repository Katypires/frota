import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f5",
    },
    header: {
        padding: 20,
        backgroundColor: "#333",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#ff5c5c",
        padding: 10,
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        width: "40%",
        height: 120,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        elevation: 3,
    },
    cardTitle: {
        marginTop: 10,
        fontSize: 16,
        color: "#333",
    },
});
