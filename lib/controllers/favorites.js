const { Router } = require('express');
const Favorite = require('../models/Favorite');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const favorite = await Favorite.insert(req.body);
            res.send(favorite);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const favorites = await Favorite.selectAll();
            res.send(favorites);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const favorite = await Favorite.selectId(req.params.id);
            res.send(favorite);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const favorite = await Favorite.updateId(req.body, req.params.id);
            res.send(favorite);
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const favorite = await Favorite.delete(req.params.id);
            res.send(favorite);
        } catch (err) {
            next(err);
        }
    });