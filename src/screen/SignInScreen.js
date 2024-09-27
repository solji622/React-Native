import { Image, StyleSheet, Text, View } from 'react-native';
import Input, {
  KeyboardTypes,
  ReturnKeyTypes,
  IconNames,
} from '../components/Input';
import { useState, useRef } from 'react';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/test.png')} style={styles.Image} />

      <Input
        title={'이메일'}
        placeholder="test@email.com"
        keyboardType={KeyboardTypes.EMAIL}
        returnKeyType={ReturnKeyTypes.NEXT}
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        IconName={IconNames.EMAIL}
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
