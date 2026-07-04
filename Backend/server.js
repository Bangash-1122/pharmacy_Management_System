import app from "./app.js";
import connectDB from "./db/index_db.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 5500;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGODB connection failed!!!", err);
    })