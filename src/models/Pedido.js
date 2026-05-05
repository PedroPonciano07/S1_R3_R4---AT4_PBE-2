export class Pedido {
    #id;
    #clienteId;
    #subTotal;
    #status;
    #dataCad;

    constructor(pClienteId, pSubtotal, pStatus, pId = null) {
        this.#clienteId = pClienteId;
        this.#subTotal = pSubtotal;
        this.#status = pStatus;
        this.#id = pId;
    }

    get id() {
        return this.#id;
    }

    get clienteId() {
        return this.#clienteId;
    }

    get subTotal() {
        return this.#subTotal;
    }

    get status() {
        return this.#status;
    }

    
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    set clienteId(value) {
        this.#validarClienteId(value);
        this.#clienteId = value;
    }

    set subTotal(value) {
        this.#validarSubTotal(value);
        this.#subTotal = value;
    }

    set status(value) {
        this.#status = value;
    }

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o id informado");
        }
    }

    #validarClienteId(value) {
        if (!value || value <= 0) {
            throw new Error("Verifique o id cliente informado");
        }
    }

    #validarSubTotal(value) {
        if (!value || value <= 0) {
            throw new Error("Nao foi possivel obter o subtotal");
        }
    }

    static criar(dados) {
        return new Pedido(
            dados.clienteId,
            dados.subTotal,
            dados.status
        );
    }

    static editar(dados) {
        return new Pedido(
            dados.clienteId,
            dados.subTotal,
            dados.status,
            dados.id
        );
    }
}