
// evento inicial
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let player = ''
let warning = ''
let playing = false

// events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick)
})
// functios
function itemClick(event){
    let item = event.target.getAttribute('data-item') // isso é pra saber em quais dos itens foi clicado exatamente 
    if(playing && square[item] == ''){
        square[item] = player
        renderSquare()
        toggPlayer()
    }
}

reset()
function reset() {
    warning = ''

    let random = Math.floor(Math.random() * 2) // para gerar um numero aleatorio entre 0 e 1, o o floor é pra arredondar 
    if(random === 0){
        player = 'x'

    }else {
        player = 'o'
   

    };
    

    for(let i in square){
        square[i] = ''
    }
    
    playing = true

    renderSquare()
    renderInfo()

}

function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i]

    }

    checkGame()
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = player
    document.querySelector('.resultado').innerHTML = warning
}

function toggPlayer(){
    if (player === 'x'){
        player = 'o'
        document.querySelectorAll('.item').forEach(item =>{
            item.classList.add('color2')
            item.classList.add('fundo')
        })
    }else{
    player = 'x'
    document.querySelectorAll('.item').forEach(item =>{
        item.classList.remove('color2')
        item.classList.add('color1')
    })
    }

    renderInfo()
}

function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" Venceu !!'
        playing = false
    } else if(checkWinnerFor('o')){
        warning = 'O "o" Venceu !!'
        playing = false
    }else if(isFull()) {
        warning = 'Deu empate'
        player = false
    }
}

function checkWinnerFor(player){
    let possibilidade = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in possibilidade){
        let possibilidadeArray = possibilidade[w].split(',')
        let haswon = possibilidadeArray.every((option)=>{
            if(square[option]===player){
                return true
            }else{
                return false
            }
        })
        if(haswon){
            return true
        }
    }

}
function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false
        }
    }
    return true
}