import { useState, useCallback, useEffect } from "react";
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
import Spinner from "../../components/Spinner";
import CustomButton from "../../components/Button";
import Input from "../../components/Input";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from 'react-native-vector-icons';


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

    const getDataFromAsyncStorage = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                await getStaticData(JSON.parse(user))
                setIsLoading(false);
            }
            else navigation.navigate('Login');
        } catch (error) {
            ToastAndroid.show('Erro ao buscar dados do usuário', ToastAndroid.LONG);
        }
    };

    const getStaticData = async (user) => {
        try {
            const { data } = await api.get(`/usuario/${user.ID_USUARIO}`);
            const { data: imageData } = await api.get(`/userImage/${data.IMG_USUARIO}`, { responseType: 'blob' });
            const blob = imageData;
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => setImageURL(reader.result);
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

    const onEditSubmit = async () => {
        try {
            const formData = new FormData();
            if (allImg) {
                formData.append('file', {
                    uri: allImg.uri,
                    name: allImg.fileName,
                    type: allImg.mimeType,
                });
                setUsuario({ ...usuario, IMG_USUARIO: allImg.fileName });
            }
            formData.append('nome', editInfo.NM_USUARIO);
            formData.append('email', editInfo.EMAIL_USUARIO);
            if (editInfo.SENHA_USUARIO) formData.append('senha', editInfo.SENHA_USUARIO);
            else formData.append('senha', usuario.SENHA_USUARIO);

            await api.put(`/usuario/${usuario.ID_USUARIO}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

            const { data: newImageData } = await api.get(`/userImage/${usuario.IMG_USUARIO}`, { responseType: 'blob' });
            const blob = newImageData;
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => setImageURL(reader.result);

            setEditModal(false);
            setEditInfo({});
            setAllImg(null);
            getDataFromAsyncStorage();
            ToastAndroid.show('Perfil atualizado com sucesso', ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show('Erro ao atualizar perfil', ToastAndroid.LONG);
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

    const handleEdit = () => {
        setEditModal(true);
        setEditInfo(usuario);
    };

    const isAnimalAssociated = () => {
        const { ANIMAIS } = usuario;
        if (ANIMAIS.some(animal => animal.ID_ANIMAL !== null)) return true;
        return false;
    }

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

        if (!result.canceled) setAllImg(result.assets[0]);
    };

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            console.log('\n\n\n\nUSE EFFECT\n\n\n\n');
            getDataFromAsyncStorage();
            return () => { };
        }, [])
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {!isLoading && (
                    <>
                        <ImageBackground
                            source={imgFundo}
                            style={styles.imgFundo}
                        >
                            <ScrollView contentContainerStyle={{ display: "flex", flexDirection: "column", paddingHorizontal: 20, alignItems: "center" }}>
                                <View style={styles.profileBox}>
                                    <Image source={{ uri: imageURL || '' }} style={styles.imgPerfil} />
                                    <Text style={styles.name}>{usuario.NM_USUARIO}</Text>
                                    <Text style={styles.email}>{usuario.EMAIL_USUARIO}</Text>
                                    <CustomButton title="Escanear Animal" />
                                    <View style={{ display: "flex", flexDirection: "row", gap: 12, justifyContent: "center" }}>
                                        <ActionButton title={<><Feather name="edit" size={20} color="#fff" />{'  '}Editar perfil</>} onPress={handleEdit} />
                                        <ActionButton variant="danger" title="Deslogar" onPress={logout} />
                                    </View>
                                </View>

                                {isAnimalAssociated() && (
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
                                )}

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
                            <CustomModal visible={editModal} onClose={() => {
                                setEditModal(false);
                                setEditInfo({});
                                setAllImg(null);
                            }} title="Editar Perfil">
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
                                    <Input
                                        isPassword
                                        name="Senha"
                                        placeholder="Digite a nova senha"
                                        value={editInfo.SENHA_USUARIO}
                                        onChange={value => setEditInfo({ ...editInfo, SENHA_USUARIO: value })}
                                    />
                                    {allImg && <Image source={{ uri: allImg.uri }} style={{ width: 100, height: 100, marginVertical: 15, borderRadius: 8 }} />}
                                    {allImg && <Text style={{ color: 'green', textAlign: 'center' }}>Imagem selecionada</Text>}

                                    <ActionButton title={allImg ? "Trocar Imagem" : "Selecionar Imagem"} onPress={pickImage} />

                                    <ActionButton title="Salvar" onPress={onEditSubmit} />
                                </View>

                            </CustomModal>
                        )}
                    </>
                )}

                {isLoading && (
                    <ImageBackground
                        source={imgFundo}
                        style={styles.imgFundo}
                    >
                        <Spinner />
                    </ImageBackground>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}