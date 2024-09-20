// loadCode.js
import fs from 'fs';
import path  from 'path'
import babel from '@babel/core'

export const loadCode = (filePath) => {
  const code = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
  const result = babel.transformSync(code, {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  });
  return result.code;
};

