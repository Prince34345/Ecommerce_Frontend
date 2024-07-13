import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchCategory } from '@/store/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useNavigation } from 'expo-router';

export default function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.category);
  const navigator = useNavigation();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  function handlePLP() {
    navigator.navigate('plp/index' as never);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop by Categories</Text>
        <TouchableOpacity onPress={handlePLP}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#1f1f1f" />
      ) : (
        <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {data.map((item, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{item?.Category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  loader: {
    marginTop: 20,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    marginRight: 10,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderStyle: "dashed"
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});
