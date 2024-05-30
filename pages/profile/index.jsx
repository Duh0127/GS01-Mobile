import { useState, useCallback } from "react";
import { styles } from "./styles";
import { View, Text, ImageBackground, Image, ScrollView, ToastAndroid } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import imgFundo from '../../assets/fundo_perfil.jpg';
import perfil from '../../assets/perfil.png';
import AnimalCard from "../../components/AnimalCard";
import CustomModal from "../../components/Modal";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionButton from "../../components/ActionButton";

export default function Profile() {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState({});
    const [selectedAnimal, setSelectedAnimal] = useState({});
    const [showModal, setShowModal] = useState(false);

    const getDataFromAsyncStorage = useCallback(async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) getStaticData(JSON.parse(user));
            else navigation.navigate('Login');
        } catch (error) {
            ToastAndroid.show('Erro ao buscar dados do usuário', ToastAndroid.LONG);
        }
    }, []);

    const getStaticData = async (user) => {
        try {
            console.log(user.ID_USUARIO);
            const { data } = await api.get(`/usuario/${user.ID_USUARIO}`);
            setUsuario(data);
        } catch (error) {
            ToastAndroid.show('Erro ao buscar dados do usuário', ToastAndroid.LONG);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            navigation.navigate('Home');
        } catch (error) {
            ToastAndroid.show('Erro ao deslogar', ToastAndroid.LONG);
        }
    }

    const handleCardClick = (animal) => {
        setSelectedAnimal(animal);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAnimal({});
    }

    useFocusEffect(
        useCallback(() => {
            getDataFromAsyncStorage();
            return () => {};
        }, [])
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <ImageBackground
                        source={imgFundo}
                        style={styles.imgFundo}
                    >
                        <View style={styles.profileBox}>
                            <Image source={perfil} style={styles.imgPerfil} />
                            <Text style={styles.name}>{usuario.NM_USUARIO}</Text>
                            <Text style={styles.name}>{usuario.EMAIL_USUARIO}</Text>
                            <ActionButton title="Escanear Animal" />
                            <ActionButton variant="danger" title="Deslogar" onPress={logout} />
                        </View>

                        <View style={styles.animalsContainer}>
                            <Text style={styles.animalTitle}>Animais Encontrados</Text>
                            <View style={styles.animalsFoundContainer}>
                                <AnimalCard
                                    imageUrl={imgFundo}
                                    title="Jaguatirica"
                                    otherName="Nome Cientifico"
                                    onPress={() => handleCardClick({ title: "Jaguatirica", imageUrl: imgFundo, otherName: "Nome cientifico" })}
                                />
                                <AnimalCard
                                    imageUrl={imgFundo}
                                    title="Animal 2"
                                    otherName="Descrição do animal 1"
                                    onPress={() => console.log("apertou o card")}
                                />
                                <AnimalCard
                                    imageUrl={imgFundo}
                                    title="Animal 3"
                                    otherName="Descrição do animal 1"
                                    onPress={() => console.log("apertou o card")}
                                />
                                <AnimalCard
                                    imageUrl={imgFundo}
                                    title="Animal 4"
                                    otherName="Descrição do animal 1"
                                    onPress={() => console.log("apertou o card")}
                                />
                                <AnimalCard
                                    imageUrl={imgFundo}
                                    title="Animal 4"
                                    otherName="Descrição do animal 1"
                                    onPress={() => console.log("apertou o card")}
                                />
                                <AnimalCard
                                    imageUrl={imgFundo}
                                    title="Animal 4"
                                    otherName="Descrição do animal 1"
                                    onPress={() => console.log("apertou o card")}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>
                {showModal && (
                    <CustomModal visible={showModal} onClose={handleCloseModal}>
                        <View style={styles.modalContent}>
                            <Image source={selectedAnimal.imageUrl} style={styles.modalImg} />
                            <Text style={styles.mainName}>{selectedAnimal.title}</Text>
                            <Text style={styles.scientificName}>{selectedAnimal.otherName}</Text>
                            <View style={styles.animalInfo}>
                                <View style={styles.firstRow}>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Espécie</Text>
                                        <Text style={styles.boxValue}>Jaguatiricão</Text>
                                    </View>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Dieta</Text>
                                        <Text style={styles.boxValue}>Carnívoro</Text>
                                    </View>
                                </View>
                                <View style={styles.lastRow}>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Habitat</Text>
                                        <Text style={styles.boxValue}>Mata Fechada</Text>
                                    </View>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Status</Text>
                                        <Text style={styles.boxValue}>Preservado</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.modalDescription}>
                                <ScrollView style={{ 
                                    maxHeight: 150,
                                    marginTop: 10,
                                 }}>
                                    <Text style={styles.descriptionText}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, laudantium! Sint temporibus debitis sed? Ipsa quae cum laudantium. Quasi ratione eius quia dolore voluptate cupiditate vel recusandae asperiores laudantium ea magnam facere, dicta reprehenderit unde omnis natus aliquid rem enim dolor quisquam cum, culpa expedita? Facere, ex modi! Nulla magnam nobis iusto quia fugiat, dolore modi animi repellendus autem ipsa deleniti minima aperiam, beatae, sint assumenda totam saepe officiis enim? Dignissimos, ipsa? Et veniam, reiciendis molestiae aspernatur commodi facere quis quos ex perferendis nostrum cumque repudiandae quibusdam quaerat alias asperiores id facilis exercitationem expedita! Sed ducimus quidem iure perspiciatis non?</Text>
                                </ScrollView>
                            </View>
                        </View>
                    </CustomModal>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}