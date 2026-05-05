export class ItensPedido{
    #id;
    #pedidoId;
    #produtoid;
    #quantidade;
    #valorItem;

    constructor(pProdutoId, pQuantidade, pValorItem, pId, pPedidoId){
        this.#produtoid = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
        this.#pedidoId = pPedidoId;
    }

    get id(){
        return this.#id;
    }
    get pedidoId(){
        return this.#pedidoId;
    }
    get produtoId(){
        return this.#produtoid;
    }
    get quantidade(){
        return this.#quantidade;
    }
    get valorItem(){
        return this.#valorItem;
    }

    set id(value){
        this.#validarId(value);
        this.#id=value;
    }
    set pedidoId(value){
        this.#validarPedidoId(value);
        this.#pedidoId=value;
    }
    set produtoId(value){
        this.#validarProdutoId(value);
        this.#produtoid=value;
    }
    set quantidade(value){
        this.#validarQuantidade(value);
        this.#quantidade=value;
    }
    set valorItem(value){
        this.#validarValorItem(value);
        this.#valorItem=value;
    }

    #validarId(value){
        if(!value && value <= 0){
            throw new Error("Verifique o id informado");
        }
    }
    #validarPedidoId(value){
        if(!value && value <= 0){
            throw new Error("Verifique o id do pedido");
        }
    }
    #validarProdutoId(value){
        if(!value && value <= 0){
            throw new Error("Verifique o id produto informado");
        }
    }
    #validarQuantidade(value){
        if(!value && value <= 0){
            throw new Error("Nao foi possivel obter a quantidade");
        }
    }
    #validarValorItem(value){
        if(!value || value <= 0){
            throw new Error("Informe um valor para o item");
        }
    }
    static calcularSubTotalItens(itens){
        return itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade), 0
        );
    }

    static criar(dados){
        return new ItensPedido(dados.produtoIdId, dados.quantidade, dados.valorItem, null);

    }
    static editar(dados){
        return new Pedido(ddados.produtoIdId, dados.quantidade, dados.valorItem, id, dados.pedidoId);
        
    }
  
  
}
