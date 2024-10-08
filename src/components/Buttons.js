import { ImageBackground, Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY, WHITE } from '../colors';

const Button = ({ title, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: PRIMARY.DARK },
        disabled && { backgroundColor: PRIMARY.LIGHT, opacity: 0.6 },
      ]}
      disabled={disabled} // true로 적용되면 버튼 클릭해도 함수 호출 XXX
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAUIT,
  },

  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Button;
