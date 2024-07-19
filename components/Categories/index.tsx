import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchCategory } from '@/store/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { router } from 'expo-router';

export default function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  function handlePLP() {
    console.log("router", router)
    router.push({
      pathname: "/plp" as any,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop by Categories</Text>
        <TouchableOpacity  onPress={handlePLP}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#1f1f1f" />
      ) : (
        <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {data.map((item, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard} onPress={handlePLP}>
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
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#333',
  },
  viewAll: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.9)',
    padding: 8
  },
  loader: {
    marginTop: 20,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10,
    borderRadius: 8,
    padding: 20,
    marginRight: 30,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 0,

  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f8f8f8'
  },
});
