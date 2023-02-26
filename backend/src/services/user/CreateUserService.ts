import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { BadRequestError } from "../../helpers/api-errors";

interface UserResquest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserResquest) {
    if (!email) {
      throw new BadRequestError("E-mail inválido");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new BadRequestError("Usuário já cadastrado");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

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

export { CreateUserService };
