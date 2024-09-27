import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, Text, View} from 'react-native';
import {RootStackParamList} from '../navigations/types';
import {useAppSelector} from '../store/hooks';
import MovieDBDetail from '../components/MovieDBDetail';
import {useEffect, useState} from 'react';

type DetailSC = StackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({navigation, route}: DetailSC) {
  const {id} = route.params; // 'id'를 가져옵니다.
  const [movieData, setMovieData] = useState(null);
  const apiKey = 'dbda2a3558355cbb4e259e85a0dd6b98'; // 여기에 실제 API 키를 입력하세요.

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`,
        );
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [id]);
  if (!movieData) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <MovieDBDetail item={movieData} />
    </View>
  );
}
