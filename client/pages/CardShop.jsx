import {Container, Button, Row, Col, Modal} from 'react-bootstrap';
import {useState, useEffect} from "react"
import {useAppCtx} from "../utils/AppProvider"
import {useCardCtx} from "../utils/CardProvider"
import "../css/menuView.css"

export default function CardShop(){
  const appCtx = useAppCtx();
  const cardCtx = useCardCtx();
  //Used for Array Map Type  Headers
  const typeMap = [{name: "Summoner"}, {name: "Summon"}, {name: "Trap"}, {name: "Spell"}];
  const [booster, setBooster] = useState(null);
  const [packSelect, setPackSelect] = useState("ElfBooster");
  const [show, setShow] = useState(false);
  //For refreshing the page after changing boosterpack type
  const [updateDom, setUpdateDom] = useState(true);

  function handleInputChange(e){
    setPackSelect( e.target.value )
  }
  //Set cardInfo and infoHide are for setting up the information on a card when it is selected to be populated into a modal for plain text info on a card
  const [cardInfo, setCardInfo] = useState(
    {
      tribe: "", 
      passive: "", 
      activation: "", 
      health: "", 
      level: "",
      attack: "",
      defense: "",
      ability: "",
      mana: "",
      effect: ""
    })

  
  const defaultInfoHide = {
    tribe: true, 
    passive: true, 
    activation: true, 
    health: true, 
    level: true,
    attack: true,
    ability: true,
    mana: true,
    effect: true}

  const [infoHide, setInfoHide] = useState({defaultInfoHide})

  const handleClose = () => {hideAll()};

  const hideAll = () => {
    setInfoHide(defaultInfoHide)
    setShow(false)
  }

  useEffect(() =>{
    fetchCards()
    setUpdateDom(false)
    
  }, [packSelect])


  async function fetchCards(){
    try {
      const query = await fetch(`/api/booster/${packSelect}`)
      const response = await query.json()
      if( response.result === "success" ){
        setBooster(response.payload)
        setUpdateDom(true)
      }
    } catch(err){
      console.log(err)
    }
  }


//Checks to make sure all components are loaded before it tries loading the DOM
if (!appCtx?.user?.inventory) return <>Loading...</>
if (!cardCtx?.cardIndex?.Trap) return <>Loading...</>
if (!booster == null) return <>Loading....</>

const buyBooster= () => {
  //Checks to make sure user has enough money to buy a pack
  if (appCtx.user.inventory.currency > 14)
  {
    var spendCoin = confirm("Spend 15 Coins for this pack?");
    if (spendCoin){
      payBooster()
      var currentCards = appCtx.user.inventory.cards
      for(let i=0; i< 5; i++)
      {
        //Random number 1-10000 to distribute random card based on roll
        var randomRoll = Math.floor(Math.random() * (10000 - 1 + 1) + 1)
        for(let z=0; z < booster.cardPack.length; z++)
        {
          //This loop is checking all rolls in ascending order until it finds which card is in the win range then returns it
          if (randomRoll <= (booster.cardPack[z].cardPercents))
          {
            
            var addCard = currentCards.find(id => id.cardId === booster.cardPack[z].cardId)
            addNewCard(booster.cardPack[z])
            var cardName = moreInfo(booster.cardPack[z].cardId, booster.cardPack[z].cardType)
            setShow(false)
            alert(`You received ${cardName}, a ${booster.cardPack[z].cardType} card!`)

            break;
          }
        }

      }

      setUpdateDom(true)
    }
     else return
  } else alert("You do not have enough coins!")

}
async function addNewCard(newCard){

  const finalPath = `/api/user/addcard`
  const sendInfo = {_id: appCtx.user._id, cardId: newCard.cardId, cardType: newCard.cardType, cost: 15 }
  try {
    const query = await fetch(finalPath, {
      method: "POST",
      body: JSON.stringify(sendInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const response = await query.json()
  } catch(err){
    console.log(err.message)
  }
}

async function payBooster(){

  const finalPath = `/api/user/paycards`
  const sendInfo = {_id: appCtx.user._id, currency: (appCtx.user.inventory.currency-15)}
  try {
    const query = await fetch(finalPath, {
      method: "POST",
      body: JSON.stringify(sendInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const response = await query.json()
    location.reload();
  } catch(err){
    console.log(err.message)
  }
}

const moreInfo = (curCardId, curCardType) => {
  switch (curCardType){
    case "Summoner":
      const summonerOut = cardCtx?.cardIndex?.Summoner?.find(({cardId}) => cardId === `${curCardId}`);
      setCardInfo(
        {
          name: summonerOut.name, 
          tribe: summonerOut.tribe, 
          passive: summonerOut.passive, 
          activation: summonerOut.activation, 
          health: summonerOut.health
        })
      setInfoHide({    
          tribe: false, 
          passive: false, 
          activation: false, 
          health: false,
          level: true,
          attack: true,
          ability: true,
          mana: true,
          effect: true
        })
        setShow(true)
      return summonerOut.name
    case "Spell":
      const spellOut = cardCtx?.cardIndex?.Spell?.find(({cardId}) => cardId === `${curCardId}`);
      setCardInfo(
        {
          name: spellOut.name, 
          tribe: spellOut.tribe, 
          ability: spellOut.ability, 
          mana: spellOut.mana
        })
        var hideTribe = false;
        if(spellOut.tribe == "Any") hideTribe = true;
      setInfoHide({    
          tribe: hideTribe, 
          passive: true, 
          activation: true, 
          health: true, 
          level: true,
          attack: true,
          ability: false,
          mana: false,
          effect: true
        })
        setShow(true)
      return spellOut.name
    case "Summon":
      const summonOut = cardCtx?.cardIndex?.Summon?.find(({cardId}) => cardId === `${curCardId}`);
      setCardInfo(
        {
          name: summonOut.name, 
          tribe: summonOut.tribe, 
          level: summonOut.level, 
          attack: summonOut.attack, 
          defense: summonOut.defense, 
          ability: summonOut.ability
        })
        var hideTribe = false;
        if(summonOut.tribe == "Any") hideTribe = true;
      setInfoHide({    
          tribe: hideTribe, 
          passive: true, 
          activation: true, 
          health: true, 
          level: false,
          attack: false,
          ability: false,
          mana: true,
          effect: true
        })
        setShow(true)
      return summonOut.name
    case "Trap":
      const trapOut = cardCtx?.cardIndex?.Trap?.find(({cardId}) => cardId === `${curCardId}`);
      setCardInfo(
        {
          name: trapOut.name, 
          tribe: trapOut.tribe, 
          effect: trapOut.effect
        })
        var hideTribe = false;
        if(trapOut.tribe == "Any") hideTribe = true;
      setInfoHide({    
          tribe: hideTribe, 
          passive: true, 
          activation: true, 
          health: true, 
          level: true,
          attack: true,
          ability: true,
          mana: true,
          effect: false
        })
        setShow(true)
      return trapOut.name
    default:
      return
  }
}

//The display below is a array map in an array map. The first map is for the Rows which is the typeMap variable created above.
//The second map is for the columns which displays the actual cards. On the page it displays All Cards while putting in headers
//for the different types.
if(updateDom){
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{cardInfo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col hidden={infoHide.tribe} xs="4" className={"itemTitle"}>Tribe:</Col><Col hidden={infoHide.tribe} xs="8">{cardInfo.tribe}</Col>
              <Col hidden={infoHide.passive} xs="4" className={"itemTitle"}>Passive Ability:</Col><Col hidden={infoHide.passive} xs="8">{cardInfo.passive}</Col>
              <Col hidden={infoHide.activation} xs="4" className={"itemTitle"}>Actviation Ability:</Col><Col hidden={infoHide.activation} xs="8">{cardInfo.activation}</Col>
              <Col hidden={infoHide.health} xs="4" className={"itemTitle"}>Health:</Col><Col hidden={infoHide.health} xs="8">{cardInfo.health}</Col>
              <Col hidden={infoHide.level} xs="4" className={"itemTitle"}>Souls:</Col><Col hidden={infoHide.level} xs="8">{cardInfo.level}</Col>
              <Col hidden={infoHide.attack} xs="4" className={"itemTitle"}>Attack/Health:</Col><Col hidden={infoHide.attack} xs="8">{cardInfo.attack}/{cardInfo.defense}</Col>
              <Col hidden={infoHide.ability} xs="4" className={"itemTitle"}>Ability:</Col><Col hidden={infoHide.ability} xs="8">{cardInfo.ability}</Col>
              <Col hidden={infoHide.mana} xs="4" className={"itemTitle"}>Mana Cost:</Col><Col hidden={infoHide.mana} xs="8">{cardInfo.mana}</Col>
              <Col hidden={infoHide.effect} xs="4" className={"itemTitle"}>Effect:</Col><Col hidden={infoHide.effect} xs="8">{cardInfo.effect}</Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <Container>
          <Row>
            <Col className="topColItems" xs="12" sm="8" md="6" lg="4" xxl="4">
              <label className ="d-block">Select Desired Booster Pack</label>
                <select onChange={handleInputChange} defaultValue={packSelect} name="boosterName">
                  <option value="ElfBooster">Elf Booster</option>
                  <option value="HumanBooster">Human Booster</option>
                  <option value="DwarfBooster">Dwarf Booster</option>
                  <option value="MonsterBooster">Monster Booster</option>
                  <option value="MercBooster">Merc Booster</option>
                </select>
            </Col>
            <Col className="topColItems" xs="12" sm="8" md="6" lg="4" xxl="4">
              <label className="d-block">Would you like to purchase a booster pack of 5 cards for 15 coins? Duplicates auto sell for 1 coin return.</label>
              <Button onClick={()=>{buyBooster()}}>Purchase Pack</Button>
            </Col>
            <Col className="topColItems" xs="12" sm="8" md="6" lg="4" xxl="4">
            <label>Your Coins: {appCtx.user?.inventory?.currency}</label>
            </Col>

          </Row>
      </Container>


      {typeMap.map((mapType) =>(
        <Container key={mapType.name}>
          <Row className={"typeH"}> {mapType.name}s</Row>
          <Row>
            {booster.cardPack
              .filter(types => types.cardType == `${mapType.name}`)
              .map((cards) =>(
                <Col key={cards.cardId} xs="12" sm="8" md="6" lg="4" xxl="3" className={"cardInventory"}>
                  <img onClick={()=>{moreInfo(cards.cardId, mapType.name)}} className={"cardImgDisplay"} src={`./img/card/${cards.cardId}.png`} height={"200px"} width={"200px"} />
                  <p>{cards.dropPercentage*100}%</p>
                </Col>
              ))}
          </Row>
        </Container>
      ))}
    </>
  )

  }
  return(
    <>
    </>
  )
}
