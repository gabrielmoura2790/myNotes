import { Request, Response } from "express";
import { DeleteNoteService } from "../../services/note/DeleteNoteService";

class DeleteNoteController {
  async handle(req: Request, res: Response) {
    const { note_id } = req.params;

    const user_id = req.user_id;

    const deleteNoteService = new DeleteNoteService();

    const deleteNote = await deleteNoteService.execute({
      note_id,
      user_id,
    });

    return res.json(deleteNote);
  }
}

export { DeleteNoteController };
