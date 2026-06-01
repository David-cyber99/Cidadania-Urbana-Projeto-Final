import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProblemCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>

      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.edit}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  edit: {
    color: 'blue',
    marginTop: 10,
  },

  delete: {
    color: 'red',
    marginTop: 5,
  },
});
