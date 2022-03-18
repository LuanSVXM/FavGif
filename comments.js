/*
---------------------- possivel paginador -------------------------------------------
const CriarPaginacao = (pg) => {
   
    document.querySelector('.pag-selecionado').classList.remove('pag-selecionado');
    paginacao = parseInt(pg) // 2 -> 
    document.querySelector('.paginacao').innerHTML = '<div class="pg1"> < </div>'
    for(let i = 0; i < 5; i++){
        let pa = paginacao + i;
        if(paginacao == pa) {
            document.querySelector('.paginacao').innerHTML += `<div class="pg pag-selecionado">${pa}</div>`
        }else{
            document.querySelector('.paginacao').innerHTML += `<div class="pg">${pa}</div>`
        }
        
    }
    document.querySelector('.paginacao').innerHTML += '<div class="pg1"> > </div>' 
    let pgs = document.querySelectorAll('.pg')
    Array.from(pgs).map(pg => {
        pg.addEventListener('click', () => {
            CriarPaginacao(pg.textContent)
        })
    })
    let pgs1 = document.querySelectorAll('.pg1')
    Array.from(pgs1).map((pg1,index) => {
        pg1.addEventListener('click', () => {
            
           if(index == 0){
               if(paginacao > 1) {
                   paginacao--
                   CriarPaginacao(paginacao)
               } 
           }else{
            paginacao++
            CriarPaginacao(paginacao)
           }
        })
        })
    ConsultaGhyp(paginacao)
  
}

ConsultaGhyp(paginacao)

let pgs = document.querySelectorAll('.pg')
    Array.from(pgs).map(pg => {
    pg.addEventListener('click', () => {
        CriarPaginacao(pg.textContent)
    })
    })


let pgs1 = document.querySelectorAll('.pg1')

Array.from(pgs1).map((pg1,index) => {
    pg1.addEventListener('click', (pg1) => {
       if(index == 0){
           if(paginacao > 1) {
               paginacao--
               CriarPaginacao(paginacao)
           } 
       }else{
        paginacao++
        CriarPaginacao(paginacao)
       }
    })
    })

----------------- Butao de adicionar dentro do Modelador de Gifs --------------------------
     <div> 

             <div> 
                Adicionar aos Favoritos
                <span class="material-icons">
                         favorite
                </span>
             </div>

            </div

*/
  