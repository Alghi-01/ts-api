import { Router } from "express";
import {
  getUserByEmail,
  getUsers,
  registerUser,
} from "../controllers/user.controller";
import { loginController } from "../controllers/auth.controller";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:id", getUserByEmail);
router.get("/byEmail/:email", getUserByEmail);
router.post("/", registerUser);
router.put("/:id", registerUser);

// auth
router.post("/login", loginController);

export default router;
