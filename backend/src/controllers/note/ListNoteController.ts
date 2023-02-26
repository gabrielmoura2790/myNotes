import { Request, Response } from "express";
import { ListNoteService } from "../../services/note/ListNoteService";

class ListNoteController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const listNoteService = new ListNoteService();

    const list = await listNoteService.execute({
      user_id,
    });

    return res.json(list);
  }
}

export { ListNoteController };
