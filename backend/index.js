const connectToMongo = require("./db.js");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth.js");
const noteRouter = require("./routes/notes.js");

const port = 3001;
// const router = require('./routes/auth.js')

connectToMongo()
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("hii jay!");
});
// app.get('/api/auth', (res, res) => {
//     res.send('hii this is ger auth');
// })

// ** wrong way

// app.get('/auth/api', (req, res) => {
//     router();
// })

app.use(express.json()); // this is middle ware to use req.body (i.e. go to notes.js or auth.js)

// ** correct way

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.listen(port, () => {
  console.log(`app listening at localhost:${port}`);
});
