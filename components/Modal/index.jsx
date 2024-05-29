import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#d2d2d2",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    padding: 20, // Adicionando preenchimento para evitar espaços indesejados
    margin: 20, // Adicionando margem para ajustar o espaço ao redor do conteúdo
    position: 'relative', // Permite posicionar o botão de fechar
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -10,
    backgroundColor: "#e1e1e1",
    padding: 5,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: "#008cc8",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomModal;
