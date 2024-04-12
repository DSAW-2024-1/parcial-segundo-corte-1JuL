const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const userRouter = require("./routes/users");
const coinRouter = require("./routes/coin");

app.use("/users", userRouter);
app.use("/coin", coinRouter);

// URL - Callback
app.get("/", (req, res) => {
  res.send("Diego Norberto Diaz Algarin - 0000307595");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});