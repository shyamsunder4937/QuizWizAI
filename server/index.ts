import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { registerRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist/public"));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
