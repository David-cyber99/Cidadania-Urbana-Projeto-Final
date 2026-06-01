import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import db from '../database/database';

export default function HomeScreen({ navigation }) {
  const [problems, setProblems] = useState([]);

  function createTable() {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS problems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        description TEXT,
        created_at TEXT
      );
    `);
  }

  function loadProblems() {
    try {
      const result = db.getAllSync('SELECT * FROM problems ORDER BY id DESC;');
      setProblems(result);
    } catch (error) {
      console.log(error);
    }
  }

  function deleteProblem(id) {
    Alert.alert(
      'Excluir',
      'Deseja realmente excluir esta ocorrência?',
      [
        {
          text: 'Cancelar'
        },
        {
          text: 'Sim',
          onPress: () => {
            db.runSync('DELETE FROM problems WHERE id = ?;', [id]);
            loadProblems();
          }
        }
      ]
    );
  }

  useEffect(() => {
    createTable();

    const unsubscribe = navigation.addListener('focus', () => {
      loadProblems();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cidadania Urbana</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Adicionar Problema')}
      >
        <Text style={styles.buttonText}>+ Nova Ocorrência</Text>
      </TouchableOpacity>

      <FlatList
        data={problems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Detalhes', { problem: item })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text numberOfLines={2}>{item.description}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('Editar Problema', { problem: item })
                }
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteProblem(item.id)}
              >
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d47a1'
  },
  addButton: {
    backgroundColor: '#1565c0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  category: {
    color: '#1565c0',
    marginBottom: 8,
    fontWeight: '600'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  editButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 8
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 8
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
