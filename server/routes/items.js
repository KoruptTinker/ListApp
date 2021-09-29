const express = require('express');
const router = express.Router();

const itemsRouter = require("../controllers/items.js");

router.get("/get/items/:id", itemsRouter.getItems);
router.post("/create/task", itemsRouter.createItem);
router.put("/mark", itemsRouter.markItem);
router.put("/unmark", itemsRouter.unmarkItem);
router.delete("/remove/task/:id", itemsRouter.deleteTask);

module.exports = router;
