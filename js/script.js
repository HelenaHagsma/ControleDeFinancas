
/*----------CADASTRAR SALÁRIO--------- */
/*Seleciona o botão "Cadastrar Salário" e adiciona um evento de clique */
document.getElementById("cadastrarSalario").addEventListener("click", function () {
   
    /*Pega o valor digitado no input de salário*/
    var salario = document.getElementById("salario").value; 
    /*Verifica se o campo está vazio*/
    if (salario == "") {
        alert("Digite um salário.");
        return;
    }
    /*Salva o salário no LocalStorage (armazenamento local do navegador)*/
    localStorage.setItem("salario", salario);
    alert("Salário cadastrado.");
})

/*----------ADCIONAR DESPESAS---------- */
/*Seleciona o formulário de cadastro de despesas e adiciona um evento ao enviar*/
document.getElementById("formulario").addEventListener("submit",function(cadastrar){

    cadastrar.preventDefault(); /*Evita que a página seja recarregada ao enviar o formulário*/

        var nome = document.getElementById("nome").value
        var data = document.getElementById("data").value
        var valor = document.getElementById("valor").value

        /*Objeto: despesa */
        var despesa = {nome: nome, data: data, valor: parseFloat(valor)}

        /*Recupera a lista de despesas do LocalStorage (ou cria uma lista vazia se não houver)*/
        var listaDespesas = JSON.parse(localStorage.getItem("lista")) || []

        listaDespesas.push(despesa) /*adiciona nova despesa à lista */

        localStorage.setItem("lista", JSON.stringify (listaDespesas)) /*Salva lista atuaizada no localStorage */

        document.getElementById("formulario").reset() /*limpa formulário */
        exibirDespesas() /*Chama função para ser exibida na tela */

})

/*------------EXIBIR DESPESAS----------- */
function exibirDespesas(){

    /*Recupera a lista de despesas do LocalStorage ou cria lista vazia*/
    var listaDespesas = JSON.parse(localStorage.getItem("lista")) || []
    var output = document.getElementById("output") /*seleciona elemento ul */
    output.innerHTML="" /*limpa conteudo anterior do ul */

    for(let i=0; i<listaDespesas.length; i++){ /*percorre cada despesa da lista */
        let li = document.createElement("li") /*cria elemento li para cada despesa */
        li.textContent = "Nome: "+listaDespesas[i].nome + "| Data: "+ listaDespesas[i].data + "| Valor: R$"+listaDespesas[i].valor /*define conteudo da li */

        output.appendChild(li) /*li é exibida dentro da ul */
    }
}

/*------------CRIA E EXIBE RESUMO FINANCEIRO PELO BOTÃO------------ */
/*Seleciona o botão btnexibir e adiciona evento de clique*/
document.getElementById("btnexibir").addEventListener("click", function(){
    var listaResumo = document.getElementById("listaResumo")
    listaResumo.innerHTML="";

    /*Recupera o salário do LocalStorage e converte para número*/
    var salario = parseFloat(localStorage.getItem("salario"))

    /*Recupera a lista de despesas*/
    var listaDespesas = JSON.parse(localStorage.getItem("lista"))|| []

    var totalDespesas = 0; /*Inicializa variável para somar todas as despesas*/

    for (let i = 0; i < listaDespesas.length; i++) { /*soma o valor de todas as despesas */
    totalDespesas = totalDespesas + parseFloat(listaDespesas[i].valor); 
    }

    var saldoFinal = salario - totalDespesas /*calcula saldo final */


    /*Cria elementos <li> para mostrar o salário, total de despesas e saldo final*/
    var liSAL = document.createElement("li")
    liSAL.style.color="#ffffff"
    liSAL.textContent = "Seu salário é: R$"+salario

    var liTD = document.createElement("li")
    liTD.style.color="#ff0000ff"
    liTD.textContent = "Suas despesas totais são: R$"+ parseFloat(totalDespesas)

    if(saldoFinal<0){
    var liSF = document.createElement("li")
    liSF.style.color = "#ff7300ff"
    liSF.textContent = "Seu saldo final é: R$"+saldoFinal
        } else{
        var liSF = document.createElement("li")
    liSF.style.color = "#3cff00ff"
    liSF.textContent = "Seu saldo final é: R$"+saldoFinal
    }

    /*adiciona à ul */
    listaResumo.appendChild(liSAL) /*salario */
    listaResumo.appendChild(liTD) /*total despesas */
    listaResumo.appendChild(liSF) /*saldo final */

}) /*Botão para apagar todas as despesas */
    document.getElementById("btnapagar").addEventListener("click", function(){
    localStorage.removeItem("lista");
    exibirDespesas();
})