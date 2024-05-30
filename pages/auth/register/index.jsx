import React, { useState, useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, ToastAndroid } from 'react-native';
import CustomButton from '../../../components/Button';
import { styles } from './styles';
import Input from '../../../components/Input';
import fundo from './../../../assets/fundo_login.jpg';
import { api } from '../../../services/api';
import ActionButton from '../../../components/ActionButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Spinner from '../../../components/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const navigation = useNavigation();
    const [register, setRegister] = useState({});
    const [error, setError] = useState({});
    const [isWaiting, setIsWaiting] = useState(false);

    const verifyIsLogged = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            ToastAndroid.show('Você já está logado', ToastAndroid.LONG);
            navigation.navigate('Perfil');
        }
    }

    const onSubmit = async () => {
        const newError = {};
        if (!register.nome) newError.nome = true;
        if (!register.email) newError.email = true;
        if (!register.senha) newError.senha = true;

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return ToastAndroid.show('Preencha todos os campos', ToastAndroid.SHORT);
        }

        try {
            register.email = register.email.toLowerCase();
            setIsWaiting(true);
            await api.post('/usuario', register);
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

    useFocusEffect(
        useCallback(() => {
            verifyIsLogged();
            setError({});
            setRegister({});
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
