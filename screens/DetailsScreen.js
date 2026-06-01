import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { problem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{problem.title}</Text>

      <Text style={styles.label}>Categoria:</Text>
      <Text>{problem.category}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text>{problem.description}</Text>

      <Text style={styles.label}>Data:</Text>
      <Text>{problem.created_at}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold'
  }
});
