const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(3000);

//https://daily-code-web.vercel.app/tracks/43XrfL4n0LgSnTkSB4rO/v25lmvmuWbrznZ7mNtBE
