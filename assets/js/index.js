
// pegar valores dos elementos
let idade = document.getElementById('idade');
let peso = document.getElementById('peso');
let altura = document.getElementById('altura');

var sexo = null;

// clicar no botão masculino
document.getElementById('masculino').onclick = function (){
    sexo = 'M';
    document.getElementById('res_Sexo').innerHTML = "Homem";
}


//clicar no botão feminino
document.getElementById('feminino').onclick = function (){
    sexo = 'F';
    document.getElementById('res_Sexo').innerHTML = "Mulher";
}

var objetivo = null;

// clicar no botão perder peso
document.getElementById('perder').onclick = function (){
    objetivo = 0;
    document.getElementById('res_Objetivo').innerHTML = "Perder";
}

// clicar no botão ganhar massa
document.getElementById('ganhar').onclick = function (){
    objetivo = 1;
    document.getElementById('res_Objetivo').innerHTML = "Ganhar";
}


// clicar no botão ver resultado
document.getElementById('btn_calcular').onclick = function (){
    if(idade.value.length > 0 & peso.value.length > 0 & altura.value.length > 0 & sexo != null & objetivo != null){
        ocultarView();
        // retornar o resultado        
        document.getElementById('msg').innerHTML = "";
        document.getElementById('agua').innerHTML = Math.ceil(tomarAgua(peso.value)) + " litros";

        let resultado = tmb_Calcular(sexo, objetivo, idade.value, peso.value, altura.value);
        document.getElementById('res').innerHTML = resultado;

    }else{
        //alertar que está faltando algum paramentro
        document.getElementById('msg').innerHTML = "***Ops! falta alguma coisa...";
    }
}

//novo calculo
document.getElementById('btn_novo').onclick = function(){
    ocultarView();
    idade.value = '';
    peso.value = '';
    altura.value = '';
    sexo = null;
    objetivo = null;
    document.getElementById('res_Sexo').innerHTML = "";
    document.getElementById('res_Objetivo').innerHTML = "";
}

//esconder resultado
function ocultarView(){
    var resultadoTag = document.getElementById('resultado').style.display;

    if(resultadoTag == 'none'){
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('novo').style.display = 'block';
        document.getElementById('dados').style.display = 'none';
        document.getElementById('calcular').style.display = 'none';
    }else{
        document.getElementById('resultado').style.display = 'none';
        document.getElementById('novo').style.display = 'none';
        document.getElementById('dados').style.display = 'block';
        document.getElementById('calcular').style.display = 'block';
    }
}

ocultarView();


//funções para saber o tanto de litros de agua a pessoa deve tomar
function tomarAgua(peso){
    let agua = peso * 0.05;
    return agua;
}

//calcular metabolimo basal
function tmb_Calcular(sexo, objetivo, idade, peso, altura){
    var metabolismo = null;
    let consumo = null;
    var text = null;
    // calculo por sexo
    if(sexo == 'M'){
        metabolismo = 66 + (13.7 * peso) + (5 * altura) - (6.8 * idade);
    }
    if(sexo == 'F'){
        metabolismo = 665 + (9.6 * peso) + (1.8 * altura) - (4.7 * idade);
    }

    //calculo por objetivo 1 - para ganhar 0 - para perder
    if(objetivo == 1){
        //arredondar para cima
        consumo = Math.ceil(metabolismo) + 1000;

        //texto para apresentar se dor ganho de massa
        text = 'Seu corpo precisa consumir <span>'+Math.ceil(metabolismo)+' kcal</span> por dia. Para você ganhar massa muscular, deverá consumir <span>'+Math.ceil(consumo)+' kcal</span> por dia e pegar leve nos cardios.';
    }
    if(objetivo == 0){
        //arredondar para baixo
        if(sexo == 'M'){
            consumo = metabolismo - 750;
        }

        if(sexo == 'F'){
            consumo = metabolismo - 500;
        }

        //texto para apresentar se for perder peso
        text = 'Seu corpo precisa consumir <span>'+Math.floor(metabolismo)+' kcal</span> por dia. Para você perder gordura, deverá consumir <span>'+Math.floor(consumo)+' kcal</span> por dia e gastar nos treinos diários no mínimo <span> 250 kcal</span>.';
    } 

    return text;
}