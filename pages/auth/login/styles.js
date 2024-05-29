import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        backgroundColor: "#d1eaf6",  // Cor de fundo da caixa de login
        padding: 24,
        margin: 20,
        borderRadius: 12,
    },
    title: {
        fontSize: 32,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: "#0002",
    },
    notHaveAccountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    notHaveAccount: {
        fontSize: 16,
        color: "#000",
        textAlign: "center",
    },
});
