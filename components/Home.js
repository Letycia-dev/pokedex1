import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    if (!nextUrl) return;
    setLoading(true);
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();
      const detailedPromises = data.results.map(async (pokemon) => {
        const resDetails = await fetch(pokemon.url);
        return resDetails.json();
      });
      const detailedData = await Promise.all(detailedPromises);
      setPokemons((prev) => [...prev, ...detailedData]);
      setNextUrl(data.next);
    } catch (error) {
      console.error("Erro ao buscar Pokémons:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: getColor(item.types[0]?.type.name) }]}
      onPress={() => navigation.navigate("Detail", {
        name: item.name,
        imgUrl: item.sprites.front_default,
        species: item.species.name,
        height: item.height,
        weight: item.weight,
        abilities: item.abilities,
        types: item.types,
        stats: item.stats,
        moves: item.moves,
        backgroundColor: getColor(item.types[0]?.type.name),
      })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Image
        source={{ uri: item.sprites.front_default }}
        style={{ width: 80, height: 80 }}
      />
      <View style={styles.typesContainer}>
        {item.types.map((typeObj, idx) => (
          <Text key={idx} style={styles.typeText}>{typeObj.type.name}</Text>
        ))}
      </View>
      <Text style={styles.species}>Espécie: {item.species.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.webp")}
        style={styles.headerImage}
        resizeMode="contain"
      />

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={fetchPokemons}>
          <Text style={styles.buttonText}>Carregar mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const getColor = (type) => {
  const colors = {
    fire: "#f08030",
    water: "#6890f0",
    grass: "#78c850",
    electric: "#f8d030",
    bug: "#a8b820",
    normal: "#a8a878",
    poison: "#a040a0",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    rock: "#b8a038",
    ice: "#98d8d8",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#f0b6bc",
  };
  return colors[type] || "#ccc";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerImage: {
    width: 180,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    margin: 8,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  typesContainer: {
    flexDirection: "row",
    gap: 6,
    marginVertical: 5,
  },
  typeText: {
    backgroundColor: "#ffffff55",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
    marginRight: 5,
    textTransform: "capitalize",
  },
  species: {
    marginTop: 5,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
