const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

/* const items = require("./routes/api/items");
const images = require("./routes/api/images"); */
const signin = require("./routes/api/signin");
const signup = require("./routes/api/singup");
const indicators = require("./routes/api/indicators");
const scores = require("./routes/api/scores");
const items = require("./routes/api/items");
const ind_profiles = require("./routes/api/ind_profiles");
const corp_profiles = require("./routes/api/corp_profiles");

const app = express();

// BodyParser Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//Use routes
/* app.use("/api/items", items);
app.use("/api/images", images); */
//app.use("/api/completedtodos", completedtodos);
app.use("/api/signup", signup);
app.use("/api/signin", signin);
app.use("/api/indicators", indicators);
app.use("/api/scores", scores);
app.use("/api/items", items);
app.use("/api/indprofiles", ind_profiles);
app.use("/api/corpprofiles", corp_profiles);

app.get("/", (req, res) => {
  res.send("Welcome to RiskGuard");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
