import axios from 'axios';
import {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ItemSeparator} from '../shared/ListComponent';
import MovieItemList from '../components/MovieItemList';

interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster?: string;
}

export default function SearchScreen() {
  const [movieData, setMovieData] = useState<IMovies[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [pageInput, setPageInput] = useState(1);
  const [typeInput, setTypeInput] = useState('');

  const fetchData = async (query: string) => {
    try {
      let url = `https://omdbapi.com/?apikey=7035c60c`;
      if (searchInput != '') {
        url += `&s=${searchInput}`;
      }
      if (typeInput != '') {
        url += `&type=${typeInput}`;
      }
      if (pageInput > 1) {
        url += `&page=${pageInput}`;
      }
      const res = await axios.get(url);
      console.log('@@@@@@@@@@@res: ', res.data.Search);
      setMovieData(res.data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 버튼 핸들러
  const handlePress = () => {
    fetchData(searchInput);
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
          onPress={handlePress}
          style={[styles.button, styles.buttonColor]}>
          <Text>button</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <Text style={{marginTop: 20, color: '#fff'}}>No Data Available</Text>
        }
        renderItem={MovieItemList}
        keyExtractor={item => item.imdbID}
        data={movieData}
      />
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
