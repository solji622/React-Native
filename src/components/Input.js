import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, GRAY, PRIMARY } from '../colors';
import { useState, forwardRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const keyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

export const IconNames = {
  EMAIL: 'email',
  PASSWORD: 'lock',
};

const Input = ({ title, placeholder, value, iconName, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          isFocused && styles.focusedTitle,
          value && styles.hasValueTitle,
        ]}
      >
        {title}
      </Text>

      <View>
        <TextInput
          {...props}
          ref={ref}
          style={[
            style.input,
            isFocused && styles.focusedInput,
            value && styles.hasValueInput,
          ]}
          placeholder={placeholder ?? title}
          placeholderTextColor={GRAY.DEFAUIT}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={() => {
              switch (true) {
                case isFocused:
                  return PRIMARY.DEFAUIT;
                case !!value:
                  return BLACK;
                default:
                  return GRAY.DEFAUIT;
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

Input.defaultProps = {
  keyboardType: keyboardTypes.DEFAULT,
  returnKeyType: ReturnKeyTypes.DONE,
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf(Object.values(keyboardTypes)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  hasValueTitle: {
    color: BLACK,
  },

  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },

  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  title: {
    marginBottom: 4,
    color: GRAY.DEFAUIT,
  },

  focusedTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAUIT,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    borderColor: GRAY.DEFAUIT,
    paddingLeft: 30,
  },

  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },

  focusedInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAUIT,
    color: PRIMARY.DEFAUIT,
  },
});

export default Input;
