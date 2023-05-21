import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import * as path from "path"

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs IN THE MAIN PROCESS // <---- main process - node environment access - fs, path etc.
   */
  entry: ['./src/main/index.ts'], // originally was only "./src/index.ts"
  // Put your normal webpack config below here
  module: {
    rules,
  },
  // Original resolve that was found provided in boilerplate
  //resolve: {
  //  extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  //},

  // This resolve below is copied from webpack.renderer.config.ts 
  // It should support absolute path importing, whereas by default it did not
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src'),
    },
  },
};
