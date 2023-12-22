import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { View } from 'react-native';
import { TextBody } from '../typography/text-body';

interface Props {
  text?: string;
  children?: React.ReactNode;
}

export const CardContent = ({ text, children }: Props) => {
  const styles = useStyles((theme) => ({
    wrapper: {
      padding: 16,
      paddingVertical: 0,
      paddingBottom: 16,
    } as NativeStyles,
  }));

  return (
    <View style={styles.wrapper}>
      {text && <TextBody>{text}</TextBody>}
      {children && children}
    </View>
  );
};
