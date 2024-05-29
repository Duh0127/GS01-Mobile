import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const CustomButton = ({ title, navigateTo, variant = 'primary' }) => {
    const navigation = useNavigation();

    // Define estilos condicionais baseados na prop `variant`
    const buttonStyle = [styles.button];
    const buttonTextStyle = [styles.buttonText];

    if (variant === 'success') {
        buttonStyle.push(styles.success);
    } else if (variant === 'primary') {
        buttonStyle.push(styles.primary);
    } else if (variant === 'danger') {
        buttonStyle.push(styles.danger);
    } else if (variant === 'secondary') {
        buttonStyle.push(styles.secondary);
        buttonTextStyle.push(styles.secondaryText);
    }

    return (
        <TouchableOpacity style={buttonStyle} onPress={() => navigateTo && navigation.navigate(navigateTo)}>
            <Text style={buttonTextStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    primary: {
        backgroundColor: '#1785ff',
    },
    success: {
        backgroundColor: '#28a745',
    },
    danger: {
        backgroundColor: '#dc3545',
    },
    secondary: {
        backgroundColor: '#f3f3f3',
        borderWidth: 0,
    },
    secondaryText: {
        color: '#444444',
    },
});

export default CustomButton;

CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    navigateTo: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary']),
};
