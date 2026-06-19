import pedidoRepository from "../repositories/pedidoRepository.js";
import { Pedido } from "../models/Pedido.js";
import { statusPed } from "../enums/statusPedido.js";
import { ItensPedido } from "../models/itensPedido.js";

const pedidoController = {

    criar: async (req, res) => {
        try {
            console.log(req.body);
            console.log("idCliente:", req.body.idCliente);

            const { idCliente, itens } = req.body;

            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );

            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);

            const pedido = Pedido.criar({
                clienteId: idCliente,
                subTotal,
                status: statusPed.ABERTO
            });

            const result = await pedidoRepository.criar(
                pedido,
                itensPedido
            );

            res.status(201).json(result);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: error.message
            });
        }
    },

    adicionarItem: async (req, res) => {
        try {
            const { pedidoId } = req.params;
            const { produtoId, quantidade, valorItem } = req.body;

            const result = await pedidoRepository.adicionarItem(pedidoId, produtoId, quantidade, valorItem);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    editarItem: async (req, res) => {
        try {
            const { itemId } = req.params;
            const { quantidade } = req.body;

            const result = await pedidoRepository.editarItem(itemId, quantidade);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    excluirItem: async (req, res) => {
        try {
            const { itemId } = req.params;

            const result = await pedidoRepository.excluirItem(itemId);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    editarStatus: async (req, res) => {
        try {
            const { pedidoId } = req.params;
            const { status } = req.body;

            const result = await pedidoRepository.editarStatus(pedidoId, status);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    listar: async (req, res) => {
        try {
            const result = await pedidoRepository.listarPedidos();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const { pedidoId } = req.params;
            const { status } = req.body;

            const result = await pedidoRepository.editarPedido(pedidoId, status);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const { pedidoId } = req.params;

            const result = await pedidoRepository.deletarPedido(pedidoId);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
};

export default pedidoController;