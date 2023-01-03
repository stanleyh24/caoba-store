require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');


const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})


const v1Router = require("./v1/routes");
const v1ProductRouter = require("./v1/routes/productsRoutes")
const v1CategoriesRouter = require("./v1/routes/categoriesRoutes")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", v1Router);

app.use("/api/v1/products", v1ProductRouter);
app.use("/api/v1/categories", v1CategoriesRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
