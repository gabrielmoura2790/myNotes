import prismaClient from "../../prisma";
import { BadRequestError } from "../../helpers/api-errors";

interface NoteRequest {
  text: string;
  user_id: string;
}

class CreateNoteService {
  async execute({ text, user_id }: NoteRequest) {
    if (!text) {
      throw new BadRequestError("Erro ao criar sua atividade!");
    }

    const note = await prismaClient.note.create({
      data: {
        text,
        user_id,
      },
      select: {
        id: true,
        text: true,
        user_id: true,
      },
    });

    return note;
  }
}

export { CreateNoteService };
