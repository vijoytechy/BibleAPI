const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const config = require('../config');
const cors = require('./cors');
const biblesRouter = express.Router();
biblesRouter.use(bodyParser.json());

//get all bibles
biblesRouter.route('/')
    .get(cors.cors, (req, res, next) => {
        request({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': config.api_key
            },
            uri: config.url,
            json: true,
            method: 'GET'
        }, (error, response, body) => {
            if (error) throw new Error(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var bibles = body.data.map(body => ({
                id: body.id,
                name: body.name
            }));
            res.json(bibles);


        });

    });
biblesRouter.route('/:bibleId')
    .get(cors.cors, (req, res, next) => {
        request({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': config.api_key
            },
            uri: config.url + '/' + req.params.bibleId,
            json: true,
            method: 'GET'
        }, (error, response, body) => {
            if (error) throw new Error(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var bible = body.data;
            res.send(bible);


        });

    });

biblesRouter.route('/:bibleId/books')
    .get(cors.cors, (req, res, next) => {
        request({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': config.api_key
            },
            uri: config.url + '/' + req.params.bibleId + '/books',
            qs:
            {
                'include-chapters': 'false',
                'include-chapters-and-sections': 'false'
            },
            json: true,
            method: 'GET'
        }, (error, response, body) => {
            if (error) throw new Error(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var books = body.data;
            res.send(books);


        });

    });

biblesRouter.route('/:bibleId/books/:bookId')
    .get(cors.cors, (req, res, next) => {
        request({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': config.api_key
            },
            uri: config.url + '/' + req.params.bibleId + '/books' + '/' + req.params.bookId,
            qs: { 'include-chapters': 'true' },
            json: true,
            method: 'GET'
        }, (error, response, body) => {
            if (error) throw new Error(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var bookIds = body.data;
            res.send(bookIds);


        });

    });

biblesRouter.route('/:bibleId/books/:bookId/chapters')
    .get(cors.cors, (req, res, next) => {
        request({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': config.api_key
            },
            uri: config.url + '/' + req.params.bibleId + '/books' + '/' + req.params.bookId + '/chapters',
            qs: { 'include-chapters': 'true' },
            json: true,
            method: 'GET'
        }, (error, response, body) => {
            if (error) throw new Error(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var chapters = body.data;
            res.send(chapters);


        });

    });

biblesRouter.route('/:bibleId/chapters/:chapterId')
    .get(cors.cors, (req, res, next) => {
        request({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': config.api_key
            },
            uri: config.url + '/' + req.params.bibleId + '/chapters' + '/' + req.params.chapterId,
            qs:
            {
                'content-type': 'text',
                'include-notes': 'false',
                'include-titles': 'true',
                'include-chapter-numbers': 'true'
            },
            json: true,
            method: 'GET'
        }, (error, response, body) => {
            if (error) throw new Error(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var chapterIds = body.data;
            res.send(chapterIds);


        });

    });


module.exports = biblesRouter;





