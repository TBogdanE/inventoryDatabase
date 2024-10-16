const express = require("express");
const app = express();
const appRouter = require("./router/appRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", appRouter);

const PORT = 3000;
app.listen(PORT, () => console.log("Express started on PORT", PORT));
