import { Image, StyleSheet, View, Keyboard, Alert } from 'react-native';
import Input, {
  KeyboardTypes,
  ReturnKeyTypes,
  IconNames,
} from '../components/Input';
import { useContext, useState, useRef, useEffect } from 'react';
import Button from '../components/Buttons';
import { signIn } from '../api/auth';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import { useUserContext } from '../contexts/UserContext';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    // 인자를 받지 않도록 수정
    if (!isLoading && !disabled) {
      try {
        setIsLoading(true);
        const data = await signIn(email, password);
        console.log('111', data); // 성공 로그
        setUser(data); // 유저 설정
      } catch (error) {
        console.log('222', typeof error); // 에러 타입 확인
        const errorMessage =
          typeof error === 'string' ? error : JSON.stringify(error);
        Alert.alert('로그인 실패', errorMessage, [
          { text: '확인', onPress: () => setIsLoading(false) },
        ]);
      } finally {
        setIsLoading(false); // 최종적으로 로딩 상태를 false로 설정
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/main.png')} style={styles.image} />
      <Input
        title={'이메일'}
        placeholder="myemail@test.com"
        keyboardType={KeyboardTypes.EMAIL}
        returnKeyType={ReturnKeyTypes.NEXT}
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        iconName={IconNames.EMAIL}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <Input
        ref={passwordRef}
        title={'비밀번호'}
        returnKeyType={ReturnKeyTypes.DONE}
        secureTextEntry
        value={password}
        onChangeText={(password) => setPassword(password.trim())}
        iconName={IconNames.PASSWORD}
        onSubmitEditing={onSubmit}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="로그인"
          onPress={onSubmit} // setUser 인자를 전달하지 않음
          disabled={disabled}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
