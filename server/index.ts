import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./mongodb/connect";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import storyRoutes from "./routes/storyRoutes"; 

const app = express();
const port = 3000;

const tokenSecret = process.env.TOKEN_SECRET as string;
let refreshToken: string;

app.use(cors());
app.use(express.json());

connectDB();

interface AuthenticatedRequest extends Request {
  user?: any;
}

function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(
    token,
    tokenSecret,
    { algorithms: ["HS256"] },
    (err: any, user: any) => {
      if (err) {
        console.log(err);
        res.status(401).send(err.message);
        return;
      }
      req.user = user;
      next();
    }
  );
}

app.get(
  "/protected/:id/:delay?",
  verifyToken,
  (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    const delay = req.params.delay ? +req.params.delay : 1000;

    setTimeout(() => {
      res.status(200).send(`{"message": "protected endpoint ${id}"}`);
    }, delay);
  }
);

app.post("/token", (req: Request, res: Response) => {
  const expTime = req.body.exp || 60;
  const token = generateToken(+expTime);
  refreshToken = generateToken(60 * 60);
  res.status(200).send({ token, refreshToken });
});

app.post("/refreshToken", (req: Request, res: Response) => {
  const refreshTokenFromPost = req.body.refreshToken;

  if (refreshToken !== refreshTokenFromPost) {
    return res.status(400).send("Bad refresh token!");
  }

  const expTime = req.headers.exp || 60;
  const token = generateToken(+expTime);
  refreshToken = generateToken(60 * 60);

  setTimeout(() => {
    res.status(200).send({ token, refreshToken });
  }, 3000);
});

app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", storyRoutes); 

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

function generateToken(expirationInSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  return jwt.sign({ exp }, tokenSecret, {
    algorithm: "HS256",
  });
}
