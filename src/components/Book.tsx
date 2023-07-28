import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';

import type {BookData, DetailScreenNavigationProp} from '../utils/interfaces';
import {HeartIcon} from '../icons/Heart';
import {API} from '../utils/constant';
import axios from 'axios';

interface BookProps {
  data: BookData;
}

const Book: FC<BookProps> = ({data}) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const [isFavourite, setIsFavourite] = useState<boolean>();

  useEffect(() => {
    setIsFavourite(data.isFavourite);
  }, [data.isFavourite]);

  const onEdit = () => {
    navigation.navigate('Detail', {bookId: data._id});
  };

  const onFavourite = async () => {
    try {
      const {_id, ...savedData} = data;
      savedData.isFavourite = !isFavourite;
      await axios.put(`${API}/${_id}`, savedData);
      setIsFavourite(savedData.isFavourite);
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: data.coverImageUrl}} />
      <View style={styles.bookInfoContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.bookName} numberOfLines={1}>
            {data.name}
          </Text>
          <AirbnbRating
            selectedColor="#002B56"
            size={16}
            showRating={false}
            isDisabled={true}
            defaultRating={data.rating}
          />
        </View>
        <View style={styles.editContainer}>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFavourite}>
            <HeartIcon fill={isFavourite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 93,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 24,
  },
  subContainer: {
    alignItems: 'flex-start',
  },
  image: {
    width: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    marginBottom: 0,
  },
  bookInfoContainer: {
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  bookName: {
    fontSize: 20,
    color: '#000',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  editText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#002B56',
  },
});
export default Book;
