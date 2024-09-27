import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import MovieItemDetail, {IMovies} from '../components/MovieItemDetail';

export default function HomeScreen() {
  const [movieData, setMovieData] = useState<IMovies[]>([]);
  const [searchDetail, setSearchDetail] = useState('');
  const fetchData = async (query: string) => {
    try {
      const baseUrl = 'https://omdbapi.com/';
      const apiKey = '7035c60c'; // 여기에 실제 API 키를 입력하세요
      const pageNumber = 1;
      const urlParams = new URLSearchParams({
        ...(query && {t: query}), // query가 비어 있지 않은 경우에만 t 매개변수를 추가
      });

      const url = `${baseUrl}?${urlParams.toString()}`;
      const res = await axios.get(url);
      console.log('###', url);
      console.log('Response data:', res.data);

      if (res.data.Response === 'True') {
        // 데이터가 올바를 경우에만 상태를 업데이트
        setMovieData([res.data]); // 단일 객체로 처리하므로 배열에 넣어줍니다
      } else {
        console.error('Error in API response:', res.data.Error);
        setMovieData([]); // 데이터가 없을 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // 버튼 핸들러
  const handlePress = () => {
    fetchData(searchDetail);
  };

  return (
    <View style={{backgroundColor: '#000'}}>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <TextInput
          placeholder="Input"
          value={searchDetail}
          onChangeText={text => setSearchDetail(text)}
          style={{
            flex: 4,
            padding: 10,
            backgroundColor: '#aaa',
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.button, styles.buttonColor]}>
          <Text>button</Text>
        </TouchableOpacity>
      </View>
      <View>
        {movieData.length > 0 ? (
          movieData.map(item => (
            <MovieItemDetail key={item.imdbID} item={item} />
          ))
        ) : (
          <Text style={{marginTop: 20, color: '#fff'}}>No Data Available</Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColor: {
    backgroundColor: '#ccc',
  },
});
