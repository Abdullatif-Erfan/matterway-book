const express = require("express");

const app = express();
var cors = require("cors");
app.use(cors());

const bookRoutes = require("./routes/bookRoutes");

app.use("/books", bookRoutes);

// Handle unknown routes
app.use(function(req, res) {
  res.sendStatus(404);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
