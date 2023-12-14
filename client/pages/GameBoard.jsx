import {Table} from 'react-bootstrap';
import {useAppCtx} from '../utils/AppProvider'
import {useCardCtx} from '../utils/CardProvider'
import {useState, useEffect} from 'react'
import {newGameState} from '../utils/NewGameState'
import '../css/boardView.css'

export default function GameBoard(){
  const appCtx = useAppCtx()
  const cardCtx = useCardCtx()
  const newGame = newGameState()
  const boardRow = ([1, 2, 3, 4, 5])
  const boardCol = ([1, 2, 3, 4, 5])
  const [gameState, setGameState] = useState(newGame)
  const [playerGreen, setPlayerGreen] = useState()
  const [playerPurple, setPlayerPurple] = useState()
  const [gamePhase, setGamePhase] = useState("fresh")
  const [movingCard, setMovingCard] = useState({})
  const [dragHover, setDragHover] = useState({})
  const drawCardE = document.querySelector('.drawCard')

  var cellDraw = 0;

  useEffect(() => {


  },[gameState])


  
  const getPlayerControl=  (cell) =>{
    switch (gameState[cell].playerControl)
    {
      case "Green":
        return "green"
      case "Purple":
        return "purple"
      case "Wall":
        return "black"
      default:
        return "white"
    }
    
  }

  
  
  if (!appCtx?.user?.inventory) return <>Loading...</>
  if (!cardCtx?.cardIndex?.Trap) return <>Loading...</>

  const grabCard = (e) => {
    var tempMovingCard = playerGreen.hand.filter(x => x.cardId == e.target.id)
    setMovingCard(tempMovingCard[0])
    drawCardE.classList.remove('redrawCard')
  }

//Functionality for dropping a card onto the board
  const dropCard = (e) => {
    if (dragHover.src.substr(-9,9) === "empty.png"){
      //Grabs game state and edits who owns the spot
      var tempGameState = gameState
      tempGameState[dragHover.id].occupied = true
      tempGameState[dragHover.id].playerControl = "Green"
      tempGameState[dragHover.id].cardId = movingCard.cardId
      //Submits edits
      setGameState(tempGameState)
      //Grabs Player state and removes the card from hand
      var tempPlayerState = playerGreen
      const attackDirections = tempPlayerState.hand.find((id) => id?.cardId == movingCard.cardId).direction
      boardAttack(attackDirections)
      tempPlayerState.hand.splice(tempPlayerState.hand.findIndex(id => id?.cardId == movingCard.cardId), 1)
      //Submits edit
      setPlayerGreen(tempPlayerState)
      //Clears draghover
      setDragHover(null)

      drawCard()

    }

  }

  const dragEnter = (e) => {
    setDragHover(e.target)
  }

  const drawCard = () => {
    var tempPlayer = playerGreen
    drawCardE.style.setProperty('--animation', 'paused')

    
    if (playerGreen.cardDeck.length > 0){
      var randomDraw = Math.floor(Math.random() * (tempPlayer.cardDeck.length - 0 + 1) + 0)
      tempPlayer.hand = [...tempPlayer.hand, tempPlayer.cardDeck[randomDraw]]
      tempPlayer.cardDeck.splice(randomDraw, 1)
      drawCardE.style.setProperty('--animation', 'running')
      drawCardE.classList.add('redrawCard')
    }
  }

  const boardAttack = async (directions) => {
    var startCell = Number(dragHover.id)
    var tempGameState = gameState
    if (directions.substr(0,1) == 1){
      for (let i = 0; i < 6; i++)
      {if (startCell-(i*6) < 0) break;
       if (tempGameState[startCell-(i*6)].tileRow == tempGameState[startCell].tileRow-i && tempGameState[startCell-(i*6)].tileCol == tempGameState[startCell].tileCol-i )
          {if (tempGameState[startCell-(i*6)].cardId == "empty")
          {
            tempGameState[startCell-(i*6)].playerControl = "Green"
          }
        }else break
      }
    }
    if (directions.substr(1,1) == 1){
      for (let i = 0; i < 6; i++)
      { if (startCell-(i*5) < 0)break;
       if (tempGameState[startCell-(i*5)].tileCol == tempGameState[startCell].tileCol && tempGameState[startCell-(i*5)].tileRow == tempGameState[startCell].tileRow-i)
          {if (tempGameState[startCell-(i*5)].cardId == "empty")
            {
              tempGameState[startCell-(i*5)].playerControl = "Green"
            }
          }else break
      }
    }
    if (directions.substr(2,1) == 1){
      for (let i = 0; i < 6; i++)
      { if (startCell-(i*4) < 0)break;
       if (tempGameState[startCell-(i*4)].tileRow == tempGameState[startCell].tileRow-i && tempGameState[startCell-(i*4)].tileCol == tempGameState[startCell].tileCol+i )
          {if (tempGameState[startCell-(i*4)].cardId == "empty")
            {
              tempGameState[startCell-(i*4)].playerControl = "Green"
            }
          }else break
      }
    }
    if (directions.substr(3,1) == 1){
      for (let i = 0; i < 6; i++)
      { if (startCell-(i*1) < 0)break;
       if (tempGameState[startCell-(i*1)].tileRow == tempGameState[startCell].tileRow && tempGameState[startCell-(i*1)].tileCol == tempGameState[startCell].tileCol-i)
          {if (tempGameState[startCell-(i*1)].cardId == "empty")
            {
              tempGameState[startCell-(i*1)].playerControl = "Green"
            }
          }else break
      }
    }
    if (directions.substr(4,1) == 1){
      for (let i = 0; i < 6; i++)
      { if (startCell+(i*1) > 24)break;
       if (tempGameState[startCell+(i*1)].tileRow == tempGameState[startCell].tileRow && tempGameState[startCell+(i*1)].tileCol == tempGameState[startCell].tileCol+i)
          {if (tempGameState[startCell+(i*1)].cardId == "empty")
          {
            tempGameState[startCell+(i*1)].playerControl = "Green"
          }
          }else break
      }
    }
    if (directions.substr(5,1) == 1){
      for (let i = 0; i < 6; i++)
      { if (startCell+(i*4) > 24)break;
       if (tempGameState[startCell+(i*4)].tileRow == tempGameState[startCell].tileRow+i && tempGameState[startCell+(i*4)].tileCol == tempGameState[startCell].tileCol-i)
          {if (tempGameState[startCell+(i*4)].cardId == "empty")
            {
              tempGameState[startCell+(i*4)].playerControl = "Green"
            }
          }else break
      }
    }
    if (directions.substr(6,1) == 1){
      for (let i = 0; i < 6; i++)
      {if (startCell+(i*5) > 24)break;
       if (tempGameState[startCell+(i*5)].tileRow == tempGameState[startCell].tileRow+i && tempGameState[startCell+(i*5)].tileCol == tempGameState[startCell].tileCol)
          {if (tempGameState[startCell+(i*5)].cardId == "empty")
            {
              tempGameState[startCell+(i*5)].playerControl = "Green"
            }
          }else break
        }
    }
    if (directions.substr(7,1) == 1){
      for (let i = 0; i < 6; i++)
      { if (startCell+(i*6) > 24)break;
        if (tempGameState[startCell+(i*6)].tileRow == tempGameState[startCell].tileRow+i && tempGameState[startCell+(i*6)].tileCol == tempGameState[startCell].tileCol+i)
          {if (tempGameState[startCell+(i*6)].cardId == "empty")
            {
              tempGameState[startCell+(i*6)].playerControl = "Green"
            }
          }else break
      }
    }
    setGameState(tempGameState)

  }

  const newPlayerGreen= async ()=>{
    //The following loops are grabbing cards by Id from the saved deck of the user and then using them to pull the full stats
    //of the cards from the cardIndex, pushing the entire card to the player state.
    const summoner = cardCtx.cardIndex.Summoner.find((x) => x.cardId == (appCtx.user.savedDeck.summoner[0].cardId))
    //Pulls health from summoner card
    const health = summoner.health
    var spells = []
    for(let i = 0; i < appCtx.user.savedDeck.spell.length; i++)
    {

       spells = [...spells, cardCtx.cardIndex.Spell.find((x) => x.cardId == (appCtx.user.savedDeck.spell[i].cardId))]
    }
    var cardDeck = []
    for(let i = 0; i < appCtx.user.savedDeck.trap.length; i++)
    {
        cardDeck = [...cardDeck, cardCtx.cardIndex.Trap.find((x) => x.cardId == (appCtx.user.savedDeck.trap[i].cardId))]
    }
    for(let i = 0; i < appCtx.user.savedDeck.summon.length; i++)
    {
        cardDeck = [...cardDeck, cardCtx.cardIndex.Summon.find((x) => x.cardId == (appCtx.user.savedDeck.summon[i].cardId))]
    }
    //After all the cards are set, 5 are drawn at random for the first turn these cards are added to the hand and removed from the deck
    var hand = []
    for (let i =0; i < 5; i++)
    {
        var randomDraw = Math.floor(Math.random() * (cardDeck.length - 0 + 1) + 0)
        hand = [...hand, cardDeck[randomDraw]]
        cardDeck.splice(randomDraw, 1)
    }

    //returns by setting the player state
    return setPlayerGreen(
      {
        summoner: summoner,
        health: health,
        spells: spells,
        cardDeck: cardDeck,
        cardDiscard: [],
        souls: 0,
        mana: 0,
        hand: hand, 
        ready: true       
       }
    )
   }

   if (gamePhase == "fresh"){
    newPlayerGreen()
    setGamePhase("gameloop")
   }

if (playerGreen?.ready !== true) return <>Loading...</>


  cellDraw=0
  return (
    <>
      <Table className="tableScore">
        <tbody>
          <tr className="rowScore" >
            <td className="colScore" style={{left:(150)+"px"}}>
            </td>
            <td className="colScore" style={{left:(550)+"px"}}>
            </td>
            <td className="colScore" style={{left:(950)+"px"}}>
            </td>
          </tr>
        </tbody>
      </Table>
     
     
      <Table className="tableFormat" >
        <tbody>
          {boardRow.map((rowPos) =>(
            <tr key={rowPos} className="rowFormat" xs={"cols:5"}>
              {boardCol.map((colPos) =>(
                  <td 
                    key={colPos} 
                    className="colFormat" 
                    xs="2" 
                    
                    style={
                      {
                      left:((colPos*170)+100)+"px",
                      outlineColor:getPlayerControl(cellDraw)
                      }}>
                    <img 
                      id={cellDraw}
                      key={cellDraw++}
                      className="cardBoard"
                      src={`./img/card/${(gameState[cellDraw]?.cardId)}.png`}
                      onDragEnter={(e)=>{dragEnter(e)}}
                      draggable
                      />


                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>


      <Table className="tableHand">
        <tbody>
          <tr className="rowHand" >
            <td className="colHand" style={{left:(150)+"px"}}>
            {playerGreen.spells.map((card, i) =>(
            <img
                  id={card.cardId}
                  key={card.cardId}
                  className="cardHand" 
                  src={`./img/card/${card?.cardId}.png`} 
                  style={{
                    left:((i*50))+"px",
                  }}
                  
                />
                ))}
            </td>
            <td className="colHand" style={{left:(550)+"px"}}>
              {playerGreen.hand.map((card, i) =>(
                <img
                  id={card?.cardId}
                  key={card?.cardId}
                  className="cardHand drawnCard" 
                  src={`./img/card/${card?.cardId}.png`} 
                  style={{
                    left:((i*40))+"px",
                    // animation: 
                  }}
                  onDragStart={(e)=>{grabCard(e)}}
                  onDragEnd={(e)=>{dropCard(e)}}
                  onDragEnter={(e)=>{dragEnter(e)}}
                  draggable
                />
              ))}
            </td>
            <td className="colHand" style={{left:(950)+"px"}}>
              <img
                  id={playerGreen?.summoner?.cardId}
                  key={playerGreen?.summoner?.cardId}
                  className="cardHand" 
                  src={`./img/card/${playerGreen?.summoner?.cardId}.png`} 
                  style={{
                    left:((0))+"px",
                  }}
                    
                />
              <img
                id={"deck"}
                key={"deck"}
                className="cardHand" 
                src={`./img/card/cardback.png`} 
                style={{
                  left:((200))+"px",
                }}
                
              />
              <img
                id={"drawCard"}
                key={"drawCard"}
                className="cardHand drawCard redrawCard" 
                src={`./img/card/cardback.png`} 
                style={{
                  left:((200))+"px",
                }}
                
              />
              <p className="deckText">{playerGreen.cardDeck.length} Cards</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )

}
