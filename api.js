const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Employee = require("./employee");
const dboperations = require("./dboperations");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((req, res, next) => {
  console.log("middleware is called...");
  next();
});

// retriving data from eployee table
router.route("/getdata").get((req, res) => {
  dboperations.getDatas().then((result) => {
    //   console.log(result);
    res.json(result[0]);
  });
});

// retriving data from eployee table by id
router.route("/getdata/:id").get((req, res) => {
  dboperations.getData(req.params.id).then((result) => {
    //   console.log(result);
    // console.log(result[0]);
    res.json(result[0]);
  });
});

// adding data
router.route("/adddata").post((req, res) => {
  let order = { ...req.body };
  dboperations.addData(order).then((result) => {
    res.status(201).json(result);
  });
});

const port = process.env.PORT || 8000;
// app.listen(port);
// console.log("Employee api is running at port :", port);

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the port: ${err}`);
    return;
  }
  console.log(`Server is up and running on port: ${port}`);
});
