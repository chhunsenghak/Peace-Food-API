import { startServer } from "./server";

startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Server startup error:", error);
  process.exit(1);
});