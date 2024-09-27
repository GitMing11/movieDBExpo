import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../navigations/types';

export interface IMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function MovieDBSearchList({item}: {item: IMovies}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {width: screenWidth} = Dimensions.get('window');
  return (
    <View style={[styles.container, {width: screenWidth}]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.originalTitle}>{item.original_title}</Text>
        <Text style={styles.language}>언어: {item.original_language}</Text>
        {/* overview with conditional truncation */}
        <Text style={styles.releaseDate}>{item.release_date}</Text>
        <Text style={styles.voteAverage}>{`평균 ${item.vote_average}`}</Text>
        <Text style={styles.popularity}>{`인기 ${item.popularity}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
          style={styles.posterPath}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    margin: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  originalTitle: {
    color: '#ddd',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  language: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  releaseDate: {
    color: '#bbb',
    fontSize: 12,
  },
  voteAverage: {
    color: '#f39c12',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  popularity: {
    color: '#3498db',
    fontSize: 12,
    fontWeight: 'bold',
  },
  posterPath: {
    width: 200,
    height: 300,
    backgroundColor: 'black',
  },
  showMore: {
    color: '#1e90ff',
    fontSize: 14,
    marginTop: 5,
  },
});
