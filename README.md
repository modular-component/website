# ModularComponent Documentation Website

This repository hosts the documentation for ModularComponent; 
the runtime lives at https://github.com/modular-component/modular-component.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. 
Most changes are reflected live without having to restart the server.

Content lives in the /docs folder for the main documentation, and /case-studies for
blog-like posts about real life usage.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `pages` branch.

### Related repositories

- Implementation of the library: https://github.com/modular-component/modular-component