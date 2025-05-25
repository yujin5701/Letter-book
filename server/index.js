import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.route.js";
import relationshipRoutes from "./src/routes/relationship.route.js"

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/relationship", relationshipRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
