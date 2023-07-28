import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import axios from 'axios';

import type {
  Book,
  BookData,
  DetailScreenRouteProp,
  HomeScreenNavigationProp,
} from '../utils/interfaces';
import {API} from '../utils/constant';
import {HeartIcon} from '../icons/Heart';
import {useMain} from '../contexts/MainContext';
import moment from 'moment';

const initialBookData = {
  name: '',
  description: '',
  authors: [],
  publishedAt: '',
  updatedAt: '',
  isFavourite: false,
  coverImageUrl: '',
  rating: 0,
};

const Detail = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<DetailScreenRouteProp>();
  const bookId = route.params.bookId;
  const {setIsUpdated} = useMain();

  const [data, setData] = useState<Book>({...initialBookData});
  const [loading, setLoading] = useState<boolean>(false);
  const [processingUps, setprocessingUps] = useState<boolean>(false);
  const [processingDel, setprocessingDel] = useState<boolean>(false);

  const loadDetail = useCallback(async (detailBookId: string) => {
    setLoading(true);
    const res = await axios.get<BookData>(`${API}/${detailBookId}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {_id, ...savedData} = res.data;
    setData(savedData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (bookId) {
      loadDetail(bookId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  const onChangeText = (key: keyof BookData) => (text: string) => {
    setData({...data, [key]: text});
  };

  const onChangeAuthor = (text: string) => {
    const authors = text.split(',');
    setData({...data, authors: authors});
  };

  const onChangeRating = (rating: number) => {
    setData({...data, rating});
  };

  const onChangeFavourite = () => {
    setData({...data, isFavourite: !data.isFavourite});
  };

  const validate = () => {
    if (
      !data.name ||
      !data.description ||
      !data.publishedAt ||
      !data.authors.length
    ) {
      return false;
    }

    if (!moment(data.publishedAt, 'DD-MM-YYYY').isValid()) {
      return false;
    }
    return true;
  };

  const onUpdate = async () => {
    if (!validate()) {
      return;
    }

    const savedData = {...data};
    savedData.updatedAt = moment().format('DD-MM-YYYY');

    try {
      setprocessingUps(true);
      if (bookId) {
        await axios.put(`${API}/${bookId}`, savedData);
      } else {
        savedData.coverImageUrl = `https://source.unsplash.com/random/?book-cover&${Math.floor(
          Math.random() * 100000,
        )}`;
        await axios.post(API, savedData);
        setData({...initialBookData});
      }
      setIsUpdated();
    } catch (err) {
      console.error(err);
    }
    setprocessingUps(false);
  };

  const onDelete = async () => {
    try {
      setprocessingDel(true);
      if (bookId) {
        await axios.delete(`${API}/${bookId}`);
      }
      setIsUpdated();
      setprocessingDel(false);
      navigation.navigate('Home');
    } catch (err) {
      setprocessingDel(false);
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Edit book</Text>
        <TouchableOpacity onPress={onChangeFavourite}>
          <View style={styles.heartContainer}>
            <HeartIcon width={32} height={30} fill={data.isFavourite} />
          </View>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={48} color={'#000'} />
        </View>
      ) : (
        <View>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.inputBox}
            value={data.name}
            onChangeText={onChangeText('name')}
          />
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            numberOfLines={4}
            style={[styles.inputBox, styles.descInputBox]}
            value={data.description}
            multiline={true}
            textAlignVertical="top"
            onChangeText={onChangeText('description')}
          />
          <Text style={styles.inputLabel}>Authors</Text>
          <TextInput
            style={styles.inputBox}
            value={data.authors.join(',')}
            onChangeText={onChangeAuthor}
          />
          <Text style={styles.inputLabel}>Publish date</Text>
          <TextInput
            style={styles.inputBox}
            value={data.publishedAt}
            onChangeText={onChangeText('publishedAt')}
          />
          <View style={styles.ratingContainer}>
            <Text style={styles.inputLabel}>Rating</Text>
            <AirbnbRating
              selectedColor="#002B56"
              size={24}
              showRating={false}
              onFinishRating={onChangeRating}
              defaultRating={data.rating}
            />
          </View>
          <TouchableOpacity
            onPress={onUpdate}
            disabled={processingDel || processingUps}>
            <View style={styles.button}>
              {processingUps ? (
                <ActivityIndicator size={48} color={'#fff'} />
              ) : (
                <Text style={styles.buttonText}>
                  {bookId ? 'Update' : 'Create'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          {bookId && (
            <TouchableOpacity
              onPress={onDelete}
              disabled={processingDel || processingUps}>
              <View style={[styles.button, styles.delButton]}>
                {processingDel ? (
                  <ActivityIndicator size={48} color={'#fff'} />
                ) : (
                  <Text style={styles.buttonText}>Delete</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 36,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginBottom: 36,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  headerText: {
    fontSize: 32,
    color: 'black',
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'black',
    marginLeft: 6,
    marginBottom: 6,
  },
  inputBox: {
    borderWidth: 1,
    paddingHorizontal: 12,
    borderColor: '#D0D4D9',
    borderRadius: 12,
    color: 'black',
    marginBottom: 16,
    height: 48,
  },
  descInputBox: {
    height: 104,
  },
  button: {
    backgroundColor: '#002B56',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  delButton: {
    backgroundColor: '#f00',
    marginTop: 12,
  },
});

export default Detail;
