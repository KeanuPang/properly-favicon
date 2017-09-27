'use strict';

const fs = require('fs');
const path = require('path');

const sendFavicon = (res, buf) => {
  res.setHeader('Cache-Control', 'public, max-age=0');
  res.statusCode = 200;
  res.setHeader('Content-Length', buf.length);
  res.setHeader('Content-Type', 'image/x-icon');
  return res.end(buf);
};

module.exports = (path_mapping) => {
  return (req, res, next) => {
    const iconPath = path_mapping[req.path];
    if (iconPath) {
      req.session.iconPath = path.resolve(iconPath);
      req.session.save(() => {
      });
    }

    if (req.path !== '/favicon.ico') {
      return next();
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = req.method === 'OPTIONS' ? 200 : 405;
      res.setHeader('Allow', 'GET, HEAD, OPTIONS');
      res.setHeader('Content-Length', '0');
      return res.end();
    }

    if (req.session.iconPath) {
      fs.readFile(req.session.iconPath, (err, buf) => {
        if (err) return next(err);

        sendFavicon(res, buf);
      });
    } else {
      next();
    }
  };
};

