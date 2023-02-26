import { Request, Response } from "express";
import { DetailUserSevices } from "../../services/user/DetailUserServices";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailUserService = new DetailUserSevices();

    const user = await detailUserService.execute(user_id);

    return res.json(user);
  }
}

export { DetailUserController };
