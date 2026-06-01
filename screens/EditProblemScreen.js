import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native';

import db from '../database/database';

export default function EditProblemScreen({ route, navigation }) {
  const { problem } = route.params;

  const [title, setTitle] = useState(problem.title);
  const [category, setCategory] = useState(problem.category);
  const [description, setDescription] = useState(problem.description);

  function updateProblem() {
    db.runSync(
      'UPDATE problems SET title = ?, category = ?, description = ? WHERE id = ?;',
      [title, category, description, problem.id]
    );

    Alert.alert('Sucesso', 'Ocorrência atualizada.');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        multiline
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={updateProblem}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  textArea: {
    height: 120
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
