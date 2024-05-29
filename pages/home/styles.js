import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B2445",
    flex: 1,
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  texts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 12,
    borderRadius: 12,
  },
  logo: {
    width: 310,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 74,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  buttonView: {
    marginTop: 20,
  },
});
