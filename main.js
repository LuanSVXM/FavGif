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








const ConsultaGhyp = async () => {
    let key = 'ExHEcIhg4AwR67AkiGippRGe2vX7CaiT'
   fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}`)
   .then( res => res.json())
   .then(data => {
       console.log(data.data)
       data.data.map(e => {
        document.querySelector('main').innerHTML+=`
        <div class='containerimgsTranding'> 
        
        <img src=${e.images.downsized.url} />
        
        
            <div>
                <span>${e.title} </span>
            </div>
        
        
        
        
        </div>
    
    `;
       })

       let e = document.querySelectorAll('.containerimgsTranding')
       Array.from(e).map(r => {
           r.addEventListener('mouseover', (e)=>{
              console.log(r.children[0].src); 
              document.querySelector('.container').style.backgroundImage=`url(${r.children[0].src})`
           })
       })

   })
   
   .catch( err => {
       console.error(err)
   })
}

ConsultaGhyp()




