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
    },
    cameraView: {
        position: "relative",
        flex: 1,
        width: "100%",
        height: "100%",
    },
    takePicture: {
        position: "absolute",
        bottom: 15,
        left: "50%",
        transform: [{ translateY: -10 }, { translateX: -30 }],
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        padding: 20,
        borderRadius: 50,
    },
    changeCamera: {
        position: "absolute",
        bottom: 20,
        right: 20,
        color: "#fff",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        padding: 10,
        borderRadius: 50,
    },
    permissionContainer: {
        display: "flex",
        justifyContent: "center",
        gap: 20,
        padding: 40,
    },
    permissionText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
});
