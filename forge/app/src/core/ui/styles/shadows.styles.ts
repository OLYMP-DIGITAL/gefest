import { ImageStyle, TextStyle, ViewStyle, Platform } from 'react-native';

const getPlatformShadow = (colorOpacity: number, opacity = 1) => {
  return Platform.OS === 'android'
    ? { elevation: 5 }
    : {
        shadowColor: `rgba(0, 0, 0, ${colorOpacity})`,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: opacity,
        shadowRadius: 5,
      };
};

export const shadows: (ViewStyle | TextStyle | ImageStyle)[] = [
  {
    ...getPlatformShadow(0.12),
  },
];
