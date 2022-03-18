import {PesquisaGhyp, ConsultaGhyp, MontarFavoritos} from './Ghyp.js'

var paginacao = 1;

var paginacao_pesquisa = 1;

var block = false;

var limite_header =  document.querySelector('#nav').offsetTop;

const trocarfotos = () => {

    let documento = document.querySelector('.container');
    let valor = parseInt(documento.id);
    if(valor == 5) {
        valor = 0
    }
    valor++;
    document.querySelector('.container').style.backgroundImage=`url(./gifs/${valor}.gif)`
    document.querySelector('.container').id = valor;
} 

trocarfotos();

setInterval(trocarfotos, 15000);



const handleGhyp = async() => {
    if(!block && document.querySelector('#Search').value == '') {
        block = true;
        paginacao++;
       block = await ConsultaGhyp(paginacao)
    }

    if(!block && document.querySelector('#Search').value != '') {
        block = true;
        paginacao_pesquisa++; 
        block = await PesquisaGhyp(paginacao_pesquisa++ , document.querySelector('#Search').value)
    }

 }
 

document.querySelector('#Search').addEventListener('keydown', (e,f) => {
    document.querySelector('.containerordenar').style.display = 'none';
    setTimeout( () => { 
        block = false
        document.querySelector('.containergifs').innerHTML = '';
        paginacao_pesquisa= 1;
        if(document.querySelector('#Search').value == ''){
            paginacao = 1;
            ConsultaGhyp(paginacao)
        } 
        PesquisaGhyp(paginacao_pesquisa ,document.querySelector('#Search').value)
        
    }, 400);
   
})


document.querySelector('#btnpesquisa').addEventListener('click', (e,f) => {
    document.querySelector('.containerordenar').style.display = 'none';
    setTimeout( () => { 
        block = false
        document.querySelector('.containergifs').innerHTML = '';
        paginacao_pesquisa= 1;
        if(document.querySelector('#Search').value == ''){
            paginacao = 1;
            ConsultaGhyp(paginacao)
        } 
        PesquisaGhyp(paginacao_pesquisa ,document.querySelector('#Search').value)
        
    }, 400);
   
})

document.querySelector('#inicio').addEventListener('click', () => {
    document.querySelector('.containergifs').innerHTML = "";
    document.querySelector('.containerordenar').style.display = 'none';
    block = false;
    paginacao=1;
    ConsultaGhyp(paginacao)
})

document.querySelector('#FavGif').addEventListener('click', () => {
    document.querySelector('.containergifs').innerHTML = "";
    document.querySelector('.containerordenar').style.display = 'flex';
    if(localStorage.getItem('Gifs')){
        let gifs = JSON.parse(localStorage.getItem('Gifs'))
        block = true;
        MontarFavoritos(gifs)
    }
})

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        handleGhyp()
    }
        if(window.pageYOffset > limite_header){
            nav.classList.add("fixado");
        }else{
            console.log('entrou aqui')
            nav.classList.remove("fixado");
        }
};

function compare(a,b) {
    if (a.nome.toLocaleLowerCase().trim() < b.nome.toLocaleLowerCase().trim())
       return -1;
    if (a.nome.toLocaleLowerCase().trim() > b.nome.toLocaleLowerCase().trim())
      return 1;
    return 0;
  }
  
document.querySelector('#styledSelect1').addEventListener('change', (e) => {
    console.log("mudar")
    if(e.target.value == 1) {
        document.querySelector('.containergifs').innerHTML = "";
    document.querySelector('.containerordenar').style.display = 'flex';
    if(localStorage.getItem('Gifs')){
        let gifs = JSON.parse(localStorage.getItem('Gifs'));
        MontarFavoritos(gifs.sort(compare));
    }
}
});
ConsultaGhyp(paginacao)