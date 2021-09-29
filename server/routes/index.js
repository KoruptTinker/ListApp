const express = require('express');
const router = express.Router();

const listRouter=require('./lists.js');
const itemsRouter=require('./items.js');


router.use('/lists',listRouter);
router.use('/items',itemsRouter);

module.exports=router;