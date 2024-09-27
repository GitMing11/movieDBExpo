import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieDBList, {IMovies} from '../components/MovieDBList';
import {ItemSeparator} from '../shared/ListComponent';
import MovieDBList_Upcoming from '../components/MovieDBList_Upcoming';
import styled, {DefaultTheme} from 'styled-components/native';

const MainContainer = styled.View<{theme: DefaultTheme}>`
  background-color: ${(props: {theme: {mainBgColor: any}}) =>
    props.theme.mainBgColor};
`;
const UpcomingList = styled.FlatList``;
const HotList = styled.FlatList``;

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [movieData, setMovieData] = useState<IMovies[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingMovie, setUpcoming] = useState<IMovies[]>([]);
  const baseUrl = 'https://api.themoviedb.org/3/movie/';
  const endpoint_Bot = 'popular';
  const endpoint_Top = 'upcoming';
  const apiKey = 'dbda2a3558355cbb4e259e85a0dd6b98';
  const fetchData_Top = async () => {
    try {
      const pageNumber = Math.floor(Math.random() * 3) + 1;

      const urlParams = new URLSearchParams({
        api_key: apiKey,
        language: 'ko-KR',
        page: pageNumber.toString(), // 숫자를 문자열로 변환합니다.
      });

      const url = `${baseUrl}${endpoint_Top}?${urlParams.toString()}`;

      console.log(url); // 디버깅을 위해 URL을 로그로 출력합니다.

      const response = await axios.get(url);
      setUpcoming(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData_Bot = async () => {
    try {
      const pageNumber = Math.floor(Math.random() * 3) + 1;

      const urlParams = new URLSearchParams({
        api_key: apiKey,
        language: 'ko-KR',
        page: pageNumber.toString(), // 숫자를 문자열로 변환합니다.
      });

      const url = `${baseUrl}${endpoint_Bot}?${urlParams.toString()}`;

      console.log(url); // 디버깅을 위해 URL을 로그로 출력합니다.

      const response = await axios.get(url);
      setMovieData(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData_Top();
    fetchData_Bot();
  }, []);

  const getRefreshData = async () => {
    setRefreshing(true);
    await fetchData_Bot();
    setRefreshing(false);
  };
  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };
  return (
    <MainContainer>
      <Text style={[styles.titleText, {color: isDarkMode ? 'white' : 'black'}]}>
        인기 영화
      </Text>
      <FlatList
        /* FlatList에서 HotList로 바꾸면 style 적용 가능
      문제 -> item:any가 되어 문제가 생김 
      FlatList를 styled-components로 감싸면서 TypeScript가 item의 타입을 추론할 수 없음 */
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'white'}
          />
        }
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <Text style={{marginTop: 20, color: '#fff'}}>No Data Available</Text>
        }
        renderItem={({item}) => <MovieDBList item={item} />}
        keyExtractor={item => item.id.toString()}
        data={movieData}
        initialNumToRender={30}
        ListHeaderComponent={
          <View style={{height: 100, backgroundColor: 'rgba(255,255,255,0.6)'}}>
            <FlatList
              horizontal
              data={upcomingMovie}
              renderItem={({item}) => <MovieDBList_Upcoming item={item} />}
              keyExtractor={item => item.id.toString()}
              windowSize={30}
              initialNumToRender={30}
              ListHeaderComponent={
                <View>
                  <Text style={{color: 'white'}}></Text>
                </View>
              }
            />
          </View>
        }
      />
    </MainContainer>
  );
}
const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
});
