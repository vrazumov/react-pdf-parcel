
1. Install with yarn:

yarn global add parcel-bundler

or with npm:

npm install -g parcel-bundler

2. Parcel can take any type of file as an entry point, but an HTML or JavaScript file is a good place to start. If you link your main JavaScript file in the HTML using a relative path, Parcel will also process it for you, and replace the reference with a URL to the output file.

<html>
<body>
  <script src="./index.js"></script>
</body>
</html>


🛠 index.js

// import another component
import main from './main';

main();


🛠 main.js

// import a CSS module
import classes from './main.css';

export default () => {
  console.log(classes.main);
};


💅 main.css

.main {
  /* Reference an image file */
  background: url('./images/background.png');
  color: red;
}

Just run parcel index.html to start a dev server. Importing JavaScript, CSS, images, and more just works! 👌 

React

Blog Post

npm install --save react
npm install --save react-dom
npm install --save-dev parcel-bundler

Or if you have the optional Yarn package manager installed

yarn add react
yarn add react-dom
yarn add --dev parcel-bundler

Add Start script to package.json

// package.json
"scripts": {
  "start": "parcel index.html"
}


3. Parcel has a development server built in, which will automatically rebuild your app as you change files and supports hot module replacement for fast development. Just point it at your entry file:

parcel index.html

4. Now open http://localhost:1234/ in your browser. If needed, you can also override the default port with the -p option. Add --open to automatically open a browser.

See parceljs.org ( https://parceljs.org/ ) for more documentation!
