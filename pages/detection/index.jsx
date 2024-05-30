import React, { useState, useEffect } from 'react'
import { styles } from "./styles";
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import fundo from '../../assets/fundo_deteccao.jpg';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Detection() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View>
                <Text style={{ textAlign: 'center' }}>Nós precisamos da permissão para habilitar a câmera!</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ImageBackground source={fundo} style={styles.imgFundo}>
                    <CameraView style={{ flex: 1, width: "100%" }} facing={facing}>
                        <TouchableOpacity onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                    </CameraView>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
