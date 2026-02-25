import express, { Express, Request, Response } from "express";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";

const createSwaggerSpec = () => {
  return swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: `${process.env.PROJECT_NAME ?? "PeaceFood"} API`,
        version: "1.0.0",
        description: `API documentation for the ${process.env.PROJECT_NAME ?? "PeaceFood"} platform`,
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
};

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.use("/api", routes);

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: `Welcome to the ${process.env.PROJECT_NAME ?? "PeaceFood"} API!` });
  });

  const swaggerSpec = createSwaggerSpec();
  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return app;
};
