const express = require('express');
const router = express.Router();

const listsRouter=require("../controllers/lists.js");

router.get("/get/lists", listsRouter.getAllLists);
router.post("/create/list", listsRouter.createList);
router.delete("/remove/list/:id", listsRouter.deleteList);

module.exports=router;