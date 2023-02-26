import { Request, Response } from "express";
import { UpdateNoteService } from "../../services/note/UpdateNoteService";

class UpdateNoteController {
  async handle(req: Request, res: Response) {
    const { note_id } = req.params;
    const user_id = req.user_id;

    const updateNoteSerice = new UpdateNoteService();

    const update = await updateNoteSerice.execute({
      user_id,
      note_id,
      body: req.body,
    });

    return res.json(update);
  }
}

export { UpdateNoteController };
