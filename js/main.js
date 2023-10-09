const form = document.getElementById("novoItem"); //! recupera a tabela inteira já criada no HTML;
const lista = document.getElementById("lista"); //! recupera a lista já criada no HTML; 
const itens = JSON.parse(localStorage.getItem("banana")) || []; //! lista que recebe os itens atuais = [ itemAtual ] através do ".push()", caso o item dentro da lista não exista ainda ela é apenas uma lista vazia = ' [] ' que vai receber o "itemAtual" dai ela passa a ter algo dentro e se torna a então lista diretamente do localStorage;

itens.forEach((objetos_recebido) => { //! após o refresh do site envia todos itens salvos no localStorage para a função "criaElemento";
    criaElemento(objetos_recebido)
});

form.addEventListener("submit", (evento) => { //! quando houver
    evento.preventDefault();
    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };
    

    const existe = itens.find( elemento => elemento.nome === nome.value)

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
        
        criaElemento(itemAtual);
        
        itens.push(itemAtual)
    }
    

    localStorage.setItem("itens", JSON.stringify(itens)); //! envia para o localStorage a lista de itens já transformada em string pelo JSON;

    nome.value = ''; 
    quantidade.value = '';
})

function criaElemento(item) {
    const novoItem = document.createElement("li"); //! cria um elemento de lista;
    novoItem.classList.add("item"); //! adiciona ao elemento de lista criada a class "item";

    const numeroItem = document.createElement("strong"); //! cria um elemento de strong;
    numeroItem.innerHTML = item.quantidade; //! atribui ao conteúdo interior do elemento strong criado a quantidade recebida;

    numeroItem.dataset.id = item.id; //! o item.id é o numero total de itens da lista (se for criado apenas elemento o tamanho é 1) dai os que já existem recebem o id deles mesmos novamente e os que não existem e foram criados agora recebem o numero total de elementos da lista "itens";
    novoItem.appendChild(numeroItem); //! encaixa o numeroItem dentro do novoItem; 
    
    novoItem.innerHTML += item.nome; //! não só o numeroItem faz parte do innerHTML do novoItem mas tambem o nome agora, por isso o ' += ' ao inves de ' = ';

    novoItem.appendChild(botaoDeleta(item.id));
    
    lista.appendChild(novoItem); //! encaixa o novoItem dentro da lista;

};

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";
    
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    console.log(itens);

    localStorage.setItem("banana", JSON.stringify(itens))
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}
