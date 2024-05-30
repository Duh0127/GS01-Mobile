import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ToastAndroid, Modal, Button, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import fundo from '../../assets/fundo_deteccao.jpg';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Feather } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';
import { styles } from './styles';

export default function Detection() {
    const camRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [facing, setFacing] = useState('back');
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        if (camRef.current) {
            const data = await camRef.current.takePictureAsync();
            console.log(data);
            setCapturedPhoto(data.uri);
            setIsModalOpen(true);
            ToastAndroid.show("Foto tirada com sucesso!", ToastAndroid.SHORT);
        }
    }

    const savePicture = async () => {
        if (capturedPhoto) {
            try {
                await MediaLibrary.createAssetAsync(capturedPhoto);
                ToastAndroid.show("Foto salva com sucesso!", ToastAndroid.SHORT);
                setIsModalOpen(false);
            } catch (error) {
                ToastAndroid.show("Erro ao salvar a foto!", ToastAndroid.SHORT);
                console.log(error);
            }
        }
    }

    if (!cameraPermission || !mediaLibraryPermission) {
        return <View />;
    }

    if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ backgroundColor: "#1B2445", flex: 1 }}>
                    <View style={styles.permissionContainer}>
                        <Text style={styles.permissionText}>Nós precisamos da permissão para habilitar a câmera e salvar fotos na galeria!</Text>
                        <Button
                            onPress={() => {
                                requestCameraPermission();
                                requestMediaLibraryPermission();
                            }}
                            title="Conceder permissões"
                        />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ImageBackground source={fundo} style={styles.imgFundo}>
                    <CameraView
                        style={styles.cameraView}
                        facing={facing}
                        ref={camRef}
                    >
                        <TouchableOpacity style={styles.takePicture} onPress={takePicture}>
                            <Feather name="camera" size={48} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.changeCamera} onPress={toggleCameraFacing}>
                            <Feather name="refresh-cw" size={24} color="#fff" />
                            <Text style={{ color: "#fff" }}>Câmera</Text>
                        </TouchableOpacity>
                    </CameraView>
                </ImageBackground>
                {capturedPhoto && (
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={isModalOpen}
                    >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: capturedPhoto }} style={{ width: "100%", height: "100%" }} />
                            <TouchableOpacity onPress={() => setIsModalOpen(false)} style={{ position: "absolute", top: 20, right: 20, backgroundColor: "#0004", borderRadius: 50 }}>
                                <Feather name="x" size={32} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={savePicture} style={{ position: "absolute", bottom: 50, left: "50%", transform: [{ translateX: -20 }], backgroundColor: "#0008", padding: 10, borderRadius: 10 }}>
                                <Feather name="download" size={40} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}