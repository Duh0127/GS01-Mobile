import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
  },
  label: {
    color: '#000',
    marginBottom: 2,
    fontSize: 20,
    fontWeight: '600',
  },    
  input: {
    minWidth: '100%',
    width: '100%',
    color: '#000',
    backgroundColor: "#e5f5fc",
    borderColor: '#0001',
    borderWidth: 1,
    borderRadius: 6,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 12,
    color: '#000',
  },
  placeholder: {
    color: '#000',
  }
});
