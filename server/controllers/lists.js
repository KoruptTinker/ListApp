const { sequelize } = require("../models");
const db= require("../models");
const lists=db.lists;
const items=db.items;

function getAllLists(req, res){
    lists.findAll({
        attributes: ['id','name']
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
}


function createList(req, res){
    lists.create({
        name: req.body.name
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
}


function deleteList(req, res){
    items.destroy({
        where: {
            list: req.params.id
        }
    })
    .then(result => lists.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).send('Success'))
    .catch(err=> res.status(500).send(err)))
    .catch(err => res.status(500).send(err));
}


module.exports={
    getAllLists,
    createList,
    deleteList
}