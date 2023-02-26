import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UnauthorizedError } from "../../helpers/api-errors";

interface AuthResquest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthResquest) {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError("Useário ou senha incorreta!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Useário ou senha incorreta!");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
