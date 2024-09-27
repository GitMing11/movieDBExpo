import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './types';
import HomeScreen from '../pages/HomeScreen';
import LoginScreen from '../pages/LoginScreen';
import ProfileScreen from '../pages/ProfileScreen';
import SearchScreen from '../pages/SearchScreen';
import AnimateScreen from '../pages/AnimateScreen';

const Tabs = createBottomTabNavigator<RootTabParamList>();

export default function TabNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Animate" component={AnimateScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
    // <Tabs.Navigator screenOptions={{headerShown: false}}>
    //   <Tabs.Screen
    //     name={'HomeTab'}
    //     options={{
    //       tabBarIcon: ({focused, color, size}) => (
    //         <TabIcon
    //           iconName={'home'}
    //           focused={focused}
    //           color={focused ? metaStyle.blue : '#A9A9A9'}
    //           size={ICON_SIZE}
    //         />
    //       ),
    //       tabBarLabel: '홈',
    //     }}>
    //     {() => <StackNav screenName="HomeTab" />}
    //   </Tabs.Screen>
    //   <Tabs.Screen
    //     name={'CameraTab'}
    //     component={View}
    //     listeners={({navigation}) => {
    //       return {
    //         tabPress: async e => {
    //           e.preventDefault();

    //           if (!hasPermission) {
    //             const granted = await requestPermission();
    //             console.log('granted: ', granted);
    //             if (!granted) {
    //               Alert.alert(
    //                 '카메라 권한',
    //                 '해당 기능을 사용하기 위해서는 카메라 권한이 필요해요',
    //                 [
    //                   {
    //                     text: '거절',
    //                     style: 'cancel',
    //                   },
    //                   {
    //                     text: '설정 열기',
    //                     onPress: openSettings,
    //                   },
    //                 ],
    //               );
    //             } else {
    //               navigation.navigate('UploadTab');
    //             }
    //           } else {
    //             navigation.navigate('UploadTab');
    //           }
    //           // navigation.navigate("UploadTab");
    //         },
    //       };
    //     }}
    //     options={{
    //       tabBarIcon: ({focused, color, size}) => (
    //         <TabIcon
    //           iconName={'camera'}
    //           focused={focused}
    //           color={focused ? metaStyle.blue : '#A9A9A9'}
    //           size={ICON_SIZE}
    //         />
    //       ),
    //       tabBarLabel: '카메라',
    //     }}
    //   />
    //   {/* <Tabs.Screen
    //     name={"AlbumTab"}
    //     options={{
    //       tabBarIcon: ({ focused, color, size }) => (
    //         <TabIcon
    //           iconName={"albums"}
    //           focused={focused}
    //           color={focused ? metaStyle.blue : "#A9A9A9"}
    //           size={ICON_SIZE}
    //         />
    //       ),
    //       tabBarLabel: "앨범",
    //     }}
    //   >
    //     {() => <StackNav screenName="AlbumTab" />}
    //   </Tabs.Screen> */}
    //   <Tabs.Screen
    //     name={'UserInfoTab'}
    //     options={{
    //       tabBarIcon: ({focused, color, size}) => (
    //         <TabIcon
    //           iconName={'person'}
    //           focused={focused}
    //           color={focused ? metaStyle.blue : '#A9A9A9'}
    //           size={ICON_SIZE}
    //         />
    //       ),
    //       tabBarLabel: '마이',
    //     }}>
    //     {() => <StackNav screenName="UserInfoTab" />}
    //   </Tabs.Screen>
    // </Tabs.Navigator>
  );
}
