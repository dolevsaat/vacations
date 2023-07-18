import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import expressRateLimit from "express-rate-limit";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import preventXss from "./3-middleware/prevent-xss";

//Routs
import routeNotFound from "./3-middleware/route-not-found";
import followersRoutes from "./6-routes/followers-routes";
import authRoutes from "./6-routes/auth-routes";
import dataRoutes from "./6-routes/vacations-routes";
import usersRout from "./6-routes/users-routes";

const server = express();

// Prevent DoS attack:
server.use(
    expressRateLimit({
        windowMs: 10000,
        max: 10000,
        message: "To many request",
    })
);

// Use helmet to defense against malicious headers:
server.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

// Defend from cross-site scripting:
server.use(preventXss);

server.use(cors());

server.use(express.json());

server.use(expressFileUpload());

server.use("/api", dataRoutes);

server.use("/api", authRoutes);

server.use("/api/users", usersRout);

server.use("/api", followersRoutes);

server.use(routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
