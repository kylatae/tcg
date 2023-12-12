import {Container, Row, Col, Modal} from 'react-bootstrap';
import {useState, useEffect} from "react"
import {useAppCtx} from "../utils/AppProvider"
import {useCardCtx} from "../utils/CardProvider"
import "../css/menuView.css"

export default function DeckBuilder(){

  const appCtx = useAppCtx()
  const cardCtx = useCardCtx()
  const [optionType, setOptionType] = useState("radio")
  const [summonerSelect, setSummonerSelect] = useState({})
  const [spellSelect, setSpellSelect] = useState({})
  const [trapSelect, setTrapSelect] = useState({})
  const [summonSelect, setSummonSelect] = useState({})
    //Used for setting the current selection for building a deck
  const [currentSelect, setCurrentSelect ] = useState("Summoner")
  const [show, setShow] = useState(false);
  const [updateDom, setUpdateDom] = useState(true);
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

  useEffect(() =>{
    

    
  }, [currentSelect])


  const hideAll = () => {
    setInfoHide(defaultInfoHide)
    setShow(false)
  }

  const changeHandler = (e) =>{
    switch (currentSelect){
      case "Summoner":
        setSummonerSelect({cardId: e.target.value, cardType: currentSelect})
        break;
      case "Spell":
        setSpellSelect({...spellSelect, cardId: e.target.value, cardType: currentSelect})
        break;
      case "Trap":
        setTrapSelect(e.target.value)
        break;
      case "Summon":
        setSummonSelect(e.target.value)
        break;
                    
    }
  }

  async function updateDeck(e){

    e.preventDefault()
    console.log (e.target)

    const finalPath = `/api/user/updatedeck`
    var tempInfo = {}

    switch (currentSelect){
      case "Summoner":
        tempInfo = summonerSelect
        break;
      case "Spell":
        tempInfo = spellSelect
        break;
      case "Trap":
        tempInfo = trapSelect
        break;
      case "Summon":
        tempInfo = summonSelect
        //redirect to cardpage
        break;          
                    
    }
    console.log(tempInfo)
    var sendInfo = {cards: tempInfo, _id: appCtx.user._id }
    console.log(sendInfo)

    try {
      const query = await fetch(finalPath, {
        method: "POST",
        body: JSON.stringify(sendInfo),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const response = await query.json()

      switch (currentSelect){
        case "Summoner":
          setCurrentSelect("Spell")
          break;
        case "Spell":
          setCurrentSelect("Trap")
          break;
        case "Trap":
          setCurrentSelect("Summon")
          break;
        case "Summon":
          alert("Deck Saved")
          //redirect to cardpage
          break;          
                      
      }

      setUpdateDom(true)

    } catch(err){
      console.log(err.message)
    }
  }



  if (!appCtx?.user?.inventory) return <>Loading...</>
  if (!cardCtx?.cardIndex?.Trap) return <>Loading...</>

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
        return 
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
        return
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
        return
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
        return
      default:
        return
    }
  }

//The display below is a array map in an array map. The first map is for the Rows which is the typeMap variable created above.
//The second map is for the columns which displays the actual cards. On the page it displays All Cards while putting in headers
//for the different types.
  if (updateDom){
    console.log ("Maybe")
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
            <Row className={"typeH"}> {currentSelect}s</Row>
            <form onSubmit={updateDeck}>
            <Row>                
              {appCtx.user.inventory.cards
                .filter(types => types.cardType == `${currentSelect}`)
                .map((cards) =>(

                    <Col key={cards.cardId} xs="12" sm="8" md="6" lg="4" xxl="3" className={"cardInventory"}>
                      <img onClick={()=>{moreInfo(cards.cardId, currentSelect)}} className={"cardImgDisplay"} src={`./img/card/${cards.cardId}.png`} height={"200px"} width={"200px"} />
                      <div>
                        <input type={optionType} id={cards.cardId} value={cards.cardId} name={currentSelect} onChange={changeHandler} />
                      </div>
                    </Col>

                ))}
                                
            </Row>
            <button>Select Card(s)</button>
            </form>
          </Container>
              
      </>
    )
    
  }
  return <></>
}
