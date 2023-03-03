const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin"); // This plugin is enabled automatically with "production" mode
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js", // using [contenthash] in names creates a rule which will create a new bundle file with a hash-code in its name every time the code was changed,
    // which is realy helpfull for browser caching(caching is done by filename and every time you get a file with a new name, it will be cached not to download the same code again).
    path: path.resolve(__dirname, "./dist"),
    // publicPath: 'file:///Users/ov_zayats/Desktop/webpack/dist/',
    // if aplication is searched from the same domain as the static files, we can use relative path
    publicPath: "",
    //in case of using cdn to serve static files:
    // publicPath: 'http://some-cdn.com/',
    // clean: {         //this option does the same thing as CleanWebpackPlugin, but only for dist directory
    //   dry: true,
    //   keep: /\.css/
    // }
  },
  mode: "production", // can be set to "production" (which will enable a number of webpack plugins to make a build, list can be seen in documentation), or "development"
  module: {
    rules: [
      {
        test: /\.(png|jpg)/,
        // type 'asset/resource' will create a file in the output directory and create a link to this file
        type: "asset/resource",

        //  'asset/inline' type makes assets downloadded to js bundle not as links, but as base64 encoded string.
        //  So using it for example for big images will make bundle much bigger, but there will not be a requests made for each image
        //  It is very convinient for example for icons, becase it will not make a js bundle much bigger, but will save resources because no requests will be needed
        //type: 'asset/inline',

        // general 'asset' type lets webpack to define wich type to use depending on file size. So in case of big image a link to resource will be used to lower the bundle size,
        // but in case of small file(less than 8 kB, which is set automatically and can be changed with parser option) it will be decoded to base64 and used inline:
        // type:'asset',
        // parser: {
        //     dataUrlCondition: {
        //         maxSize: 3 * 1024, // 3 kilobytes
        //     },
        // },
      },
      {
        //   'asset/source type makes webpack read file content as a js string and inject this string into a js bundle as is, without any modifications and without creating a file in the output directory'
        test: /\.txt/,
        type: "asset/source",
      },

      // LOADERS are used to import differrent types of files (css, xml, js ...)
      // webpack reads loaders from right to left, so order of loaders in an array matters
      // don't forget to install a loader if needed (npm install style-loader css-loader --save-dev)
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      // most of new js features are loaded with 'babel-env', but to use hot features which are not there we may need to set a plugin designed for this feature
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: "babel-loader",
        // use: {
        // loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel-env'],
        //     plugins: ['@babel-plugin-proposal-class-properties'],
        //   },
        // },
      },
      {
        test: /\.hbs$/,
        use: "handlebars-loader",
      },
    ],
  },
  plugins: [
    // normally you will need to install plugin with npm, but terser plugin is preinstalled with webpack
    // new TerserPlugin(), // this plugin minifies our bundle files, enabled automatically with "production" mode
    new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" }), // this plugin extracts styles to separate file in dist folder) don't forget to call this plugin loader in rules for css and sass files as shown above (replace 'style-loader'),
    // as well as link this files in index.html file
    new CleanWebpackPlugin({
      //this plugin cleans dist folder (deletes all files) every new build before new files creation
      cleanOnceBeforeBuildPatterns: [
        // this patterns array to clean not onle the dist folder, but to specify other folders which needs to be cleaned every build
        "**/*", // cleans dist folder and all nested folders and files, this is default
        path.join(process.cwd(), "build/**/*"), // cleans build folder in  the root directory
      ],
    }),
    new HtmlWebpackPlugin({
      // this plugin creates index.html file in dist folder and automatically changes files references if we got new files with new names after the build
      title: "Hello from webpack!", //sets index.html title tag content
      // filename: 'subfolder/custom_filename.html', // this option lets us set a filename and/or create a subfolder to store it
      template: "src/index.hbs",
      description: "test template description",
      //   meta: {
      //     description: 'test meta description',
      //   },
    }),
  ],
};
