import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type StackParamList = {
  Home: undefined;
  Detail: {bookId: string | undefined};
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Home'
>;

export type DetailScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Detail'
>;

export type DetailScreenRouteProp = RouteProp<StackParamList, 'Detail'>;

export interface Book {
  name: string;
  authors: string[];
  description: string;
  publishedAt: string;
  updatedAt: string;
  isFavourite: boolean;
  coverImageUrl: string;
  rating: number;
}

export interface BookData extends Book {
  _id: string;
}
