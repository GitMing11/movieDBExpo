import {View, Text, Image} from 'react-native';
import React from 'react';

interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster?: string;
}

export default function MovieItemList({item}: {item: IMovies}) {
  return (
    <View
      style={{
        padding: 5,
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#fff',
          flexShrink: 1,
        }}>
        {item.Title}
      </Text>
      {item.Poster && (
        <Image source={{uri: item.Poster}} style={{width: 200, height: 300}} />
      )}
      <View style={{width: '100%'}}>
        <Text
          style={{
            color: '#fff',
            alignItems: 'stretch',
          }}>
          | {item.Type}
        </Text>
      </View>
    </View>
  );
}
