const express= require('express');
const router=require('./routes');
const cors=require('cors');

var app = express();
app.use(cors());
app.use(express.json());
app.use('/',router);

app.listen(process.env.PORT, () =>{
    console.log("Server is running on port 8080");
});