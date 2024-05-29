import React from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./styles";
import imgFundo from '../../assets/fundo_home.jpg';
import CustomButton from '../../components/Button';
import logo from '../../assets/logo.png';

export default function Home() {
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
              <CustomButton title="Iniciar Detecção" navigateTo="Login" />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
