const key = 'ExHEcIhg4AwR67AkiGippRGe2vX7CaiT';

const Verificar = (a) => {
    let vetor = []
    if(localStorage.getItem('Gifs')) {
       vetor = JSON.parse(localStorage.getItem('Gifs'))
    }
    vetor = vetor.filter(f => f.id == a)
    if(vetor[0] == undefined){
        return false;
    }else {
        return true;
    }
}

const Save = async(container) => {
    console.log('entrou em salvar?')
    let vetor = []
    if(localStorage.getItem('Gifs')) {
        vetor = JSON.parse(localStorage.getItem('Gifs'))
    }
    let Gif = {
        id: container.parentNode.parentNode.parentNode.id,
        nome: container.parentNode.parentNode.parentNode.children[2].children[0].children[0].textContent ,
        criador: container.parentNode.parentNode.parentNode.children[2].children[0].children[1].textContent, 
        url: container.parentNode.parentNode.parentNode.children[1].src , 
        tags: ''
    }
    vetor.push(Gif)
    localStorage.setItem('Gifs', JSON.stringify(vetor));
}


const Retirar = async(container) => {
    console.log('entrou no retirar')
    let vetor = []
    if(localStorage.getItem('Gifs')) {
        vetor = JSON.parse(localStorage.getItem('Gifs'))
        console.log(vetor)
    }
    let vetor2 = vetor.filter(f => f.id !=  container.parentNode.parentNode.parentNode.id )
    localStorage.setItem('Gifs', JSON.stringify(vetor2));
    console.log(localStorage.getItem('Gifs'))
   
}

const ConsultaGhyp = async (offset) => {
    if(offset != 1) {
        offset = offset * 15;
    }
   fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=15&offset=${offset}`)
   .then( res => res.json())
   .then(data => {
       console.log(data.data)
       if(document.querySelector('.noResult')){
        document.querySelector('.noResult').remove()
       }
       MontarLista(data.data);
       AtivarHover();
       return false;
   })
   
   .catch( err => {
       console.error(err)
   })
}



const PesquisaGhyp = async (offset,pesquisa) => {
    if(offset != 1) {
        offset = offset * 6
    }
   fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&limit=6&offset=${offset}&q=${pesquisa}`)
   .then( res => res.json())
   .then(data => {
    MontarLista(data.data);
    AtivarHover();
       if(document.querySelector('.containergifs').innerHTML == ""){
        document.querySelector('.containergifs').innerHTML+= `
            <div class='noResult'> 
                <img src='./block.png' alt='Sem Resultados' />
                <span> Nenhum resultado encontrado... </span>
            
            </div>
        
        ` 
       }
       return false;
   })
   
   .catch( err => {
       console.error(err)
   })
}


const MontarLista = (dados) => {
    dados.map(parametros =>{
    document.querySelector('.containergifs').innerHTML+=`
  
    <div class='containerimgsTranding' id="${parametros.id}"> 
    
    <div class="containerbuttonadd" title="Adicionar aos favoritos">
         
        <div class="AddFavorito">
    
            <span class="material-icons ${Verificar(parametros.id) == false? "desativo" : "ativo"} ">
    
                favorite
    
            </span>
     
    
        <span class="material-icons ${Verificar(parametros.id) == false? "ativo" : "desativo"}"  >
        
               favorite_border
    
          </span>
        
         </div>


    </div>

        <img src=${parametros.images.downsized.url}  loading="eager" />
        
        <div> 
            
            <div> 
                <span> ${parametros.title.split('by')[0]}</span>
                
                <a  title="${parametros.username == ""? "Gyphy" : parametros.username}" href="https://giphy.com/${parametros.username}" target="_blank"> By @${parametros.username == ""? "Gyphy" : parametros.username} </a>
            
            </div>

        
        </div>

    </div>`;
});

}

const MontarFavoritos = (dados) => {
    dados.map(parametros =>{
    document.querySelector('.containergifs').innerHTML+=`
  
    <div class='containerimgsTranding' id="${parametros.id}"> 
    
    <div class="containerbuttonadd" title="Adicionar aos favoritos">
         
        <div class="AddFavorito">
    
            <span class="material-icons ${Verificar(parametros.id) == false? "desativo" : "ativo"} ">
    
                favorite
    
            </span>
     
    
        <span class="material-icons ${Verificar(parametros.id) == false? "ativo" : "desativo"}"  >
        
               favorite_border
    
          </span>
        
         </div>


    </div>

        <img src=${parametros.url}  loading="eager" />
        
        <div> 
            
            <div> 
                <span> ${parametros.nome}</span>
                
                <a  title="${parametros.criador == ""? "Gyphy" : parametros.criador}" href="https://giphy.com/${parametros.criador}" target="_blank"> ${parametros.criador == ""? "Gyphy" : parametros.criador} </a>
            </div>

        
        </div>

    </div>`;
});
        AtivarHover();

}

const AtivarHover = () => {

    const trocaclasses = (icon, classremove, classadd) => {
        icon.classList.add(`${classadd}`);
        icon.classList.remove(`${classremove}`);
    };

    let containersimgs = document.querySelectorAll('.containerimgsTranding')
       Array.from(containersimgs).map(r => {
           r.addEventListener('mouseover', (e)=>{
              document.querySelector('.container').style.backgroundImage=`url(${r.children[1].src})`
           })
       })

    let ButoesAddFav = document.querySelectorAll('.containerbuttonadd')
        Array.from(ButoesAddFav).map(Butao => {
            Butao.addEventListener('click', (ButaoDados)=>{
            [...ButaoDados.currentTarget.children[0].children].map((icons) => {
               if([...icons.classList].indexOf('ativo') == 1 ){
                    trocaclasses(icons,'ativo','desativo');
                   
               }else{
                    trocaclasses(icons,'desativo','ativo');
                    
               }    
            })
              if([...ButaoDados.currentTarget.children[0].children[0].classList].indexOf('ativo') == 1){
                  console.log('entro?')
                  Save(ButaoDados.currentTarget.children[0].children[0])
              }else{
                 console.log('entro2?')
                 Retirar(ButaoDados.currentTarget.children[0].children[1])
              } ;
            })
        })
    
    

}


export {ConsultaGhyp, PesquisaGhyp, MontarFavoritos}