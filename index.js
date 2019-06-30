// add the dependencies
const express     = require("express");
const path        = require("path");
const bodyParser  = require("body-parser");

//Export Google Sheets API config file
const Gsheet      = require("./config/sheet");

// // get the router of registeration
// const register = require("./routers/register");

// init the app
const app = express();

// allow cors
app.use(require("cors")());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// init body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // set the register router
// app.use("/register", register);

// allow cors
app.use(require("cors")());

//Added for testing
app.get('/', (req, res) => {
  res.send('<h1>Running ... </h1>');
})

app.post("/register", (req, res) => {
    res.send("Request Recieved");
    
    //Adding the row to the sheet
    Gsheet.createRow(req.body, (err, row) => {
        if (!err) res.sendStatus(200);
    });
});

// make the port dynamically set
const PORT = process.env.PORT || 4000;

// listen to the port
app.listen(PORT, () => {
  console.log(`app is listining on port ${PORT}`);
});
