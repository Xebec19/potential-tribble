import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4002;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/products", require("./routes/products.routes"));
app.use("/public", require("./routes/auth.routes"));
app.use("/category", require("./routes/category.routes"));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
