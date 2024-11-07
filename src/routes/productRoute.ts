import { Router } from "express";
import { show } from "@/controllers/Product/Show";
import { add } from "@/controllers/Product/Add";

const router = Router();

router.get("/", show);
router.post("/add", add);

export default router;
