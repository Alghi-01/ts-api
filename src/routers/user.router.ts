import { Router } from "express";
import { getUsers, registerUser } from "../controllers/user.controller";

const router: Router = Router();

router.get("/", getUsers);
router.post("/", registerUser);

export default router;
