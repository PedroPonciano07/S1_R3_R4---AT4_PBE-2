import { connection } from "../configs/Database.js";

const pedidoRepository = {

    criar: async (pedido, itens) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();


            console.log("PEDIDO:", {
                clienteId: pedido.clienteId,
                subTotal: pedido.subTotal,
                status: pedido.status
            });

            const sqlPed = `
                INSERT INTO pedidos (ClienteId, SubTotal, STATUS)
                VALUES (?, ?, ?)
            `;

            const valuesPed = [
                pedido.clienteId ?? null,
                pedido.subTotal ?? 0,
                pedido.status ?? "ABERTO"
            ];

            const [rowsPed] = await conn.execute(sqlPed, valuesPed);

            for (let item of itens) {
                const sqlItens = `
                    INSERT INTO itens_pedidos (pedidoId, produtoId, quantidade, valorItem)
                    VALUES (?, ?, ?, ?)
                `;

                const valuesItens = [
                    rowsPed.insertId,
                    item.produtoId,
                    item.quantidade,
                    item.valorItem
                ];

                await conn.execute(sqlItens, valuesItens);
            }

            await conn.commit();

            return { message: "Pedido criado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    adicionarItem: async (pedidoId, produtoId, quantidade, valorItem) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                `INSERT INTO itens_pedidos (pedidoId, produtoId, quantidade, valorItem)
                 VALUES (?, ?, ?, ?)`,
                [pedidoId, produtoId, quantidade, valorItem]
            );

            await conn.execute(
                `UPDATE pedidos 
                 SET SubTotal = (
                    SELECT SUM(valorItem * quantidade) 
                    FROM itens_pedidos 
                    WHERE pedidoId = ?
                 )
                 WHERE id = ?`,
                [pedidoId, pedidoId]
            );

            await conn.commit();

            return { message: "Item adicionado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editarItem: async (itemId, quantidade) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const [item] = await conn.execute(
                "SELECT pedidoId FROM itens_pedidos WHERE id = ?",
                [itemId]
            );

            const pedidoId = item[0].pedidoId;

            await conn.execute(
                `UPDATE itens_pedidos 
                 SET quantidade = ? 
                 WHERE id = ?`,
                [quantidade, itemId]
            );

            await conn.execute(
                `UPDATE pedidos 
                 SET SubTotal = (
                    SELECT SUM(valorItem * quantidade) 
                    FROM itens_pedidos 
                    WHERE pedidoId = ?
                 )
                 WHERE id = ?`,
                [pedidoId, pedidoId]
            );

            await conn.commit();

            return { message: "Item atualizado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    excluirItem: async (itemId) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const [item] = await conn.execute(
                "SELECT pedidoId FROM itens_pedidos WHERE id = ?",
                [itemId]
            );

            const pedidoId = item[0].pedidoId;

            await conn.execute(
                "DELETE FROM itens_pedidos WHERE id = ?",
                [itemId]
            );

            await conn.execute(
                `UPDATE pedidos 
                 SET SubTotal = IFNULL((
                    SELECT SUM(valorItem * quantidade) 
                    FROM itens_pedidos 
                    WHERE pedidoId = ?
                 ), 0)
                 WHERE id = ?`,
                [pedidoId, pedidoId]
            );

            await conn.commit();

            return { message: "Item removido com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editarStatus: async (pedidoId, status) => {
        const conn = await connection.getConnection();

        try {
            await conn.execute(
                "UPDATE pedidos SET STATUS = ? WHERE id = ?",
                [status, pedidoId]
            );

            return { message: "Status atualizado com sucesso" };

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },


    listar: async () => {
        const conn = await connection.getConnection();

        try {
            const [pedidos] = await conn.execute('SELECT * FROM pedidos');

            for (let pedido of pedidos) {

                const [itens] = await conn.execute(
                    'SELECT * FROM itens_pedidos WHERE pedidoId = ?',
                    [pedido.id]
                );

                pedido.itens = itens;
            }

            return pedidos;

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },


    editar: async (pedidoId, status) => {
        const conn = await connection.getConnection();

        try {
            await conn.execute(
                'UPDATE pedidos SET STATUS = ? WHERE id = ?',
                [status, pedidoId]
            );

            return { message: "Pedido atualizado com sucesso" };

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },


    deletar: async (pedidoId) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                'DELETE FROM itens_pedidos WHERE pedidoId = ?',
                [pedidoId]
            );

            await conn.execute(
                'DELETE FROM pedidos WHERE id = ?',
                [pedidoId]
            );

            await conn.commit();

            return { message: "Pedido deletado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default pedidoRepository;