import React, { useState, useCallback } from 'react';
import { Image, ImageBackground, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./styles";
import imgFundo from '../../assets/fundo_home.jpg';
import CustomButton from '../../components/Button';
import logo from '../../assets/logo.png';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';

export default function Home() {
  const [usuario, setUsuario] = useState({});

  const getStaticData = async () => {
    try {
      let userByStorage = await AsyncStorage.getItem('user');
      userByStorage = await JSON.parse(userByStorage);
      if (userByStorage) {
        const { data } = await api.get(`/usuario/${userByStorage.ID_USUARIO}`);
        setUsuario(data);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      ToastAndroid.show('Erro ao buscar dados do usuário', ToastAndroid.LONG);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getStaticData();
      };
      fetchData();
    }, [])
  );


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={imgFundo}
          style={styles.imgFundo}
        >
          <View style={styles.texts}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.subtitle}>Inteligência de Animais Marinhos</Text>
          </View>

          <View style={styles.buttonView}>
            <CustomButton title={usuario ? "Iniciar Detecção" : "Faça Login"} navigateTo={usuario ? "Perfil" : "Login"} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
