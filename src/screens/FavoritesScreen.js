import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext'; //Importa el contexto general 

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext); // Accede a la lista global de favoritos

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { pokemon: item })}
    >
      <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No tienes Pokémon favoritos aún.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
        />
      )}
    </View>
  );
};

// Estilos visuales de la pantalla
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
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});

export default FavoritesScreen;
