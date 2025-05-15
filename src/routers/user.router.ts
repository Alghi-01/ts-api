import { Router } from "express";
import {
  getUserByEmail,
  getUsers,
  registerUser,
} from "../controllers/user.controller";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:email", getUserByEmail);
router.post("/", registerUser);

export default router;
