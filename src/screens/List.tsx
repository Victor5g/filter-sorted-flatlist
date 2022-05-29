import React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListItem from '../components/ListItem';

import listUsers from '../../mock/api/usersResponse';

const App = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [list, setList] = useState(listUsers);

  useEffect(()=>{
    if(emptyList()){
      setList(listUsers);
      return
    }
    searchUser();
  },[searchText])
  
   const emptyList = () =>{
     return searchText === ''? true: false
   };

   const searchUser = () =>{
     setList(
     listUsers.filter(item =>{
      return (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
     })
     )
  };

   const handleOrderClick = () => {
     let newlistUsers = [...list];
     newlistUsers.sort((indexA, indexB)=>
     (indexA.name > indexB.name)? 1: (indexB.name> indexA.name)? -1 :0)
     setList(newlistUsers);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise um usuario"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
          <MaterialCommunityIcons
            name="order-alphabetical-ascending"
            size={32}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        style={styles.list}
        renderItem={({ item }) => <ListItem data={item} />}
        keyExtractor={(item) => item.id}
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242425',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#363636',
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#FFFFFF',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },
});

export default App;