import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, ToastAndroid } from 'react-native';
import CustomButton from '../../../components/Button';
import { styles } from './styles';
import Input from '../../../components/Input';
import fundo from './../../../assets/fundo_login.jpg';

export default function Register() {
    const [login, setLogin] = useState({});

    const handleChange = (name, value) => {
        setLogin({ ...login, [name]: value });
    }

    const onSubmit = () => {
        console.log("oaskdkoas");
        try {
            // Implementar a lógica de login
            console.log(login);
        } catch (error) {
            ToastAndroid.show('Erro ao realizar login', ToastAndroid.SHORT);
        }
    }

    return (
        <SafeAreaProvider>
            <ImageBackground source={fundo} style={styles.background}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.title}>CADASTRO</Text>
                        <Input
                            name="Nome"
                            placeholder="Digite o seu nome"
                            keyboardType="default"
                            onChange={value => handleChange('email', value)}
                        />
                        <Input
                            name="Email"
                            placeholder="Digite o seu email"
                            keyboardType="email-address"
                            onChange={value => handleChange('email', value)}
                        />
                        <Input
                            isPassword
                            name="Senha"
                            placeholder="Digite sua senha"
                            onChange={value => handleChange('senha', value)}
                        />
                        
                        <CustomButton title="Cadastrar" />
                        
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
