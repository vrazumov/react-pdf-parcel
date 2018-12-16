
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

## Save to GitHub

git init

git add *

git commit -m '<message>'

git push -u origin master



Вы можете добавлять файлы, используя git add, пример git add README, git add <folder>/* или даже git add *

Затем используйте git commit -m "<Message>" для фиксации файлов

git init

$ cd .dotfiles
$ git add *
$ git commit -m "First commit of dotfiles."
And that’s it, we’ve now got all four of those files tracked in our local Git repository.

Using a remote repository
With that done, if you want to take the next step of having a central location where you can always get your configuration from any machine with an internet connection, you can set up a repository for your dot files on GitHub, with a free account. The instructions for doing this on GitHub itself are great, so just follow them for your existing repository. On my machine, the results look like this:

$ git remote add origin git@github.com:tejr/dotfiles.git
$ git push -u origin master
Note that I’m pushing using a public key setup, which you can arrange in the SSH Public Keys section of your GitHub account settings.



Quick setup — if you’ve done this kind of thing before
or	
HTTPS
SSH

git@github.com:vrazumov/react-pdf-parcel.git
Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE, and .gitignore.

…or create a new repository on the command line
echo "# react-pdf-parcel" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:vrazumov/react-pdf-parcel.git
git push -u origin master
…or push an existing repository from the command line
git remote add origin git@github.com:vrazumov/react-pdf-parcel.git
git push -u origin master
…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.


git remote add origin gitgit@github.com:vrazumov/react-pdf-parcel.git
git push git@github.com:vrazumov/react-pdf-parcel.git
