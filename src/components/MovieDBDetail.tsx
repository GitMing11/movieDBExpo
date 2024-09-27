import {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface IMoviesDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<{id: number; name: string}>;
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{iso_3166_1: string; name: string}>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function MovieDBDetail({item}: {item: IMoviesDetail}) {
  const [showFulloverview, setShowFulloverview] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.originalTitle}>{item.original_title}</Text>
      <View style={styles.separator} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}>
        {item.poster_path && (
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
            style={styles.posterPath}
            resizeMode="cover"
          />
        )}
        {item.backdrop_path && (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
            }}
            style={styles.backdropPath}
            resizeMode="cover"
          />
        )}
      </ScrollView>
      <View style={styles.separator} />
      <View style={styles.textContainer}>
        <Text style={styles.language}>언어: {item.original_language}</Text>
        <Text style={styles.vote}>Rating: {`${item.vote_average}`}</Text>
        <Text style={styles.voteCount}>
          Vote Count: {`${item.vote_count || 0}`}
        </Text>
        <Text style={styles.popularity}>
          Popularity: {`${item.popularity}`}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.adult}>Adult: {item.adult ? 'Yes' : 'No'}</Text>
        <Text style={styles.video}>Video: {item.video ? 'Yes' : 'No'}</Text>
        <Text style={styles.genres}>
          Genres:{' '}
          {item.genres
            ? item.genres.map(genre => genre.name).join(', ')
            : 'No genres available'}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.detail}>
          {showFulloverview
            ? item.overview
            : item.overview.length > 100
            ? `${item.overview.substring(0, 100)}...`
            : item.overview}
        </Text>
        {item.overview.length > 100 && (
          <TouchableOpacity onPress={() => setShowFulloverview(prev => !prev)}>
            <Text style={styles.showMore}>
              {showFulloverview ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.releaseDate}>{item.release_date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#343434',
    borderRadius: 12,
    margin: 5,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    paddingVertical: 0,
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
    width: '100%',
  },
  title: {
    color: '#ecf0f1',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  originalTitle: {
    color: '#bdc3c7',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  language: {
    color: '#95a5a6',
    fontSize: 14,
    marginBottom: 5,
  },
  separator: {
    height: 3,
    backgroundColor: '#444',
    marginVertical: 10,
  },
  releaseDate: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 5,
  },
  posterPath: {
    width: 150,
    height: 225,
    marginRight: 10,
    borderWidth: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
  },
  backdropPath: {
    width: 300,
    height: 225,
    marginRight: 10,
    borderWidth: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
  },
  detail: {
    color: '#ecf0f1',
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
  showMore: {
    color: '#1abc9c',
    fontSize: 14,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  vote: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffcc00',
    marginBottom: 5,
  },
  voteCount: {
    color: '#ffcc00',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  popularity: {
    color: '#1abc9c',
    fontSize: 14,
    marginBottom: 5,
  },

  adult: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 5,
  },

  video: {
    color: '#3498db',
    fontSize: 14,
    marginBottom: 5,
  },

  genres: {
    color: '#ecf0f1',
    fontSize: 14,
    marginBottom: 5,
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 8,
  },
});
