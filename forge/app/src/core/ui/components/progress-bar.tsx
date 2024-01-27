/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useBrand } from 'core/features/brand/use-brand';
import { darkenColor } from 'core/helpers/darken-color';
import { ProgressBar as NativePrograssBar } from 'react-native-web';

export const ProgressBar = () => {
  const brand = useBrand();

  return (
    <NativePrograssBar
      indeterminate
      trackColor={brand.primaryColor}
      color={darkenColor(brand.primaryColor, 185)}
    />
  );
};
