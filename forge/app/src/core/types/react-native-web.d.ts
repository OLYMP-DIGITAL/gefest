import { View } from '@types/react-native';
import { Component, FunctionComponent } from 'react';

declare module 'react-native-web' {
  export interface CheckBoxProps extends View.Props {
    color?: ?ColorValue;
    disabled?: boolean;
    onChange?: ?((e: any) => void);
    onValueChange?: ?((e: any) => void);
    readOnly?: boolean;
    value?: boolean;
  }

  export class CheckBox extends Component<CheckBoxProps> {}
}
