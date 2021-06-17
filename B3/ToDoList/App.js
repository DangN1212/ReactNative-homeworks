/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button,
  TextInput,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState(null);
  const [itemIdEdit, setItemIdEdit] = useState(null);
  const [isFilterResolved, setIsFilterResolved] = useState(false);

  const handlePress = params => {
    if (!newText) {
      return false;
    }

    if (itemIdEdit) {
      const itemEditing = todos.find(i => i.id === itemIdEdit);
      if (!itemEditing) return;
      itemEditing['text'] = newText;
      setTodos(
        todos.map(item => {
          return item.id === itemIdEdit ? itemEditing : item;
        }),
      );
      setNewText(null);
      setItemIdEdit(null);

      return;
    }

    setNewText(null);
    setTodos([...todos, {text: newText, id: randomId(), isResolved: false}]);
  };

  const handleOnChange = text => {
    setNewText(text);
  };

  const handleDelete = id => {
    setTodos(todos.filter(i => i.id !== id));
  };

  const handleEdit = (id, isResolved) => {
    const itemEditing = todos.find(i => i.id === id);

    if (!itemEditing) {
      return;
    }

    if (isResolved) {
      itemEditing['isResolved'] = true;

      setTodos(
        todos.map(i => {
          if (i.id !== id) {
            return i;
          } else {
            return itemEditing;
          }
        }),
      );
    } else {
      setItemIdEdit(id);
      setNewText(itemEditing.text);
    }
  };

  const randomId = params => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleFilter = (isFilter = false) => {
    setIsFilterResolved(isFilter);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <TextInput
          placeholder="Input text"
          onChangeText={handleOnChange}
          value={newText}
        />
        <Button title="PRESS" onPress={handlePress} />
        <Button title="FILTER" onPress={() => handleFilter(true)} />
        <Button title="SHOW ALL" onPress={() => handleFilter(false)} />
        <FlatList
          data={todos.filter(i => {

            return isFilterResolved ? i.isResolved : true;
          })}
          keyExtractor={item => item.id}
          renderItem={item => (
            <TodoItem
              data={item}
              handleDelete={() => {
                handleDelete(item.item.id);
              }}
              handleEdit={() => handleEdit(item.item.id)}
              handleResolve={() => handleEdit(item.item.id, true)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const TodoItem = params => {
  return (
    <View style={{borderWidth: 1, borderStyle: 'dashed'}}>
      <Text
        style={{
          textAlign: 'center',
          color: params.data.item.isResolved ? 'red' : 'black',
        }}>
        {params.data.item.text}
      </Text>
      <Button title="Done" onPress={() => params.handleResolve()} />
      <Button w title="Edit" onPress={() => params.handleEdit()} />
      <Button title="Delete" onPress={() => params.handleDelete()} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
