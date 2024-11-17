import { Router } from "express";
import { show } from "@/controllers/Product/Show";
import { add } from "@/controllers/Product/Add";
import handler from "@/utils/handler";

const productRoute = Router();

productRoute.get("/", handler(show));
productRoute.post("/add", handler(add));

export default productRoute;
