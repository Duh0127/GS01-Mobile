import React, { useState } from 'react'
import { styles } from './styles'
import { Text, TextInput, View } from 'react-native';

export default function Input({ name, placeholder, value, onChange, keyboardType, isPassword, readOnly }) {
    return (
        <View style={styles.container}>
            {name && <Text style={styles.label}>{name}</Text>}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={styles.placeholder.color}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                secureTextEntry={isPassword}
                readOnly={readOnly}
            />
        </View>
    );
}
