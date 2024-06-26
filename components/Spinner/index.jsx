import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Spinner;
