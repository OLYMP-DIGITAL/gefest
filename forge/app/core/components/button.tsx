import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Button = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress || undefined}>
      <Text style={styles.buttonText}>{title ?? 'Button'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#D43238',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Button;
