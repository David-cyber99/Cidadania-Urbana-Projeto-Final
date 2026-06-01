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

export default function AddProblemScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  function saveProblem() {
    if (!title || !category || !description) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    db.runSync(
      'INSERT INTO problems (title, category, description, created_at) VALUES (?, ?, ?, ?);',
      [title, category, description, new Date().toISOString()]
    );

    Alert.alert('Sucesso', 'Ocorrência cadastrada.');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={saveProblem}>
        <Text style={styles.buttonText}>Salvar</Text>
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
    backgroundColor: '#1565c0',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
