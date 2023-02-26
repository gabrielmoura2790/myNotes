import { ForbiddenError, BadRequestError } from "../../helpers/api-errors";
import prismaClient from "../../prisma";

interface DeleteRequest {
  note_id: string;
  user_id: string;
}

class DeleteNoteService {
  async execute({ note_id, user_id }: DeleteRequest) {
    const note = await prismaClient.note.findFirst({
      where: { id: note_id },
    });

    if (!note) {
      throw new BadRequestError("Nehuma atividade encontrada");
    }

    if (note.user_id !== user_id) {
      throw new ForbiddenError("Você não tem permissões suficientes!");
    }

    await prismaClient.note.delete({
      where: { id: note.id },
    });

    return { message: "A atividade foi excluida com sucesso!" };
  }
}

export { DeleteNoteService };
