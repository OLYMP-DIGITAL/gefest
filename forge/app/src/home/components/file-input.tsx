import React, { useRef } from 'react';

export const FileInput = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const selectedFile = (fileInputRef.current as any)?.files[0];

    if (selectedFile) {
      // Обработка выбранного файла
      console.log('Выбран файл:', selectedFile.name);
    }
  };

  return <input type="file" ref={fileInputRef} onChange={handleFileChange} />;
};
