import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';
import { PRIMARY, WHITE, BLACK } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BOTTOM = 30;
const BUTTON_WIDTH = 60;

const InputFAB = ({ onInsert }) => {
  const [text, setText] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef();
  const windowWidth = useWindowDimensions().width;
  const { KeyboardHeight, setKeyboardHeight } = useState(BOTTOM);
  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current;

  const open = () => {
    setIsOpened(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current.focus();
    });
    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  const close = () => {
    if (isOpened) {
      setText('');
      setIsOpened(false);
      Animated.timing(inputWidth, {
        toValue: BUTTON_WIDTH,
        useNativeDriver: false,
        duration: 300,
      }).start(() => {
        inputRef.current.blur();
      });
      Animated.spring(buttonRotation, {
        toValue: 0,
        useNativeDriver: false,
        bounciness: 20,
      }).start();
    }
  };

  const onPressButton = () => {
    isOpened ? close() : open();
  };

  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const show = Keyboard.addListener('keyboardWillShow', (e) => {
        console.log('keyboardWillShow');
        setKeyboardHeight(e.endCoordinates.height + BOTTOM);
      });
      const hide = Keyboard.addListener('keyboardWillHide', () => {
        console.log('keyboardWillHide');
        setKeyboardHeight(BOTTOM);
      });

      return () => {
        show.remove();
        hide.remove();
      };
    }
  }, []);

  return (
    <>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          styles.shadow,
          { justifyContent: 'center', bottom: KeyboardHeight },
          isOpened && { width: windowWidth - 20 },
        ]}
      >
        <TextInput
          ref={inputRef}
          onBlur={close}
          value={text}
          onChangeText={(text) => setText(text)}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
          onSubmitEditing={onPressInsert}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          {
            bottom: KeyboardHeight,
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: PRIMARY.DARK },
            { bottom: KeyboardHeight },
          ]}
          onPress={onPressButton}
        >
          <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
        </Pressable>
      </Animated.View>
    </>
  );
};

InputFAB.propTypes = {
  onInsert: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
  position: {
    position: 'absolute',
    bottom: BOTTOM,
    right: 10,
  },

  shape: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
  },

  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH + 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputFAB;
