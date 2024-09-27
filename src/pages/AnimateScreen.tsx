import {StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  LayoutChangeEvent,
  SafeAreaView,
} from 'react-native';
import {RootStackParamList} from '../navigations/types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
  withDecay,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import React from 'react';

type AnimateSC = StackScreenProps<RootStackParamList, 'Animate'>;

//Timing
const TAB_WIDTH = 125;
const TABS = ['Home', 'Search', 'Profile'];

//Spring
const INITIAL_OFFSET = 105;
const SIZE = 150;
const MARGIN = 30;
const LEFT_BOUNDARY = 330;
const RIGHT_BOUNDARY = -330;

//Decay
const SIZE2 = 120;
const BOUNDARY_OFFSET = 50;

const items = [
  {color: '#FFE780'},
  {color: '#87CCE8'},
  {color: '#FFA3A1'},
  {color: '#B1DFD0'},
];

export default function AnimateScreen({navigation, route}: AnimateSC) {
  const offset = useSharedValue<number>(-TAB_WIDTH);
  const offset2 = useSharedValue<number>(INITIAL_OFFSET);
  const offset3 = useSharedValue<number>(0);
  const pressed = useSharedValue<boolean>(false);
  const width = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
    transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}],
  }));
  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [{translateX: offset2.value}],
  }));
  const animatedStyles3 = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
    transform: [{translateX: offset3.value}],
  }));

  const handlePress = (tab: string) => {
    const newOffset = (() => {
      switch (tab) {
        case 'Home':
          return -TAB_WIDTH;
        case 'Search':
          return 0;
        case 'Profile':
          return TAB_WIDTH;
        default:
          return -TAB_WIDTH;
      }
    })();

    offset.value = withTiming(newOffset);
  };

  const advanceBy = (position: number) => {
    const previousOffset = offset2.value;
    if (
      (previousOffset < LEFT_BOUNDARY && position === -1) ||
      (previousOffset > RIGHT_BOUNDARY && position === 1)
    ) {
      const newOffset = offset2.value + (SIZE + 2 * MARGIN) * -position;
      offset2.value = withSpring(newOffset, {
        restDisplacementThreshold: 5,
        restSpeedThreshold: 5,
      });
    }
  };
  const reset = () => {
    offset2.value = withSpring(0, {
      mass: 5,
      damping: 50,
      restDisplacementThreshold: 5,
      restSpeedThreshold: 5,
    });
  };
  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const pan = Gesture.Pan()
    .onChange(event => {
      pressed.value = true;
      offset3.value += event.changeX;
    })
    .onFinalize(event => {
      offset3.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [
          -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ],
      });
      pressed.value = false;
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            {
              height: 120,
              width: 120,
              borderRadius: 500,
            },
            animatedStyles,
          ]}
        />
      </GestureDetector> */}
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box2, animatedStyles3]} />
        </GestureDetector>
      </View>
      {/* <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            style={
              i !== TABS.length - 1 ? [styles.tab, styles.divider] : styles.tab
            }
            onPress={() => handlePress(tab)}>
            <Text style={[styles.tabLabel, styles.textColor]}>{tab}</Text>
          </Pressable>
        ))}
      </View>
      <Animated.View style={[styles.animatedBorder, animatedStyles]} />

      <View style={styles.buttonWrapper}>
        <Pressable
          style={[styles.button, styles.previous]}
          onPress={() => advanceBy(-1)}>
          <Text style={styles.buttonItem}>{'<'}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.next]}
          onPress={() => advanceBy(1)}>
          <Text style={styles.buttonItem}>{'>'}</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            styles.reset,
            pressed ? styles.buttonPressed : null, // pressed 스타일 추가
          ]}
          onPress={reset}>
          <Text style={styles.buttonItem}>R</Text>
        </Pressable>
      </View>
      <Animated.View style={[styles.row, animatedStyles2]}>
        {items.map(item => (
          <View
            key={item.color}
            style={{...styles.box, backgroundColor: item.color}}
          />
        ))}
      </Animated.View> */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={styles.Button}>
        <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
          Search page
        </Text>
      </TouchableOpacity> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: TAB_WIDTH,
  },
  tabLabel: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: '#4f4f4f',
  },
  animatedBorder: {
    height: 8,
    width: 64,
    backgroundColor: '#008585',
    borderRadius: 20,
  },
  textColor: {color: '#2f2f2f'},
  buttonWrapper: {
    position: 'absolute',
    width: SIZE,
    zIndex: 1,
  },
  box: {
    height: SIZE,
    width: SIZE,
    borderRadius: 5,
    marginHorizontal: MARGIN,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    position: 'absolute',
    width: SIZE / 3,
    height: SIZE / 3,
    borderRadius: SIZE,
    backgroundColor: '#ccc',
    borderColor: '#fff',
    borderWidth: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    top: 58,
  },
  buttonItem: {
    color: '#666',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    paddingBottom: 2,
  },
  previous: {
    left: -40,
  },
  next: {
    right: -40,
  },
  reset: {
    right: 50,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // 화면 아래로 정렬
  },
  box2: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
});
