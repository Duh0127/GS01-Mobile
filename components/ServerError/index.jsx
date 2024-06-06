import React from 'react'
import { Image, Text, View } from 'react-native'
import CustomButton from '../Button'
import illustation from '../../assets/error.png'

export default function ServerError() {
    return (
        <View style={styles.container}>
            <Image style={styles.illustration} source={illustation} />
            <View style={styles.textDiv}>
                <Text style={styles.text}>Oopss...</Text>
                <Text style={styles.text}>Ocorreu um erro!</Text>
            </View>
            <CustomButton title="Voltar para a Home" navigateTo='Home' />
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#000930",
    },
    illustration: {
        width: "60%",
        height: "37%",
        padding: 20,
        margin: 50,
    },
    textDiv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    text: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
    }
}
