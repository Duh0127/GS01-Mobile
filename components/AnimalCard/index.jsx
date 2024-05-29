import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AnimalCard = ({ imageUrl, title, onPress, otherName }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image source={imageUrl} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.otherName}>{otherName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e4fbff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 8,
        padding: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    otherName: {
        fontSize: 14,
        textAlign: 'center',
    }
});

export default AnimalCard;
