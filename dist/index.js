"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use("/api", user_routes_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the E-Learning API!" });
});
const swaggerSpec = (0, swagger_jsdoc_1.default)({
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
        path_1.default.join(__dirname, "routes", "*.ts"),
        path_1.default.join(__dirname, "routes", "*.js"),
    ],
});
app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const port = Number.parseInt(process.env.PORT || "3000", 10);
(0, database_1.connectDB)()
    .then(() => {
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`E-Learning API is running at http://localhost:${port}`);
        // eslint-disable-next-line no-console
        console.log(`Swagger UI is available at http://localhost:${port}/api`);
    });
})
    .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
});
