export class ItensPedido {
    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    constructor(pProdutoId, pQuantidade, pValorItem, pId = null, pPedidoId = null) {
        this.#produtoId = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
        this.#pedidoId = pPedidoId;
    }

    get id() {
        return this.#id;
    }

    get pedidoId() {
        return this.#pedidoId;
    }

    get produtoId() {
        return this.#produtoId;
    }

    get quantidade() {
        return this.#quantidade;
    }

    get valorItem() {
        return this.#valorItem;
    }

    set id(value) {
        this.#id = value;
    }

    set pedidoId(value) {
        this.#pedidoId = value;
    }

    set produtoId(value) {
        this.#produtoId = value;
    }

    set quantidade(value) {
        this.#quantidade = value;
    }

    set valorItem(value) {
        this.#valorItem = value;
    }

    static calcularSubTotalItens(itens) {
        return itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade),
            0
        );
    }

    static criar(dados) {
        return new ItensPedido(
            dados.produtoId,
            dados.quantidade,
            dados.valorItem
        );
    }

    static editar(dados) {
        return new ItensPedido(
            dados.produtoId,
            dados.quantidade,
            dados.valorItem,
            dados.id,
            dados.pedidoId
        );
    }
}