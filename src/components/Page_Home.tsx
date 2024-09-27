import axios from 'axios';
import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}
export default function Page_Home() {
  // const renderItem = ({item}) => {
  //   return (
  //     <View>
  //       <View>

  //       </View>
  //     </View>
  //   )
  // }
  const [movieData, setMovieData] = useState<IMovies[]>([]);

  const fetchData = async () => {
    try {
      let url = `https://omdbapi.com/?apikey=7035c60c&s=avengers`;
      // if (searchInput != "") {
      //   url += `&s=${searchInput}`;
      // }
      // if (typeInput != "") {
      //   url += `&type=${typeInput}`;
      // }
      // if (pageInput > 1) {
      //   url += `&page=${pageInput}`;
      // }
      //axios
      // await axios
      //   .get(`https://omdbapi.com/?apikey=7035c60c&s=${query}`)
      // .then((res) => {
      //   console.log("@@@@@@@@@@@res: ", res.data);
      //   setMovieData(res.data.Search || []);
      // });
      const res = await axios.get(url);
      console.log('@@@@@@@@@@@res: ', res.data.Search);
      setMovieData(res.data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();

  return (
    <ScrollView horizontal style={{height: '100%'}}>
      <Text>Test Component</Text>
      {movieData.length > 0 ? (
        <View style={{flexDirection: 'row'}}>
          {movieData.map((data, index) => (
            <View key={index}>
              <Image
                source={{uri: data.Poster}}
                style={{width: 200, height: 450}}
              />
              <View>
                <Text>| {data.Type}</Text>
              </View>
              <Text>{data.Title}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text>No results found</Text>
        </View>
      )}
    </ScrollView>
  );
}
