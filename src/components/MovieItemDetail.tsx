import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export interface IMovies {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  imdbID: string;
  Plot: string;
  Type: 'movie' | 'series' | 'episode';
  Poster?: string;
}

export default function MovieItemDetail({item}: {item: IMovies}) {
  const [showFullPlot, setShowFullPlot] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.Title}</Text>
      {item.Poster && (
        <Image source={{uri: item.Poster}} style={styles.poster} />
      )}
      <Text style={styles.detail}>Year: {item.Year}</Text>
      <Text style={styles.detail}>Rated: {item.Rated}</Text>
      <Text style={styles.detail}>Released: {item.Released}</Text>
      <Text style={styles.detail}>Runtime: {item.Runtime}</Text>
      <Text style={styles.detail}>Genre: {item.Genre}</Text>
      <Text style={styles.detail}>Type: {item.Type}</Text>
      {/* Plot with conditional truncation */}
      <Text style={styles.detail}>
        Plot:{' '}
        {showFullPlot
          ? item.Plot
          : item.Plot.length > 50
          ? `${item.Plot.substring(0, 50)}...`
          : item.Plot}
      </Text>

      {/* Show more/less button */}
      {item.Plot.length > 100 && (
        <TouchableOpacity onPress={() => setShowFullPlot(prev => !prev)}>
          <Text style={styles.showMore}>
            {showFullPlot ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  detail: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 3,
    textAlign: 'center',
  },
  showMore: {
    color: '#1e90ff',
    fontSize: 14,
    marginTop: 5,
  },
});
