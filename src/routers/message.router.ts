import { Router } from "express";
import {
  publishMessage,
  subscribeToChannel,
} from "../controllers/message.controller";
import { validateMessage } from "../middlewares/validate.message";

const router = Router();

router.post("/publish", validateMessage, publishMessage);
router.get("/subscribe/:channel", subscribeToChannel);

export default router;
