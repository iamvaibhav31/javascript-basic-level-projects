// challenger 1
function agetodays(){
    var atd = document.getElementById("input").value
    if (atd==0){
        document.getElementById("result").innerHTML="enter some thing in age colum "
    }else{
        document.getElementById("result").innerHTML="Total day you live tille know :- " + 365*atd+"days"
    }
}

function inputreset(){
//    var old_html = $("#con-process").html()
//    $("#con-process").html(old_html)
//    document.getElementById("input").reset()
}

// callenge 2

function genratecat(){
    let image = document.createElement("img")
    let div = document.getElementById("con1-catgen")
    image.src="assets/images/Q.png"
    image.style.width="120px"
    image.style.height="120px"
    div.appendChild(image)
}

// challenge 3



function decidewinner(hc,bc){
    if ((hc=="rock" && bc=="scissors")||(hc=="scissors" && bc=="paper")||(hc=="paper" && bc=="rock")){
        return [1,0] // human winning condition
    }else if ((bc=="rock" && hc=="scissors")||(bc=="scissors" && hc=="paper")||(bc=="paper" && hc=="rock")){
        return [0,1] // conputer winning condition
    }else if (hc == bc){
        return[0.5,0.5] // tie condition
    }
}

function finalmessage(r){
    //console.log(r);
    if (r[0]===1){
        //console.log("you wins");
        return "you wins"
    }else if (r[0]===0){
        //console.log("computer wins");
        return "computer wins"
    }else if (r[0]===0.5){
        //console.log("its tie");
        return "its tie"
    }
}

function resultrepresentation(r){
    let row = document.createElement("li")
    let human= document.createTextNode(""+r[0]+"")
    let computer= document.createTextNode(""+r[1]+"")
    
    document.querySelector("#human-row").appendChild(row.appendChild(human))
    // let human_result = document.getElementById("human-row")
    // // let human_row = row.appendChild(human)
    // human_result.appendChild(row.appendChild(human))
    document.querySelector("#bot-row").appendChild(row.appendChild(computer))
    // let computer_result = document.getElementById("bot-row")
    // // let computer_row=row.appendChild(computer)
    // computer_result.appendChild(row.appendChild(computer))
    
    let total_human = 0
    total_human += r[0]
    
    let total_computer = 0
    total_computer += r[1]

    console.log(total_human , total_computer);
    // document.querySelector("#human-score").innerHTML = total_human
    // document.querySelector("#bot-score").innerHTML=total_computer
    // console.log(total_computer);
    // let s_human = document.createTextNode(total_human)
    // let human_score = document.getElementById("human-score")
    // human_score.appendChild(s_human)
    // let s_computer = document.createTextNode(total_computer)
    // let bot_score = document.getElementById("bot-score")
    // bot_score.appendChild(s_computer)
}

function frontend(hc , bc , m , r){
    //let images = {
    //    "rock":document.getElementById("rock"),
    //    "paper":document.getElementById("paper"),
    //    "scissors":document.getElementById("scissors")
    //}

    let represent_hc = document.getElementById("rock")
        represent_hc.innerHTML = hc 
        represent_hc.style.pointerEvents="none"
    let represent_bc = document.getElementById("scissors")
        represent_bc.innerHTML = bc
        represent_bc.style.borderColor="red"
        represent_bc.style.pointerEvents="none"
    let represent_mes = document.getElementById("paper")
        represent_mes.innerHTML = m
        represent_mes.style.border="none"
        represent_mes.style.pointerEvents="none"

    resultrepresentation(r)
}



function rpsgame(yourchoice){
    // console.log(yourchoice.id);
    let choices = ["rock","paper","scissors"]
    let humanchoice , botchoice
    humanchoice = yourchoice.id
    botchoice = choices[Math.floor(Math.random()*choices.length)]
    //console.log(humanchoice)
    //console.log(botchoice )
    let result = decidewinner(humanchoice,botchoice) 
    // cases of return by decidewinner
    // case 1 [0,1] human loss and bot win
    //case 2 [1,0] human win and bot loss
    //case 3 [0.5 ,0.5]  its tie
    //console.log(result)
    let message = finalmessage(result)
    //console.log(message)
    frontend(humanchoice,botchoice,message,result)

}

