import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidosRoutes = Router();


pedidosRoutes.post('/', pedidoController.criar);
pedidosRoutes.post('/:pedidoId/item', pedidoController.adicionarItem);
pedidosRoutes.put('/item/:itemId', pedidoController.editarItem);
pedidosRoutes.delete('/item/:itemId', pedidoController.excluirItem);
pedidosRoutes.put('/:pedidoId/status', pedidoController.editarStatus);
pedidosRoutes.get('/', pedidoController.listar);
pedidosRoutes.put('/:pedidoId', pedidoController.editar);
pedidosRoutes.delete('/:pedidoId', pedidoController.deletar);

export default pedidosRoutes;