import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f5",
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
    
    header: {
        backgroundColor: '#333',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      
      headerText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
      },
      
      usuarioContainer: {
        marginTop: 4,
      },
      
      usuarioNome: {
        color: '#FFF',
        fontSize: 14,
      },

});
