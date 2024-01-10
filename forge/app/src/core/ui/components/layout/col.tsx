import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const Col = ({ children, style }: Props) => {
  return <View style={style}>{children}</View>;
};
