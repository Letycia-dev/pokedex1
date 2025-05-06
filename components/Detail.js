import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "../assets/styles.js";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

export default function Detail() {
  const { t } = useTranslation();  // Usando hook para acessar as traduções
  const route = useRoute();
  const navigation = useNavigation();

  const {
    name = "",
    imgUrl = "",
    species = "",
    height = "",
    weight = "",
    abilities = [],
    types = [],
    stats = [],
    moves = [],
    backgroundColor = "#f4f4f4",
  } = route.params || {};

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Botão de Voltar */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 40,
          marginLeft: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={{ marginLeft: 5, fontSize: 16, color: "#000" }}>
          {t("Back")}  {/* Tradução */}
        </Text>
      </TouchableOpacity>

      {/* Imagem e nome do Pokémon */}
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Image
          source={{ uri: imgUrl }}
          style={[styles.detail__imagePokemon]}
          resizeMode="contain"
        />
        <Text style={[styles.text__titleDetail, { textAlign: "center" }]}>
          {name}
        </Text>
      </View>

      {/* Tipos */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
        {types.length > 0 ? (
          types.map((type, idx) => (
            <View key={idx} style={[styles.card__typeContainer, { margin: 5, backgroundColor: "#ffffff88" }]}>
              <Text style={styles.card__typeText}>{t(type.type.name)}</Text>
            </View>
          ))
        ) : (
          <Text>{t("No types available")}</Text>
        )}
      </View>

      {/* Seção "Sobre" */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", marginTop: 30 }}>
        <View style={{ alignItems: "center", width: "45%", marginBottom: 20 }}>
          <Text style={styles.about__title}>{t("Species")}</Text>
          <Text style={styles.about__text}>{species || t("Unknown")}</Text>
        </View>

        <View style={{ alignItems: "center", width: "45%", marginBottom: 20 }}>
          <Text style={styles.about__title}>{t("Height")}</Text>
          <Text style={styles.about__text}>{height ? `${height * 10} cm` : t("Unknown")}</Text>
        </View>

        <View style={{ alignItems: "center", width: "45%", marginBottom: 20 }}>
          <Text style={styles.about__title}>{t("Weight")}</Text>
          <Text style={styles.about__text}>{weight ? `${weight / 10} Kg` : t("Unknown")}</Text>
        </View>

        <View style={{ alignItems: "center", width: "90%", marginBottom: 20 }}>
          <Text style={styles.about__title}>{t("Abilities")}</Text>
          <Text style={[styles.about__text, { textAlign: "center" }]}>
            {abilities.length > 0
              ? abilities.map((a) => a.ability?.name).join(", ")
              : t("None")}
          </Text>
        </View>
      </View>

      {/* Stats Section */}
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.stats__title, { textAlign: "center" }]}>{t("Stats")}:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginTop: 10 }}>
          {stats.length > 0 ? (
            stats.map((stat, idx) => (
              <View key={idx} style={{ width: "45%", marginVertical: 5, alignItems: "center" }}>
                <Text style={styles.stats__text}>
                  {t(stat.stat.name)}: {stat.base_stat}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.stats__text}>{t("No stats available")}</Text>
          )}
        </View>
      </View>

      {/* Moves Section */}
      <View style={{ marginTop: 30, marginBottom: 40 }}>
        <Text style={[styles.stats__title, { textAlign: "center" }]}>{t("Moves")}:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
          {moves.length > 0 ? (
            moves.slice(0, 5).map((move, idx) => (
              <View
                key={idx}
                style={{
                  margin: 5,
                  backgroundColor: "#eee",
                  borderRadius: 10,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", color: "gray" }}>{t(move.move.name)}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.stats__text}>{t("No moves available")}</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
