import { BadRequestError, ForbiddenError } from "../../helpers/api-errors";
import prismaClient from "../../prisma";

interface UpdateRequest {
  user_id: string;
  note_id: string;
  body: {
    text: string;
    isCheck: boolean;
  };
}

class UpdateNoteService {
  async execute({ user_id, note_id, body }: UpdateRequest) {
    const { text, isCheck } = body;

    const note = await prismaClient.note.findFirst({
      where: { id: note_id },
    });

    if (!note) {
      throw new BadRequestError("Nehuma atividade encontrada");
    }

    if (note.user_id !== user_id) {
      throw new ForbiddenError("Você não tem permissões suficientes!");
    }

    const updateNote = await prismaClient.note.update({
      where: { id: note_id },
      data: {
        text,
        isCheck,
        updated_at: new Date(),
      },
      select: {
        id: true,
        text: true,
        isCheck: true,
      },
    });

    return updateNote;
  }
}

export { UpdateNoteService };
