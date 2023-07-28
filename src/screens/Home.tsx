import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import type {BookData, DetailScreenNavigationProp} from '../utils/interfaces';
import {API} from '../utils/constant';
import Book from '../components/Book';
import {useMain} from '../contexts/MainContext';

const Home = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const {isUpdated} = useMain();

  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookData[]>();

  const loadBooks = async () => {
    try {
      setLoading(true);
      const resp = await axios.get<BookData[]>(API);
      setBooks(resp.data);
    } catch (err) {
      console.error('Error');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, [isUpdated]);

  const onNew = async () => {
    navigation.navigate('Detail', {bookId: undefined});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 24}}>
        <Text style={styles.headerText}>Books</Text>
      </View>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={48} color={'#000'} />
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={onNew}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>New</Text>
            </View>
          </TouchableOpacity>
          {books ? (
            <ScrollView>
              {books.map(book => (
                <Book key={`book-${book._id}`} data={book} />
              ))}
            </ScrollView>
          ) : null}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 36,
  },
  headerText: {
    fontSize: 32,
    color: 'black',
  },
  button: {
    backgroundColor: '#002B56',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Home;
