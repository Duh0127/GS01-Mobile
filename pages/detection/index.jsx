import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ToastAndroid, Modal, Button, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import fundo from '../../assets/fundo_deteccao.jpg';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Feather } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';
import { styles } from './styles';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Detection() {
    const camRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [facing, setFacing] = useState('back');
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
    const [image, setImage] = useState(null);
    const [allImg, setAllImg] = useState(null);
    const [result, setResult] = useState(null);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        if (camRef.current) {
            const data = await camRef.current.takePictureAsync();
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

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissões para acessar a galeria!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.5,
        });

        if (!result.canceled) {
            console.log(result);
            setAllImg(result.assets[0]);
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            alert('Selecione uma imagem antes de enviar!');
            return;
        }

        let formData = new FormData();
        formData.append('file', {
            uri: allImg.uri,
            name: allImg.fileName,
            type: allImg.mimeType,
        });

        try {
            const response = await axios.post('https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Resposta:', response.data);

            setResult(response.data);
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
        }
    };



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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Selecionar Imagem" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <Button title="Enviar Imagem" onPress={uploadImage} />
                    {result && <Text>Resultado: {JSON.stringify(result)}</Text>}
                </View>

                {/* <ImageBackground source={fundo} style={styles.imgFundo}>
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
                )} */}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}