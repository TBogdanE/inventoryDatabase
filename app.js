const express = require("express");
const app = express();
const path = require("path");
const appRouter = require("./router/appRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", appRouter);

const PORT = 3000;
app.listen(PORT, () => console.log("Express started on PORT", PORT));
