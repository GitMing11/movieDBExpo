import axios from 'axios';
import {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ItemSeparator} from '../shared/ListComponent';
import MovieDBSearchList, {IMovies} from '../components/MovieDBSearchList';
import {useFocusEffect} from '@react-navigation/native';

export default function SearchScreen() {
  const searchRef = useRef<FlatList>(null);
  const [movieData, setMovieData] = useState<IMovies[]>();
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const baseUrl = 'https://api.themoviedb.org/3/search/movie';
  const apiKey = 'dbda2a3558355cbb4e259e85a0dd6b98';
  const language = 'ko-KR';
  // searchData - 검색
  // fetchData - 리스트
  const scrollToIndex = () => {
    searchRef.current?.scrollToIndex({index: 0});
  };
  const searchData = async () => {
    if (!searchInput.trim()) {
      setError('Please enter a search term');
      return;
    }
    try {
      let url = `${baseUrl}?api_key=${apiKey}&language=${language}&query=${encodeURIComponent(
        searchInput,
      )}`;
      const res = await axios.get(url);
      console.log('@url@', url);

      setMovieData(res.data.results);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
    scrollToIndex();
  };

  const fetchData = async (page: number) => {
    setError(null);
    try {
      let url = `${baseUrl}?api_key=${apiKey}&language=${language}&query=${encodeURIComponent(
        searchInput,
      )}`;
      if (page) {
        setCurrentPage(page);
        url += `&page=${page}`;
      }
      const res = await axios.get(url, {
        params: {limit: page ? page * 10 : 10},
      });
      console.log('@url@', url);

      setMovieData(prevData => {
        const existingIds = new Set(prevData?.map(movie => movie.id));
        const newMovies = res.data.results.filter(
          (movie: IMovies) => !existingIds.has(movie.id),
        );
        return [...(prevData || []), ...newMovies];
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };
  const getRefreshData = async () => {
    setRefreshing(true);
    await fetchData(currentPage);
    setRefreshing(false);
  };
  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'white'}
        />
      }
      contentContainerStyle={{flex: 0.52}}
      style={{backgroundColor: '#000'}}>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <TextInput
          placeholder="Input"
          value={searchInput}
          onChangeText={text => setSearchInput(text)}
          style={{
            flex: 4,
            padding: 10,
            backgroundColor: '#aaa',
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <TouchableOpacity
          onPress={searchData}
          style={[styles.button, styles.buttonColor]}>
          <Text>button</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        ref={searchRef}
        horizontal
        onEndReached={() => fetchData(currentPage + 1)}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <Text style={{marginTop: 20, color: '#fff'}}>No Data Available</Text>
        }
        renderItem={({item}) => <MovieDBSearchList item={item} />}
        keyExtractor={(item, index) => `${item.id}-${currentPage}-${index}`}
        data={movieData}
        initialScrollIndex={0}
        windowSize={30}
        initialNumToRender={30}
        //numColumns={3}
      />
    </ScrollView>
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
  errorText: {
    color: '#ff4d4d',
    textAlign: 'center',
    marginVertical: 10,
  },
});
