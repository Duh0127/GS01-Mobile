import { styles } from "./styles";
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import CustomButton from '../../components/Button';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import imgFundo from '../../assets/fundo_perfil.jpg';
import perfil from '../../assets/perfil.png';
import AnimalCard from "../../components/AnimalCard";
import { useState } from "react";
import CustomModal from "../../components/Modal";

export default function Profile() {
    const [selectedAnimal, setSelectedAnimal] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (animal) => {
        setSelectedAnimal(animal);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAnimal({});
    }

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
                            <Text style={styles.name}>Eduardo Toshio</Text>
                            <CustomButton title="Escanear Animal" />
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