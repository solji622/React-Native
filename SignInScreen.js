import { Image, StyleSheet, View, Keyboard } from 'react-native';
import Input, {
  KeyboardTypes,
  ReturnKeyTypes,
  IconNames,
} from '../components/Input';
import { useState, useRef, useEffect } from 'react';
import Button from '../components/Buttons';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const { disabled, setDisabled } = useState(true);

  useEffect(() => {
    console.log('always: ', email, password);
  });

  useEffect(() => {
    console.log('first rendering: ', email, password);
  }, []);

  useEffect(() => {
    console.log('only email: ', email, password);
  }, [email]);

  const onSubmit = () => {
    Keyboard.dismiss(); // 자동으로 키보드가 내려가는 기능
    console.log(email, password);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/main.png')} style={styles.Image} />

      <Input
        title={'이메일'}
        placeholder="test@test.com"
        keyboardType={KeyboardTypes.EMAIL}
        returnKeyType={ReturnKeyTypes.NEXT}
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        IconName={IconNames.EMAIL}
        onSubmitEditing={onSubmit}
      />
      <Input
        ref={passwordRef}
        title={'비밀번호'}
        returnKeyType={ReturnKeyTypes.DONE}
        secureTextEntry
        value={password}
        onChangeText={(password) => setPassword(password.trim())}
        IconName={IconNames.PASSWORD}
      />
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={onSubmit} disabled={disabled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifycontent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: 200,
    height: 200,
  },
});

export default SignInScreen;
