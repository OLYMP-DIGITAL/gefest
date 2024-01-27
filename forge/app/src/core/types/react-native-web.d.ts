/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
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

  export interface ProgressBarProps extends View.Props {
    color?: ?ColorValue;
    indeterminate?: boolean;
    progress?: ?number;
    trackColor?: ?ColorValue;
  }

  export class ProgressBar extends Component<ProgressBarProps> {}

  export interface ActivityIndicatorProps extends View.Props {
    size?: ?('small' | 'large' | number);
    color?: ?ColorValue;
    animating?: ?boolean;
    hidesWhenStopped?: ?boolean;
  }

  export class ActivityIndicator extends Component<ActivityIndicatorProps> {}
}
