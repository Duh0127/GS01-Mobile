import React, { useState, useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, ToastAndroid } from 'react-native';
import CustomButton from '../../../components/Button';
import { styles } from './styles';
import Input from '../../../components/Input';
import fundo from './../../../assets/fundo_login.jpg';
import { api } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionButton from '../../../components/ActionButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Spinner from '../../../components/Spinner';

export default function Login({ updateLogin }) {
    const navigation = useNavigation();
    const [login, setLogin] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setLogin({ ...login, [name]: value });
        if (error[name]) {
            setError({ ...error, [name]: false });
        }
    };

    const verifyIsLogged = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            ToastAndroid.show('Você já está logado', ToastAndroid.LONG);
            navigation.navigate('Perfil');
        }
    }

    const onSubmit = async () => {
        const newError = {};
        if (!login.email) newError.email = "O email é obrigatório";
        if (!login.senha) newError.senha = "A senha é obrigatória";

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (login.email && !emailRegex.test(login.email)) {
            newError.email = "Email inválido";
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return ToastAndroid.show('Preencha todos os campos corretamente', ToastAndroid.SHORT);
        }

        try {
            setLoading(true);
            login.email = login.email.toLowerCase();
            const { data } = await api.post('/login', login);
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.usuario));
            ToastAndroid.show('Login realizado com sucesso', ToastAndroid.LONG);
            updateLogin();
            setTimeout(() => navigation.navigate('Perfil'), 2500);
        } catch (error) {
            ToastAndroid.show('Email ou senha inválidos', ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            verifyIsLogged();
            setError({});
            setLogin({});
        }, [])
    );

    return (
        <SafeAreaProvider>
            <ImageBackground source={fundo} style={styles.background}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.title}>LOGIN</Text>
                        <View>
                            <Input
                                name="Email"
                                placeholder="Digite o seu email"
                                keyboardType="email-address"
                                onChange={value => handleChange('email', value)}
                                value={login.email || ''}
                            />
                            {error.email && <Text style={styles.error}>{error.email}</Text>}
                        </View>
                        <View>
                            <Input
                                isPassword
                                name="Senha"
                                placeholder="Digite sua senha"
                                onChange={value => handleChange('senha', value)}
                                value={login.senha || ''}
                            />
                            {error.senha && <Text style={styles.error}>{error.senha}</Text>}
                        </View>
                        {loading ? <Spinner /> : <ActionButton title="Entrar" onPress={onSubmit} />}
                        <View style={styles.notHaveAccountContainer}>
                            <Text style={styles.notHaveAccount}>Ainda não tem uma conta?</Text>
                            <CustomButton variant='secondary' title="Crie uma" navigateTo="Register" />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    );
}
