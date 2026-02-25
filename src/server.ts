import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { createApp } from "./app";

export const startServer = async (): Promise<void> => {
  dotenv.config();

  const port: number = Number.parseInt(process.env.PORT || "3000", 10);
  const app = createApp();

  await connectDB();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `${process.env.PROJECT_NAME} API is running at http://localhost:${port}`,
    );
    // eslint-disable-next-line no-console
    console.log(`Swagger UI is available at http://localhost:${port}/api`);
  });
};
