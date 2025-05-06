import { StyleSheet, Platform, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blacks",
  },

  text__titleDetail: {
    fontSize: 50,
    margin: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
  },

  detail__imagePokemon: {
    height: 200,
    width: 200,
    zIndex: 1,
  },

  card__typeContainer: {
    opacity: 0.85,
    borderRadius: 10,
    alignSelf: "baseline",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  card__typeText: {
    color: "black",
    fontWeight: "bold",
  },

  about__title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
    opacity: 0.9,
    textAlign: "center",
  },

  about__text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  stats__title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
    textAlign: "center",
  },

  stats__text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
