import express from "express";
import { webcrypto } from "node:crypto";
import cors from "cors";
import { loadEnvFile } from "./utils/loadEnv.js";

if (!globalThis.crypto) {
    globalThis.crypto = webcrypto;
}

loadEnvFile();

const { default: dbConnection } = await import("./connection/dbConnection.js");
const { default: blogRoutes } = await import("./routes/blogRoute.js");

const app = express();
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    credentials:true,
}));

app.use("/api/blogs", blogRoutes);


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

dbConnection();
