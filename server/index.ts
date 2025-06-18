import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 3000;

const tokenSecret = process.env.TOKEN_SECRET as string;
let refreshToken: string;

app.use(cors());
app.use(express.json());


const fakeUser = {
  email: "test@example.com",
  password: "1234",
};

interface AuthenticatedRequest extends Request {
  user?: any;
}

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email !== fakeUser.email || password !== fakeUser.password) {
    return res.status(401).send("Invalid credentials");
  }

  const token = generateToken(60); 
  refreshToken = generateToken(60 * 60); 

  res.status(200).send({ token, refreshToken });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World - simple api with JWT!");
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function generateToken(expirationInSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  const token = jwt.sign({ exp, foo: "bar" }, tokenSecret, {
    algorithm: "HS256",
  });
  return token;
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
