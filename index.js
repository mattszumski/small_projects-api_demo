require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const corsOption = require("./config/corsConfig");
const swaggerOptions = require("./config/swaggerOptions");
const quotesRouter = require("./routers/quotesRouter");
const { seedDatabaseIfEmpty } = require("./seed/seedQuotes");

const app = express();
const PORT = process.env.PORT || 3500;
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use(cors(corsOption));
app.use(express.json());
app.use("/quote", quotesRouter);

mongoose
  .connect(process.env.MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

seedDatabaseIfEmpty();
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
