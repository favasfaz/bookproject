import express from "express";
import { searchBooks, createBook } from "../controller/bookController.js";
const router = express.Router();

router.route("/searchBooks/:id").get(searchBooks);
router.route("/addBooks/:id").post(createBook);

export default router;
