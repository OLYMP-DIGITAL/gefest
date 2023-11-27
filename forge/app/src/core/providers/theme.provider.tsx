import { useEffectOnce } from 'usehooks-ts';
import { darkTheme, lightTheme } from '../style/themes';
import { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface ThemeContextType {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme() {
    // ...
  },
});

interface WindowSizeType {
  height: number,
  width: number
}

export enum ScreenSize {
  small = 'small', medium = 'medium', large = 'large'
}

const windowDimensions = Dimensions.get('window');

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export const useWindowSize = () => {
  const [size, setSize] = useState<WindowSizeType>({ height: windowDimensions.height, width: windowDimensions.width });
  const [sizeType, setSizeType] = useState<ScreenSize>();

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }) => {
        setSize({ height: window.height, width: window.width });
      },
    );
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (size?.width >= 1000) {
      setSizeType(ScreenSize.large)
    } else if (size?.width < 1000 && size?.width > 600) {
      setSizeType(ScreenSize.medium)
    } else {
      setSizeType(ScreenSize.small)
    }
  }, [size])

  return { size, sizeType }
} 