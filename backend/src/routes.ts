import { Router, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateNoteController } from "./controllers/note/CreateNoteController";
import { DeleteNoteController } from "./controllers/note/DeleteNoteController";
import { ListNoteController } from "./controllers/note/ListNoteController";
import { UpdateNoteController } from "./controllers/note/UpdateNoteController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post("/note", isAuthenticated, new CreateNoteController().handle);
router.get("/note", isAuthenticated, new ListNoteController().handle);
router.delete(
  "/note/:note_id",
  isAuthenticated,
  new DeleteNoteController().handle
);
router.put(
  "/note/:note_id",
  isAuthenticated,
  new UpdateNoteController().handle
);

export { router };
