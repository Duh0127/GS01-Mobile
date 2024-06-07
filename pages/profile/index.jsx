import { useState, useCallback } from "react";
import { styles } from "./styles";
import { View, Text, ImageBackground, Image, ScrollView, ToastAndroid } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import imgFundo from '../../assets/fundo_perfil.jpg';
import AnimalCard from "../../components/AnimalCard";
import CustomModal from "../../components/Modal";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api, IAApi } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionButton from "../../components/ActionButton";
import Spinner from "../../components/Spinner";
import Input from "../../components/Input";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from 'react-native-vector-icons';
import ServerError from "../../components/ServerError";
import axios from "axios";

export default function Profile() {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState({});
    const [selectedAnimal, setSelectedAnimal] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editInfo, setEditInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [imageURL, setImageURL] = useState('');
    const [allImg, setAllImg] = useState(null);
    const [isDetectedModal, setIsDetectedModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [animalDetected, setAnimalDetected] = useState({});
    const [isWaitingDetection, setIsWaitingDetection] = useState(false);

    const getStaticData = async () => {
        try {
            setError(false);
            let userByStorage = await AsyncStorage.getItem('user');
            userByStorage = await JSON.parse(userByStorage);
            if (userByStorage) {
                const { data } = await api.get(`/usuario/${userByStorage.ID_USUARIO}`);
                setUsuario(data);

                const { data: imageData } = await api.get(`/userImage/${data.IMG_USUARIO}`, { responseType: 'blob' });
                const reader = new FileReader();
                reader.readAsDataURL(imageData);
                reader.onloadend = () => setImageURL(reader.result);
            }
        } catch (error) {
            setError(true);
            ToastAndroid.show('Erro ao buscar dados do usuário', ToastAndroid.LONG);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            navigation.navigate('Home');
        } catch (error) {
            ToastAndroid.show('Erro ao deslogar', ToastAndroid.LONG);
        }
    };

    const onEditSubmit = async () => {
        try {
            const formData = new FormData();
            if (allImg) {
                formData.append('file', {
                    uri: allImg.uri,
                    name: allImg.fileName,
                    type: allImg.mimeType,
                });
            }
            formData.append('nome', editInfo.NM_USUARIO);
            formData.append('email', editInfo.EMAIL_USUARIO);

            await api.put(`/usuario/${usuario.ID_USUARIO}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setEditModal(false);
            setEditInfo({});
            setAllImg(null);
            getStaticData();
            ToastAndroid.show('Perfil atualizado com sucesso', ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show('Erro ao atualizar perfil', ToastAndroid.LONG);
        }
    };

    const onSendImageToDetect = async () => {
        try {
            setIsWaitingDetection(true);
            const formData = new FormData();
            formData.append('file', {
                uri: allImg.uri,
                name: allImg.fileName,
                type: allImg.mimeType,
            });

            const { data } = await IAApi.post('/predict-image', formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log({ data });
            setAnimalDetected(data);

            if (data.confidence < 0.75) {
                setErrorImage(true);
                setAllImg(null);
                ToastAndroid.show('Animal não detectado, informe uma imagem melhor', ToastAndroid.LONG);
                return;
            }

            const animalName = data.prediction.replace(/[0-9]/g, '').trim();
            const { data: animalData } = await api.get(`/animal/nome/${animalName}`)
            const sendLink = { ID_USUARIO: usuario.ID_USUARIO, ID_ANIMAIS: [animalData.ID_ANIMAL] }
            const { data: linkAnimal } = await api.post('/vincular-usuario-animais', sendLink);
            if (linkAnimal.message === 'Esse usuário ja possui esses animais vinculados') {
                ToastAndroid.show('Animal já vinculado ao perfil', ToastAndroid.LONG);
                setIsDetectedModal(false);
                setAllImg(null);
                setErrorImage(false);
                setAnimalDetected({});
                getStaticData();
                return;
            }
            ToastAndroid.show('Animal detectado com sucesso e Vinculado ao perfil', ToastAndroid.LONG);

            setIsDetectedModal(false);
            setAllImg(null);
            setErrorImage(false);
            setAnimalDetected({});
            getStaticData();
        } catch (error) {
            ToastAndroid.show('Erro ao enviar imagem para detecção', ToastAndroid.LONG);
        } finally {
            setIsWaitingDetection(false);
        }
    };

    const handleCardClick = (animal) => {
        setSelectedAnimal(animal);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAnimal({});
    };

    const handleEdit = () => {
        setEditModal(true);
        setEditInfo(usuario);
    };

    const isAnimalAssociated = () => {
        return usuario.ANIMAIS?.some(animal => animal.ID_ANIMAL !== null) || false;
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissões para acessar a galeria!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setAllImg(result.assets[0]);
        }
        setErrorImage(false);
    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setIsLoading(true);

                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate('Home');
                    return;
                }

                await getStaticData();
            };
            fetchData();
        }, [])
    );

    if (error) return <ServerError />;

    if (isLoading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <ImageBackground source={imgFundo} style={styles.imgFundo}>
                        <View style={{ display: "flex", flex: 1, justifyContent: "center", width: "80%", backgroundColor: "#fff8", borderRadius: 16 }}>
                            <Spinner />
                            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginTop: 16 }}>Carregando dados...</Text>
                        </View>
                    </ImageBackground>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ImageBackground source={imgFundo} style={styles.imgFundo}>
                    <ScrollView contentContainerStyle={{ display: "flex", flexDirection: "column", paddingHorizontal: 20, alignItems: "center" }}>
                        <View style={styles.profileBox}>
                            <Image source={{ uri: imageURL || 'a' }} style={styles.imgPerfil} />
                            <Text style={styles.name}>{usuario.NM_USUARIO}</Text>
                            <Text style={styles.email}>{usuario.EMAIL_USUARIO}</Text>
                            <ActionButton title={<><Feather name="camera" size={20} color="#fff" />{'  '}Detectar Animal</>} onPress={() => setIsDetectedModal(true)} />
                            <View style={{ display: "flex", flexDirection: "row", gap: 12, justifyContent: "center" }}>
                                <ActionButton title={<><Feather name="edit" size={20} color="#fff" />{'  '}Editar perfil</>} onPress={handleEdit} />
                                <ActionButton variant="danger" title={<><Feather name="log-out" size={20} color="#fff" />{'  '}Sair</>} onPress={logout} />
                            </View>
                        </View>

                        <View style={styles.animalsContainer}>
                            <Text style={styles.animalTitle}>Animais Encontrados</Text>
                            <View style={styles.animalsFoundContainer}>
                                {isAnimalAssociated() ? (
                                    usuario.ANIMAIS.map(animal => (
                                        <AnimalCard
                                            key={animal.ID_ANIMAL}
                                            imageUrl={{ uri: animal.IMG_ANIMAL }}
                                            title={animal.NM_ANIMAL}
                                            otherName={animal.NM_CIENTIFICO_ANIMAL}
                                            onPress={() => handleCardClick(animal)}
                                        />
                                    ))
                                ) : (
                                    <Text style={styles.noAnimalText}>Nenhum animal encontrado</Text>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>

                {showModal && (
                    <CustomModal visible={showModal} onClose={handleCloseModal}>
                        <View style={styles.modalContent}>
                            <Image source={{ uri: selectedAnimal.IMG_ANIMAL }} style={styles.modalImg} />
                            <Text style={styles.mainName}>{selectedAnimal.NM_ANIMAL}</Text>
                            <Text style={styles.scientificName}>{selectedAnimal.NM_CIENTIFICO_ANIMAL}</Text>
                            <View style={styles.animalInfo}>
                                <View style={styles.firstRow}>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Espécie</Text>
                                        <Text style={styles.boxValue}>{selectedAnimal?.ESPECIE?.NM_ESPECIE.toLowerCase()}</Text>
                                    </View>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Dieta</Text>
                                        <Text style={styles.boxValue}>{selectedAnimal?.DIETA?.NM_DIETA.toLowerCase()}</Text>
                                    </View>
                                </View>
                                <View style={styles.lastRow}>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Habitat</Text>
                                        <Text style={styles.boxValue}>{selectedAnimal?.HABITATS.map(habitat => habitat.NM_HABITAT.toLowerCase() + ' ')}</Text>
                                    </View>
                                    <View style={styles.detailBox}>
                                        <Text style={styles.boxTitle}>Status</Text>
                                        <Text style={styles.boxValue}>{selectedAnimal.STATUS_ANIMAL.toLowerCase()}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.modalDescription}>
                                <ScrollView style={{ maxHeight: 150, marginTop: 10 }}>
                                    <Text style={styles.descriptionText}>{selectedAnimal.DESC_ANIMAL}</Text>
                                </ScrollView>
                            </View>
                        </View>
                    </CustomModal>
                )}

                {editModal && (
                    <CustomModal
                        visible={editModal}
                        onClose={() => {
                            setEditModal(false);
                            setEditInfo({});
                            setAllImg(null);
                        }}
                        title="Editar Perfil"
                    >
                        <View style={styles.modalContent}>
                            <Input
                                name="Nome"
                                placeholder="Digite o novo nome"
                                value={editInfo.NM_USUARIO}
                                onChange={value => setEditInfo({ ...editInfo, NM_USUARIO: value })}
                                keyboardType='default'
                            />
                            <Input
                                name="Email"
                                placeholder="Digite o novo email"
                                value={editInfo.EMAIL_USUARIO}
                                onChange={value => setEditInfo({ ...editInfo, EMAIL_USUARIO: value })}
                                keyboardType='email-address'
                            />
                            {allImg && <Image source={{ uri: allImg.uri }} style={{ width: 100, height: 100, marginVertical: 15, borderRadius: 8 }} />}
                            {allImg && <Text style={{ color: 'green', textAlign: 'center' }}>Imagem selecionada</Text>}

                            <ActionButton variant="secondary" title={allImg ? "Trocar Imagem" : "Selecionar Imagem"} onPress={pickImage} />
                            <ActionButton title="Salvar" onPress={onEditSubmit} />
                        </View>
                    </CustomModal>
                )}

                {isDetectedModal && (
                    <CustomModal title="Envie uma foto do animal" visible={isDetectedModal} onClose={() => {
                        setIsDetectedModal(false)
                        setAllImg(null);
                        setErrorImage(false);
                    }}>
                        <View style={styles.modalContent}>
                            {allImg && <Image source={{ uri: allImg.uri }} style={{ width: 280, height: 280, marginVertical: 15, borderRadius: 8 }} />}
                            {errorImage && (
                                <>
                                    <Text style={{ color: 'red', textAlign: 'center', fontSize: 18, fontWeight: 800, textTransform: "uppercase" }}>Animal detectado incorretamente</Text>
                                    {animalDetected && (
                                        <View style={styles.detectContainer}>
                                            <Text style={styles.animalPredictionText}>{animalDetected.prediction.replace(/[0-9]/g, '').trim()}</Text>
                                            <Text style={styles.precisionText}>{(animalDetected.confidence * 100).toFixed(2)}% de precisão</Text>
                                            <Text style={styles.idealPrecisionText}>esperado maior que 75% </Text>
                                        </View>
                                    )}
                                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>Por favor, informe uma imagem melhor</Text>
                                </>
                            )}
                            {!allImg && <ActionButton variant="secondary" title={allImg ? "Trocar Imagem" : "Selecionar Imagem"} onPress={pickImage} />}
                            {isWaitingDetection && <Spinner />}
                            {!isWaitingDetection && allImg && <ActionButton title="Enviar Imagem" onPress={onSendImageToDetect} />}
                        </View>
                    </CustomModal>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
