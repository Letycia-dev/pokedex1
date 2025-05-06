// Importa as bibliotecas necessárias do React e React Native
import React from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import styles from "../../assets/styles";
import { useNavigation } from "@react-navigation/native";
import { pokemonColors } from "../../store/action";

// Importa o sistema de tradução
import "../../translate/i18n";
import { useTranslation } from "react-i18next";

export default function PokemonCard(props) {
    const { pokemon } = props;
    const navigation = useNavigation();

    const { t } = useTranslation(); // função de tradução
    const pokemonColor = pokemonColors[pokemon.type];
    const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Detail", pokemon)}
        >
            <View style={styles.card}>
                <View style={styles.card__spacing}>
                    <View style={bgStyles}>
                        <Image
                            style={styles.card__imagePokemon}
                            source={{ uri: pokemon.imgUrl }}
                        />
                        <Text style={styles.card__name}>{pokemon.name}</Text>
                        {
                            pokemon.types.map((type, idx) => (
                                <View key={idx} style={styles.card__typeContainer}>
                                    <Text style={styles.card__typeText}>
                                        {t(type.type.name)}
                                    </Text>
                                </View>
                            ))
                        }
                        {/* Exemplo adicional com species */}
                        <Text style={styles.card__speciesTitle}>
                            {t("Species")}: <Text style={styles.card__species}>{pokemon.species}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
