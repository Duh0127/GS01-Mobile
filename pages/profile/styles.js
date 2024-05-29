import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1B2445",
        flex: 1,
    },
    imgFundo: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        paddingTop: 50,
    },
    profileBox: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        width: "90%",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
    },
    imgPerfil: {
        width: 130,
        height: 130,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#000",
    },
    name: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    animalsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        width: "90%",
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
    },
    animalTitle: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    animalsFoundContainer: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    modalContent: {
        width: 300,
        backgroundColor: "#D0E9F5",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
    },
    modalImg: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: "cover",
    },
    mainName: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    scientificName: {
        fontSize: 16,
        textAlign: "center",
        fontStyle: "italic",
    },
    animalInfo: {
        marginTop: 20,
        width: "100%",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
    },
    firstRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    lastRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailBox: {
        width: "49%",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#0001",
        borderRadius: 6,
        padding: 4,
    },
    boxTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    boxValue: {
        fontSize: 15,
    },
    modalDescription: {
        marginTop: 8,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        width: "100%",
    },
    descriptionText: {
        fontSize: 14,
        textAlign: "justify",
    }
});