function resetgame(){
    // //$("#").load(self)
    // document.getElementById("con2-btn").innerHTML=document.getElementById("con2-btn").innerHTML

    var rock = document.getElementById("rock")
        rock.innerHTML="rock"
        rock.style.pointerEvents="auto"
    var paper = document.getElementById("paper")
        paper.innerHTML="paper"
        paper.style.border="2px solid blue"
        paper.style.pointerEvents="auto"
    var scissors = document.getElementById("scissors")
        scissors.innerHTML="scissors"
        scissors.style.borderColor="blue"
        scissors.style.pointerEvents="auto"
}


// challange 4

let blackjackgame = {
    "you":{"scorespam":"#your-blackjack-result","div":"#your-card-box","score":0},
    "dealer":{"scorespam":"#dealer-blackjack-result","div":"#dealer-card-box","score":0},
    "cards":["2","3","4","5","6","7","8","9","10","K","Q","J","A"],
    "cardmaps":{"2":2 , "3":3 ,"4":4 ,"5":5 ,"6":6 ,"7":7 ,"8":8 , "9":9 ,"10":10 , "K":10 , "Q":10 , "J":10 , "A":[1,11]}
}

const you = blackjackgame["you"]
const dealer = blackjackgame["dealer"]
const cards = blackjackgame["cards"]
const cardmaps = blackjackgame["cardmaps"]

let hitsound = new Audio("assets/sounds/swish.m4a")

document.querySelector("#blackjack-hit-btn").addEventListener("click",blackjackhit)
document.querySelector("#blackjack-stand-btn").addEventListener("click",blackjackstand)
document.querySelector("#blackjack-deal-btn").addEventListener("click",blackjackdeal)

function blackjackhit(){
    let card = randomcards()
    //alert("hii")
    updatescore(card , you)
    showcard(card , you)
    showscore(you)
}

function randomcards(){
    let randomindex = Math.floor(Math.random()*cards.length)
    return cards[randomindex]
}

function updatescore(card , activepalyer){
    if (card=="A"){
        if (activepalyer["score"]+cardmaps[card][1]<=21){
            activepalyer["score"] += cardmaps[card][1]        
        }else{
            activepalyer["score"] += cardmaps[card][0]
        }
    }else{
        activepalyer["score"] += cardmaps[card]
    }
    // console.log(activepalyer["score"]);
}

function showscore(activepalyer){
    if (activepalyer["score"]>21){
        document.querySelector(activepalyer["scorespam"]).innerHTML = "BUST!"
        document.querySelector(activepalyer["scorespam"]).style.color = "red"
    }else{
        document.querySelector(activepalyer["scorespam"]).innerHTML = activepalyer["score"]
    }
    
}

function showcard(card , activepalyer){
    if (activepalyer["score"]<=21){
        let cardimage = document.createElement("img")
        cardimage.src="assets/images/"+card+".png"
        cardimage.style.width="120px"
        cardimage.style.height="120px"
        document.querySelector(activepalyer["div"]).appendChild(cardimage)
        hitsound.play()
    }

}

function blackjackdeal(){
    let yourimage = document.querySelector(you["div"]).querySelectorAll("img")
    let dealarimage = document.querySelector(dealer["div"]).querySelectorAll("img")
    //console.log(yourimage);
    // console.log(yourimage);
    // console.log(dealarimage);
    computwinner(yourimage.length , dealarimage.length)

    for (i=0;i<yourimage.length;i++){
        yourimage[i].remove()
    }
    for (i=0;i<dealarimage.length;i++){
        dealarimage[i].remove()
    }

    you["score"] = 0
    dealer["score"] = 0

    document.querySelector(you["scorespam"]).innerHTML=0
    document.querySelector(you["scorespam"]).style.color="black"
    document.querySelector(dealer["scorespam"]).innerHTML=0
    document.querySelector(dealer["scorespam"]).style.color="black"
}

function blackjackstand(){
    let card = randomcards()
    //alert("hii")
    updatescore(card , dealer)
    showcard(card , dealer)
    showscore(dealer)
}

function computwinner(yourlength , dealerlength){

    if (yourlength > dealerlength){
        console.log("you win")
    }else if (yourlength < dealerlength){
        console.log("you lose")
    }else{
        console.log("it draw")
    }

}
