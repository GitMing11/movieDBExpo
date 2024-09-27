import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { RootStackParamList } from "../navigations/types";

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

export default function MovieDBList({ item }: { item: IMovies }) {
  const [showFulloverview, setShowFulloverview] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // tmdb detail 사이트로 이동
  // const toDetail = (id: number) => {
  //   console.log('Movie ID:', id); // ID를 확인하기 위한 로그};
  //   const tmdbDetailUrl = `https://www.themoviedb.org/movie/${item.id}`; // TMDB 디테일 페이지 URL
  //   Linking.openURL(tmdbDetailUrl).catch(err =>
  //     console.error('Failed to open URL:', err),
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.originalTitle}>{item.original_title}</Text>
        <Text style={styles.language}>언어: {item.original_language}</Text>
        {/* overview with conditional truncation */}
        <Text style={styles.detail}>
          {" "}
          {showFulloverview
            ? item.overview
            : item.overview.length > 100
            ? `${item.overview.substring(0, 100)}...`
            : item.overview}
        </Text>

        {/* Show more/less button */}
        {item.overview.length > 100 && (
          <TouchableOpacity
            onPress={() => setShowFulloverview((prev) => !prev)}
          >
            <Text style={styles.showMore}>
              {showFulloverview ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.releaseDate}>{item.release_date}</Text>
      </View>
      {/* <TouchableOpacity onPress={() => toDetail(Number(item.id))}> */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.posterPath}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
    margin: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  originalTitle: {
    color: "#ddd",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 5,
  },
  language: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 5,
  },
  releaseDate: {
    color: "#bbb",
    fontSize: 12,
  },
  posterPath: {
    width: 200,
    height: 300,
  },
  detail: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 3,
  },
  showMore: {
    color: "#1e90ff",
    fontSize: 14,
    marginTop: 5,
  },
});
