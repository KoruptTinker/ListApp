const { sequelize } = require("../models");
const db= require("../models");
const items=db.items;

function getItems(req, res){
    items.findAll({
        attributes: ['id', 'description', 'list', 'status'],
        where:{
            list: req.params.id
        }
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
}

function createItem(req, res){
    items.create({
        description: req.body.description,
        list: req.body.list,
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
}

function markItem(req, res){
    items.update({
        status: true,
    },{
        where: {
            id: req.body.id
        }
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
}

function unmarkItem(req, res){
    items.update({
        status: false,
    },{
        where: {
            id: req.body.id
        }
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
}

function deleteTask(req, res){
    items.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).send('Success'))
    .catch(err=> res.status(500).send(err));
}

module.exports={
    getItems,
    createItem,
    markItem,
    unmarkItem,
    deleteTask
}