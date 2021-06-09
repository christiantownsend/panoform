# Panoform

Panoform is a low-fidelity virtual reality (VR) creation tool built with [Vue.js](https://vuejs.org/v2/guide/) which seeks to bridge the gap between VR consumption and VR creation, allowing nearly anyone the ability
to become creators of VR content. It allows users to print out a grid and draw on top of it, then upload a picture of their drawing and view it within a 3d space that envelopes the user. With nothing but a drawing utensil, a phone, and a cardboard VR viewer, anyone can create their own low-fidelity virtual reality scene.
  
  
## How to set up a local development environment

### Getting a local copy of the repository

Create a local folder where you want the repository to end up.

Open a terminal or command prompt and navigate to the folder you just created. Then type:

```
git clone https://github.com/christiantownsend/panoform.git
```

### Set up dependencies and development environment

Once you've cloned the repository, in the same directory run:

```
npm install
```
  
  
## Development environment command reference

### Compiles and runs a local server with hot-reloads for development
```
npm run serve
```
  
  
## Deploying for production

### Compile and minify for production

First, build the code. It will be put into a local folder called "dist" once the build is complete.

```
npm run build
```

### Deploy the compiled code

After the code is built and in the "dist" folder, run:

```
npm run deploy
```

This command will send everything from the dist folder into the gh-pages branch of the repository.

When that branch is updated, the live site will update within a couple minutes.