'use strict';

const test = require('ava');
const http = require('http');
const request = require('supertest');

const favicon = require('..');

const createServer = (mapping) => {
  let myFavicon = favicon(mapping);
  return http.createServer((req, res) => {
    myFavicon(req, res, (err) => {
      res.statusCode = err ? (err.status || 500) : 404;
      res.end(err ? err.message : 'oops');
    })
  });
};

test.cb('test by default favicon', (t) => {
  request(createServer({}))
    .get('/favicon.ico')
    .expect(200, () => {
      t.end();
    })
});
