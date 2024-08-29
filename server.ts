import app from "./app";
import env from "dotenv";
import cors from "cors";

env.config();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://127.0.0.1:5500",
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
