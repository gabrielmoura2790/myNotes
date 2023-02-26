import prismaClient from "../../prisma";

interface ListNoteRequest {
  user_id: string;
}

class ListNoteService {
  async execute({ user_id }: ListNoteRequest) {
    const list = await prismaClient.note.findMany({
      where: { user_id },
      orderBy: { created_at: "asc" },
      select: {
        id: true,
        text: true,
        isCheck: true,
        user_id: true,
      },
    });

    return list;
  }
}

export { ListNoteService };
