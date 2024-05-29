import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground } from 'react-native';
import CustomButton from '../../../components/Button';
import { styles } from './styles';
import Input from '../../../components/Input';
import fundo from './../../../assets/fundo_login.jpg';

export default function Login() {
    return (
        <SafeAreaProvider>
            <ImageBackground source={fundo} style={styles.background}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.title}>LOGIN</Text>
                        <Input
                            name="Email"
                            placeholder="Digite o seu email"
                            keyboardType="email-address"
                            onChange={value => console.log(value)}
                        />
                        <Input
                            isPassword
                            name="Senha"
                            placeholder="Digite sua senha"
                            onChange={value => console.log(value)}
                        />
                        <CustomButton title="Entrar" />
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
