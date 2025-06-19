import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET as string;

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send("Nieprawidłowy email lub hasło");
    }

    const token = generateToken(60);
    const refreshToken = generateToken(60 * 60);

    res.status(200).json({
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Błąd logowania:", err);
    res.status(500).send("Wewnętrzny błąd serwera");
  }
};

function generateToken(expirationInSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  return jwt.sign({ exp }, tokenSecret, { algorithm: "HS256" });
}
