// const express = require("express");

import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
// const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use(cors());
// app.use(
// 	cors({
// 		origin: "http://loclahost:3000",
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		allowedHeaders: ["Content-Type"],
// 	})
// );

app.get("/", function (req, res) {
	console.log("hello");
	// res.send("Hello World");
	return res.status(234).send("Welcome to MERN Tutorial");
});
app.use("/books", booksRoute);

mongoose
	.connect(mongoDBURL)
	.then((result) => {
		console.log("App connected to database");
		app.listen(PORT, () => {
			console.log(`App is listeing to port : ${PORT}`);
		});
	})
	.catch((err) => {
		console.log("errror" + err);
	});
