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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
    },
    middleRow: {
        flexDirection: 'row',
    },
    sideOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 250,
        width: 250,
    },
    scanArea: {
        height: 250,
        width: 250,
        borderColor: '#FFF',
        position: 'relative',
    },
    bottomOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
    },
    cornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#FFF',
        width: 30,
        height: 30,
    },
    cornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#FFF',
        width: 30,
        height: 30,
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#FFF',
        width: 30,
        height: 30,
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#FFF',
        width: 30,
        height: 30,
    },
    controls: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 15,
    },
    qrText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "auto",
        marginTop: 5,
        margin: 1,
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
    textMensagem: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 2,
        color: "#000",
    },
    informacao: {
        marginTop: 20,
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    errorText: {
        color: '#721c24',
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#f8d7da',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row', justifyContent: 'flex-start', gap: 10 
        
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
       
         
    },
    refreshButton: {
        marginTop: 16,
        backgroundColor: "#6979F8",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    refreshButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    

});