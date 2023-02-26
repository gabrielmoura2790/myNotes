import { Request, Response } from "express";
import { CreateNoteService } from "../../services/note/CreateNoteService";

class CreateNoteController {
  async handle(req: Request, res: Response) {
    const { text } = req.body;

    const user_id = req.user_id;

    const createNoteService = new CreateNoteService();

    const note = await createNoteService.execute({
      text,
      user_id,
    });

    return res.json(note);
  }
}

export { CreateNoteController };
