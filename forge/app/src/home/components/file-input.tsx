/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import React, { useRef } from 'react';

export const FileInput = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const selectedFile = (fileInputRef.current as any)?.files[0];

    if (selectedFile) {
      // Обработка выбранного файла
      console.info('Выбран файл:', selectedFile.name);
    }
  };

  return <input type="file" ref={fileInputRef} onChange={handleFileChange} />;
};
