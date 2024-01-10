import { isFunction } from 'core/helpers/utils';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

interface GridFunctionProps {
  size: number;
}

type GridFunction = (options: GridFunctionProps) => React.ReactNode;

interface GridProps {
  children?: React.ReactNode | GridFunction;
}

export const Grid: React.FC<GridProps> = ({ children }: GridProps) => {
  const [size, setSize] = useState(10);

  return (
    <ScrollView>
      {(() => {
        if (isFunction(children)) {
          return (children as GridFunction)({ size } as GridFunctionProps);
        }

        return children as React.ReactNode;
      })()}
    </ScrollView>
  );
};
