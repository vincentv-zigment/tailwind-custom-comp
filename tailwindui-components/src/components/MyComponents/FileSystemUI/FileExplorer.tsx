import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ContextMenuContent, ContextMenuItem, ContextMenuProvider, ContextMenuTrigger } from '../context-menu';

interface FileDetails {
  name: string;
  size: number;
  type: string;
  timestamp: string;
}

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

const App: React.FC = () => {
  const [files, setFiles] = useState<FileDetails[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    if(event.dataTransfer){
        setIsDragging(false);
        const uploadedFiles = Array.from(event.dataTransfer.files);
        const newFiles = uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          timestamp: moment().format('DD-MM-YYYY HH:mm')
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      const newFiles = uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        timestamp: moment().format('DD-MM-YYYY HH:mm')
      }));
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  useEffect(() => {
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);

    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  return (
    <ContextMenuProvider>
      <ContextMenuTrigger>
        <div className={`App w-screen h-screen overflow-hidden ${isDragging ? 'dragging' : ''}`}>
          
          <div className="mt-4">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="mb-4 hidden"
            />
            <div className='flex flex-col items-center w-full max-w-xl'>
                {files.map((file, index) => (
                <ContextMenuProvider key={index}>
                    <ContextMenuTrigger>
                    <button className="cursor-pointer hover:bg-gray-100 border border-transparent focus:border-gray-100 flex items-center w-full p-2  w-full justify-evenly text-xs">
                        <span className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-red-100 block'/>
                            {file.name} 
                        </span>
                        <span>
                            {formatBytes(file.size)}
                        </span>
                        <span>
                            {file.type} 
                        </span>
                        <span>
                            {file.timestamp}
                        </span>
                    </button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                    <ContextMenuItem className='text-sm' onClick={() => {
                        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
                    }}>
                        Delete
                    </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenuProvider>
                ))}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className='text-xs' onClick={() => (document.querySelector('input[type="file"]') as any)?.click()}>
          Upload
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuProvider>
  );
}

export default App;
