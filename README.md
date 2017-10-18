# properly-favicon

Node.js middleware for serving favicons by routing.

## Usage

First, you need a express server with session enabled:

```
const session = require('express-session');
const sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: true
};
app.use(session(sess));
```

In express app, create a mapping table, to specify favicons according by routes, like this:

```
const mapping = {
    '/one': path.join(__dirname, 'public', 'favicon.ico'),
    '/two': path.join(__dirname, 'public', 'favicon2.ico'),
    '/three': path.join(__dirname, 'public', 'favicon3.ico')
};
```

Finally, mount properly-favicon in your app:

```
app.use(require('./properly-favicon')(mapping));
```

## Installation

```
npm install properly-favicon
```

## License

MIT
