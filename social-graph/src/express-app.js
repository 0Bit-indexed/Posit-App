const express = require('express');
const cors  = require('cors');
const { socialGraph } = require('./api');

module.exports = async (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    socialGraph(app);
    
}