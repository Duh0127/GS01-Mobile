import React, { useState, useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, ToastAndroid, Button, Image } from 'react-native';
import CustomButton from '../../../components/Button';
import { styles } from './styles';
import Input from '../../../components/Input';
import fundo from './../../../assets/fundo_login.jpg';
import { api } from '../../../services/api';
import ActionButton from '../../../components/ActionButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Spinner from '../../../components/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Register() {
    const navigation = useNavigation();
    const [register, setRegister] = useState({});
    const [allImg, setAllImg] = useState(null);
    const [error, setError] = useState({});
    const [isWaiting, setIsWaiting] = useState(false);

    const verifyIsLogged = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) navigation.navigate('Perfil');
    }

    const onSubmit = async () => {
        const newError = {};
        if (!register.nome) newError.nome = true;
        if (!register.email) newError.email = true;
        if (!register.senha) newError.senha = true;
        if (!allImg) return ToastAndroid.show('Selecione uma imagem', ToastAndroid.SHORT);

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return ToastAndroid.show('Preencha todos os campos', ToastAndroid.SHORT);
        }

        try {
            register.email = register.email.toLowerCase();

            let formData = new FormData();
            formData.append('file', {
                uri: allImg.uri,
                name: allImg.fileName,
                type: allImg.mimeType,
            });
            formData.append('nome', register.nome);
            formData.append('email', register.email);
            formData.append('senha', register.senha);

            setIsWaiting(true);
            await api.post('/usuario', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            ToastAndroid.show('Cadastro realizado com sucesso', ToastAndroid.LONG);
            navigation.navigate('Login');
        } catch (error) {
            ToastAndroid.show('Erro ao realizar cadastro', ToastAndroid.LONG);
        } finally {
            setIsWaiting(false);
        }
    }

    const handleChange = (name, value) => {
        setRegister({ ...register, [name]: value });
        if (error[name]) {
            setError({ ...error, [name]: false });
        }
    };

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
            quality: 0.3,
        });

        if (!result.canceled) {
            setAllImg(result.assets[0]);
        }
    };

    useFocusEffect(
        useCallback(() => {
            verifyIsLogged();
            setError({});
            setRegister({});
            setAllImg(null);
            return () => { };
        }, [])
    );

    return (
        <SafeAreaProvider>
            <ImageBackground source={fundo} style={styles.background}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.title}>CADASTRO</Text>
                        <View>
                            <Input
                                name="Nome"
                                placeholder="Digite o seu nome"
                                keyboardType="default"
                                onChange={value => handleChange('nome', value)}
                                value={register.nome || ''}
                            />
                            {error.nome && <Text style={styles.error}>O nome é obrigatório</Text>}
                        </View>
                        <View>
                            <Input
                                name="Email"
                                placeholder="Digite o seu email"
                                keyboardType="email-address"
                                onChange={value => handleChange('email', value)}
                                value={register.email || ''}
                            />
                            {error.email && <Text style={styles.error}>O email é obrigatório</Text>}
                        </View>
                        <View>
                            <Input
                                isPassword
                                name="Senha"
                                placeholder="Digite sua senha"
                                onChange={value => handleChange('senha', value)}
                                value={register.senha || ''}
                            />
                            {error.senha && <Text style={styles.error}>A senha é obrigatória</Text>}
                        </View>

                        <View style={{ alignItems: 'center', marginVertical: 10 }}>
                            {allImg && <Image source={{ uri: allImg.uri }} style={{ width: 100, height: 100, marginBottom: 10, borderRadius: 8 }} />}
                            <Button title="Selecionar Imagem" onPress={pickImage} />
                        </View>

                        {isWaiting ? <Spinner /> : <ActionButton title="Cadastrar" onPress={onSubmit} />}

                        <View style={styles.notHaveAccountContainer}>
                            <Text style={styles.notHaveAccount}>Já possui uma conta?</Text>
                            <CustomButton variant='secondary' title="Faça Login" navigateTo="Login" />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    );
}
