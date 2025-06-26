# PokeApp - React Native + Expo

Una aplicación móvil que consume la API pública de [PokeAPI](https://pokeapi.co/) para mostrar una lista de Pokémon, ver detalles, buscar por nombre y guardar favoritos.

---

## Funcionalidades principales

Listado de los primeros 20 Pokémon al iniciar  
Scroll infinito (paginación automática en bloques de 20)  
Búsqueda en tiempo real por nombre  
Pantalla de detalles con información completa:  
  • nombre  
  • imagen  
  • tipo(s)  
  • estadísticas  
  • habilidades  
  • altura, peso, experiencia base  
  • Visualización de la cadena evolutiva  
Agregar / quitar Pokémon de favoritos  
Pantalla separada para ver favoritos  
Manejo de carga, errores y estado sin conexión  
Estructura modular usando Context API y servicios

---

## Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Context API](https://reactjs.org/docs/context.html)
- [PokeAPI](https://pokeapi.co/)
- JavaScript

---

## Estructura del proyecto
├── context/ # Contexto global de favoritos
├── navigation/ # navigation entre Home, Detail, Favorites
├── screens/ # Pantallas principales
│ ├── HomeScreen.js
│ ├── DetailScreen.js
│ └── FavoritesScreen.js
├── services/ # Llamadas a la API (modular)
│ └── pokemonService.js
App.js # Punto de entrada envuelto con el Provider

## ¿Cómo correr la app?

1. Clona el repositorio:

```bash
git clone https://github.com/KevinAndrade07/PokeApp.git
cd PokeApp

##Instala las dependencias:

npm install

##Inicia el proyecto con Expo:

npx expo start

##Escanea el código QR con tu celular usando Expo Go.


Notas técnicas
Las llamadas a la API están desacopladas en pokemonService.js.
Se usa Context API para manejar favoritos globalmente sin Redux.
La paginación es un extra técnico implementado sobre el requerimiento original.
Se maneja el estado de carga, error y búsqueda con UX fluida.

Posibles mejoras futuras
Mostrar imágenes en la cadena evolutiva
Migración a TypeScript

## Kevin Andrade Solórzano 
