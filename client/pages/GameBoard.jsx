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
  }


  const dropCard = (e) => {
    console.log ("Tried to drop")
    if (!gameState[dragHover]?.occupied){
      var tempGameState = gameState
      tempGameState[dragHover].occupied = true
      tempGameState[dragHover].playerControl = "Green"
      tempGameState[dragHover].cardId = movingCard.cardId
      console.log(tempGameState)
      setGameState(tempGameState)
      var tempPlayerState = playerGreen
      tempPlayerState.hand.splice(tempPlayerState.hand.findIndex(id => id.cardId == movingCard.cardId), 1)
      setPlayerGreen(tempPlayerState)
      setDragHover(null)
      console.log(playerGreen)

    }

  }

  const dragEnter = (e) => {
    setDragHover(e.target.id)
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
            </td>
            <td className="colHand" style={{left:(550)+"px"}}>
              {playerGreen.hand.map((card, i) =>(
                <img
                  id={card.cardId}
                  key={card.cardId}
                  className="cardHand" 
                  src={`./img/card/${card.cardId}.png`} 
                  style={{
                    left:((i*40))+"px",
                  }}
                  onDragStart={(e)=>{grabCard(e)}}
                  onDragEnd={(e)=>{dropCard(e)}}
                  onDragEnter={(e)=>{dragEnter(e)}}
                  draggable
                />

                  
              ))}
            </td>
            <td className="colHand" style={{left:(950)+"px"}}>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )

}
