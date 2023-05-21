import type { Configuration } from 'webpack';
import * as path from "path"
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';


export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src'),
    },
  },
};
