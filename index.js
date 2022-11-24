require("express-async-errors");
const express = require("express");
const bookRoutes = require("./routes/bookRoutes")
const errorHandler = require('./middleware/errorHandler')
const path = require("path")
const app = express();

// middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, "./client/build")));
// routes
app.use("/api/books", bookRoutes)

app.use(errorHandler)

app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });

app.all('*', (req, res) => {
    res.status(404)
     if (req.accepts('json')){
        res.json({message: '404 not found'})
    } else {
        res.type("txt").send('404 not found')
    }
})

app.listen(5000, console.log("serveur lancé sur le port 5000"))