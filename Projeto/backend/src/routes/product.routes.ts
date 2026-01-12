import { Router } from "express";
import {listar,cadastrar,editar,deletarTudo,buscarPorNome,buscarPorId
} from "../controllers/product.controller";

const router = Router();

router.get("/products", listar);
router.post("/products", cadastrar);
router.put("/products/:id", editar);
router.put("/products/desativar/todos", deletarTudo);
router.get("/products/:id", buscarPorId);
router.get("/products/buscar/:nome", buscarPorNome);

export default router;
