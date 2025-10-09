import express from "express";

import healthRoutes from "./health";
import viewRoutes from "./view";

const router = express.Router();

router.use(viewRoutes);

export default router;
