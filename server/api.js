const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
require('dotenv').config();
const express = require('express');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/listapp`);


app.get("/", (req,res) => {
    res.status(200).send("Hello from List API");
});


app.get("/listapp/get/items/:id", (req, res) => {
    const {id}=req.params;
    sequelize.query(`SELECT * FROM items WHERE list=${id} ORDER BY status`, {type: QueryTypes.SELECT})
    .then(lists => res.status(200).send(lists))
    .catch(err => console.error(err));
});


app.get("/listapp/get/lists", (req, res) => {
    sequelize.query('SELECT * from lists', {type: QueryTypes.SELECT})
    .then(lists => {
        res.status(200).send(lists);
    })
    .catch(() => {
        res.status(404).send("Error");
    });
});


app.post("/listapp/create/task", (req, res) => {
    const {description}=req.body;
    const {list}=req.body;
    sequelize.query(`INSERT INTO items (description, list) VALUES ('${description}', ${list})`, {type: QueryTypes.INSERT})
     .then((id) => {
         res.status(201).send(id);
     })
     .catch(err => console.error(err));
});


app.post("/listapp/create/list", (req, res)=>{
    const {name} = req.body;
    sequelize.query(`INSERT INTO lists (name) VALUES ('${name}')`, {type: QueryTypes.INSERT})
    .then(()=>{
        res.status(200).send('Success');
    })
    .catch(()=>{
        res.status(204).send('Error');
    });
});


app.put("/listapp/mark", (req, res) => {
    const {id} = req.body;
    sequelize.query(`UPDATE items SET status=true WHERE id=${id}`, {type: QueryTypes.UPDATE})
    .then(()=>{
        res.status(200).send("Success");
    })
    .catch(()=> {
        res.status(404).send("Content not found");
    });
}); 


app.put("/listapp/unmark", (req, res) => {
    const {id}= req.body;
    sequelize.query(`UPDATE items SET status=false WHERE id=${id}`, {type: QueryTypes.UPDATE})
    .then(()=>{
        res.status(200).send('Success');
    })
    .catch(()=>{
        res.status(404).send('Content not found');
    })
});


app.delete("/listapp/remove/list/:id", (req,res)=>{
    const {id} = req.params;
    sequelize.query(`DELETE FROM items WHERE list=${id}`, {type: QueryTypes.DELETE})
    .then(
        () => {
            sequelize.query(`DELETE from lists WHERE id=${id}`, {type: QueryTypes.DELETE})
            .then(() => {
                res.status(200).send("Success");
            })
            .catch(()=>{
                res.status(404).send("Content not found");
            });
        }
    )
    .catch(()=>{
        res.status(404).send("Content not found");
    });
});


app.delete("/listapp/remove/task/:id", (req,res) => {
    const {id}=req.params;
    sequelize.query(`DELETE FROM items WHERE id=${id}`, {type: QueryTypes.DELETE})
    .then(() => {
        res.status(200).send(`Success`);
    })
    .catch(() => {
        res.status(404).send('Content not found');
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on localhost:${process.env.PORT}`);

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });

});