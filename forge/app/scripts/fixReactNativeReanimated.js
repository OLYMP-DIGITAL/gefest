/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
/**
 * Фикс еще не исправленный в react-native-reanimated, из-за которого в консоль
 * постоянно сыпляться warnings.
 */

const fs = require('fs');

const filePath =
  './node_modules/react-native-reanimated/lib/module/index.web.js';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const searchString = 'export { _default as default };';
  const replacementString =
    '// export { _default as default };\nexport default _default;';

  if (data.includes(searchString)) {
    if (!data.includes('// export { _default as default };')) {
      const updatedData = data.replace(searchString, replacementString);

      fs.writeFile(filePath, updatedData, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('File has been successfully');
        }
      });
    } else {
      console.log('The line is already commented.');
    }
  } else {
    console.log('Line not found in the file.');
  }
});
