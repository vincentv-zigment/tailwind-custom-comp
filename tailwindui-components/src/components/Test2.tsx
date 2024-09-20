import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

interface FileDetails {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

const FileInput: React.FC = () => {
  const [files, setFiles] = useState<FileDetails[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileDetails | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).map(file => {
        const fileType = file.type.split('/')[0];
        const reader = new FileReader();
        const id = Math.random().toString(36).substring(2, 9);

        reader.onloadend = () => {
          setFiles(prevFiles => [
            ...prevFiles,
            {
              id,
              name: file.name,
              size: file.size,
              type: file.type,
              preview: fileType === 'image' ? reader.result as string : undefined,
            },
          ]);
        };

        if (fileType === 'image') {
          reader.readAsDataURL(file);
        } else {
          return {
            id,
            name: file.name,
            size: file.size,
            type: file.type,
          };
        }
      });

      if (newFiles.length) {
        setFiles(prevFiles => [...prevFiles, ...newFiles.filter(file => !!file)]);
      }
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    if (selectedFile && selectedFile.id === id) {
      setSelectedFile(null);
    }
  };

  const handleFileClick = (file: FileDetails) => {
    setSelectedFile(file);
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        className="mb-4 hidden p-2 border border-gray-300 rounded"
        id='inputfile'
      />
      {selectedFile && (
        <div className=" p-4 border border-gray-300 rounded-lg w-full h-96 max-w-2xl flex flex-col items-center justify-between">
          {selectedFile.preview ? (
            <img src={selectedFile.preview} alt="Preview" className=" w-full h-full object-contain" />
          ) : (
            <div className="flex flex-col items-center justify-center  w-full h-full bg-gray-200 text-gray-500">
              <span>{selectedFile.type.split('/')[1].toUpperCase()}</span>
              <div className="text-sm text-center h-16 shrink-0">
                <p>Filename: {selectedFile.name}</p>
                <p>File Size: {formatFileSize(selectedFile.size)}</p>
                <p>File Type: {selectedFile.type}</p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {files.map(file => (
          <div
            key={file.id}
            onClick={() => handleFileClick(file)}
            className={`flex flex-col w-16 h-16 group items-center relative  border border-gray-200  rounded cursor-pointer ${selectedFile && selectedFile.id === file.id ? 'border-blue-500' : ''}`}
          >
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(file.id);
                }}
                className=" p-1 text-white bg-red-500 hidden group-hover:block rounded-full absolute -top-2 -right-2"
              >
                <IoMdClose/>
              </button>
            {file.preview ? (
              <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center  w-20 h-20   text-gray-500">
                <span>{file.type.split('/')[1].toUpperCase()}</span>
              </div>
            )}
              
          </div>
        ))}
        <label htmlFor='inputfile'>
          Plus
        </label>
      </div>
      
    </div>
  );
};

export default FileInput;
