import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../navigations/types';
import auth from '../store/slices/auth';
import {useAppSelector} from '../store/hooks';

type ProfileSC = StackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({navigation, route}: ProfileSC) {
  // const {} = route.params;

  const selUserID = useAppSelector(state => state.auth_state.userid);
  const selUserPw = useAppSelector(state => state.auth_state.password);
  return (
    <View>
      <Text>Profile</Text>
      {/* <Text>{route.params.id}</Text> */}
      <Text>{selUserID}</Text>
      <Text>{selUserPw}</Text>
    </View>
  );
}
