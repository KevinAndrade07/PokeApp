import React, { useEffect, useState } from 'react';
import { getPokemonList, getPokemonDetails } from '../services/pokemonService';
import {
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

  // Habilita animaciones solo para Android
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
//Al cargar la pantalla, obtener los primeros 20 Pokemon 
    fetchPokemon();
  }, []);

  // Función que obtiene los Pokemon desde la API 
  const fetchPokemon = async (nextOffset = 0) => {
    try {
      setError(null);
      const basicList = await getPokemonList(20, nextOffset);
      const detailed = await Promise.all(
        basicList.map(async (pokemon) => await getPokemonDetails(pokemon.url))
      );

      if (nextOffset === 0) {
        setPokemonList(detailed);
        setFilteredList(detailed);
      } else {
        setPokemonList(prev => [...prev, ...detailed]);
        setFilteredList(prev => [...prev, ...detailed]);
      }

      setLoading(false);
      setIsFetchingMore(false);
    } catch (err) {
//Manejo de errores si falla la API o la conexión
      console.error('Error de carga:', err.message);
      setError('Hubo un problema al cargar los datos. Revisa tu conexión.');
      setLoading(false);
      setIsFetchingMore(false);
    }
  };
// Función que carga 20 Pokémon más al llegar al final del scroll
  const loadMorePokemon = () => {
    if (!isFetchingMore) {
      const nextOffset = offset + 20;
      setOffset(nextOffset);
      setIsFetchingMore(true);
      fetchPokemon(nextOffset);
    }
  };
// Filtro en tiempo real por nombre
  const handleSearch = (text) => {
    setSearch(text);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const filtered = pokemonList.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { pokemon: item })}
    >
      <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff0000" />
        <Text>Cargando Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchBar}
      />

      {error && (
        <View style={styles.center}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('Favorites')}
        style={styles.favButton}
      >
        <Text style={styles.favButtonText}>Ver Favoritos</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
      />

      {!loading && search !== '' && filteredList.length === 0 && (
        <View style={styles.center}>
          <Text>No se encontraron Pokémon con ese nombre.</Text>
        </View>
      )}

      {isFetchingMore && (
        <ActivityIndicator size="small" color="#888" style={{ marginVertical: 10 }} />
      )}
    </View>
  );
};

//Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  image: { width: 80, height: 80 },
  name: { marginTop: 10, fontWeight: 'bold', textTransform: 'capitalize' },
  searchBar: {
    backgroundColor: '#e6e6e6',
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  favButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  favButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
