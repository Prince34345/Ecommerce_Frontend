import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage, updateSearchTerm } from '@/store/slices/searchSlice';
import { RootState } from '@/store/store';

const Search: React.FC = () => {
  const navigator = useNavigation();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch = useDispatch();

  const handleSearch = (text: string) => {
    console.log("searchTerm", text);
    setSearchTerm(text)
    dispatch(updatePage(1))

  }
  
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(updateSearchTerm(searchTerm));
      if (searchTerm) {
        navigator.navigate("plp/index" as never);
      }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  },[searchTerm])
  
  return (
    <View>
      <TextInput
        placeholderTextColor={"black"}
        placeholder='Search'
        style={styles.searchBar}
        value={searchTerm}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#eeebe5",
    width: 240,
    height: 40,
    paddingLeft: 20
  }
});

export default Search;
