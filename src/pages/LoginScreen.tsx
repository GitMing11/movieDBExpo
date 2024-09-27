import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../navigations/types';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import auth, {setUserId, setUserPw, setUserReset} from '../store/slices/auth';
import {RootState} from '../store/store';
import {useIsFocused} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {InputNumber} from 'antd';
type LoginSC = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: LoginSC) {
  const [inputID, setInputID] = useState('');
  const [inputPassword, setinputPassword] = useState('');
  const isFocused = useIsFocused();
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    if (isFocused) reduxDispatch(setUserReset());
  }, [isFocused]);

  // console.log(navigation.getState());
  // console.log('@@@@@@@');

  // const selUserID = useAppSelector(state => state.auth_state.userid);
  // const selUserPw = useAppSelector(state => state.auth_state.password);
  const reduxDispatch = useAppDispatch();
  const login = () => {
    reduxDispatch(setUserId(inputID));
    reduxDispatch(setUserPw(inputPassword));
    console.log('#####', {inputID});
    console.log('#####', {inputPassword});
  };
  const selUserId = useAppSelector(state => state.auth_state.userid);
  const selUserPw = useAppSelector(state => state.auth_state.password);

  const {
    setValue,
    register,
    handleSubmit,
    formState: {errors},
    setError,
    clearErrors,
  } = useForm<{
    userId: string;
    userPw: string;
    phoneNum: string;
    result: {
      message: string | undefined;
    };
  }>();

  useEffect(() => {
    register('userId', {
      required: true,
    });
    register('userPw', {
      required: true,
    });
    register('phoneNum', {
      required: true,
    });
  }, [register]);
  const loginSubmit = (data: {
    userId: string;
    userPw: string;
    phoneNum: string;
    result: {
      message: string | undefined;
    };
  }) => {
    console.log('userid: ', data.userId);
    console.log('userpw: ', data.userPw);
    console.log(
      'phoneNum: ',
      data.phoneNum.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
    );
    var blankReg = /\s/g;
    var phoneNumReg = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;

    if (data.userId.length === 0) {
      // 안적으면 제출이 안 돼서 메세지가 안뜸
      return setError('userId', {message: '아이디 적어야함'});
    }
    if (data.userId.length < 4) {
      return setError('userId', {message: '아이디가 너무 짧아요'});
    }
    if (data.userPw.length < 4) {
      return setError('userPw', {message: '비밀번호가 너무 짧아요'});
    }
    if (data.userPw.match(blankReg)) {
      return setError('userPw', {message: '비밀번호 공백이 들어있어요'});
    }
    if (!(data.phoneNum.length == 10 || data.phoneNum.length == 11)) {
      return setError('phoneNum', {message: '전화번호가 맞지 않아요'});
    }
    if (!data.phoneNum.match(phoneNumReg)) {
      return setError('phoneNum', {message: '전화번호 형식에 맞지 않아요'});
    }
    if (!data.phoneNum.startsWith('0')) {
      return setError('phoneNum', {
        message: '0으로 시작하는 전화번호를 입력해 주세요',
      });
    }
  };
  // reduxDispatch(login);
  // navigation.navigate('TabNavigator');
  const clearError = (type: 'userId' | 'userPw' | 'phoneNum' | 'result') => {
    clearErrors(type);
  };

  return (
    <View style={styles.Container}>
      <View style={{width: '100%', height: 70, alignItems: 'center'}}>
        <TextInput
          style={styles.InputText}
          placeholder={'아이디'}
          // value={inputID}
          // onChangeText={text => setInputID(text)}
          // value={'userId'}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoComplete="email"
          keyboardType="ascii-capable"
          onChangeText={text => setValue('userId', text)}
          placeholderTextColor={'rgba(255,255,255,0.5)'}
          onFocus={() => clearError('userId')}
        />
        {errors.userId && (
          <View style={{width: '100%', height: 10}}>
            <Text style={{height: 20, color: 'red', paddingLeft: 20}}>
              {errors.userId.message}
            </Text>
          </View>
        )}
        <TextInput
          style={styles.InputText}
          placeholder={'패스워드'}
          secureTextEntry={isSecure}
          // value={inputPassword}
          // onChangeText={text => setinputPassword(text)}
          onChangeText={text => setValue('userPw', text)}
          placeholderTextColor={'rgba(255,255,255,0.5)'}
          onFocus={() => clearError('userPw')}
        />
        {errors.userPw && (
          <View style={{width: '100%', height: 10}}>
            <Text style={{height: 20, color: 'red', paddingLeft: 20}}>
              {errors.userPw.message}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 90,
            backgroundColor: 'white',
            margin: 10,
            width: 30,
            height: 30,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsSecure(prev => !prev)}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              lineHeight: 25,
              textAlign: 'center',
            }}>
            ◉
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.InputText}
          placeholder={'전화번호'}
          keyboardType="number-pad"
          onChangeText={text => setValue('phoneNum', text)}
          placeholderTextColor={'rgba(255,255,255,0.5)'}
          onFocus={() => clearError('phoneNum')}
        />
        {errors.phoneNum && (
          <View style={{width: '100%', height: 10}}>
            <Text style={{height: 20, color: 'red', paddingLeft: 20}}>
              {errors.phoneNum.message}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleSubmit(loginSubmit)}
          style={styles.LoginButton}>
          <Text style={{color: 'white'}}>Login</Text>
        </TouchableOpacity>

        <View style={{marginTop: 150}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TabNavigator');
            }}
            style={styles.Button}>
            <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {id: 'hihihi'});
            }}
            style={styles.Button}>
            <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
              Profile page
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            style={styles.Button}>
            <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
              Search page
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Animate')}
            style={styles.Button}>
            <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
              Animate page
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputText: {
    width: '90%',
    paddingLeft: 15,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: '#68798a',
    color: 'white',
  },
  LoginButton: {
    width: 150,
    height: 50,
    marginTop: 20,
    backgroundColor: '#294561',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    width: 150,
    height: 50,
    marginTop: 20,
    backgroundColor: '#7e9ebe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
