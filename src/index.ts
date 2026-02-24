import express, { Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/user.routes";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/database";

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api", userRoutes);


app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the E-Learning API!" });
});

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Learning API",
      version: "1.0.0",
      description: "API documentation for the E-Learning platform",
    },
  },
  // Use __dirname so this works in both:
  // - dev (ts-node / nodemon) where __dirname points to src/
  // - prod (compiled) where __dirname points to dist/
  apis: [
    path.join(__dirname, "routes", "*.ts"),
    path.join(__dirname, "routes", "*.js"),
  ],
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port: number = Number.parseInt(process.env.PORT || "3000", 10);

connectDB()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`E-Learning API is running at http://localhost:${port}`);
      // eslint-disable-next-line no-console
      console.log(
        `Swagger UI is available at http://localhost:${port}/api`,
      );
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });