import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { getPokemonEvolutionChain } from '../services/pokemonService';

const DetailScreen = ({ route }) => {
  const { pokemon } = route.params;
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const [evolution, setEvolution] = useState([]);

  useEffect(() => {
    const fetchEvolution = async () => {
      const chain = await getPokemonEvolutionChain(pokemon.id);
      if (chain) {
        const evoList = [];
        let current = chain;
        while (current) {
          evoList.push(current.species.name);
          current = current.evolves_to?.[0];
        }
        setEvolution(evoList);
      }
    };

    fetchEvolution();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>

      <Button
        title={isFavorite(pokemon.id) ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
        onPress={() => toggleFavorite(pokemon)}
        color={isFavorite(pokemon.id) ? 'tomato' : 'green'}
      />

      <Image
        source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
        style={styles.image}
      />

      <Text style={styles.label}>Tipo(s):</Text>
      <Text style={styles.text}>
        {pokemon.types.map((t) => t.type.name).join(', ')}
      </Text>

      <Text style={styles.label}>Estadísticas:</Text>
      {pokemon.stats.map((stat, index) => (
        <Text key={index} style={styles.text}>
          {stat.stat.name}: {stat.base_stat}
        </Text>
      ))}

      <Text style={styles.label}>Habilidades:</Text>
      <Text style={styles.text}>
        {pokemon.abilities.map((a) => a.ability.name).join(', ')}
      </Text>

      <Text style={styles.label}>Altura:</Text>
      <Text style={styles.text}>{pokemon.height}</Text>

      <Text style={styles.label}>Peso:</Text>
      <Text style={styles.text}>{pokemon.weight}</Text>

      <Text style={styles.label}>Experiencia base:</Text>
      <Text style={styles.text}>{pokemon.base_experience}</Text>

      <Text style={styles.label}>Evolución:</Text>
      <Text style={styles.text}>
        {evolution.length > 0 ? evolution.join(' → ') : 'No tiene'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    alignSelf: 'flex-start',
  },
});

export default DetailScreen;
