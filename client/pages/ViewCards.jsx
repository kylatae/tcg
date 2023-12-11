import {Container, Button, Row, Col} from 'react-bootstrap';
import {useEffect} from "react"
import {useAppCtx} from "../utils/AppProvider"
import "../css/menuView.css"

export default function ViewCards(){

  const appCtx = useAppCtx()
  //Used for Array Map Type  Headers
  const typeMap = [{name: "Summoner"}, {name: "Spell"}, {name: "Trap"}, {name: "Summon"}]


  useEffect(() =>{
    console.log (appCtx?.user?.inventory)
  }, [appCtx])


if (!appCtx?.user?.inventory) return <>Loading...</>
//The display below is a array map in an array map. The first map is for the Rows which is the typeMap variable created above.
//The second map is for the columns which displays the actual cards. On the page it displays All Cards while putting in headers
//for the different types.
  return (
    <>
      {typeMap.map((mapType) =>(
        <Container>
          <Row key={mapType.name} className={"typeH"}> {mapType.name}s</Row>
          <Row key={`set${mapType.name}`}>
            {appCtx.user.inventory.cards
              .filter(types => types.cardType == `${mapType.name}`)
              .map((cards) =>(
                <Col key={cards.cardId} xs="12" sm="8" md="6" lg="4" xxl="3" className={"cardInventory"}>
                    <img className={"cardImgDisplay"} src={`./img/card/${cards.cardId}.png`} height={"200px"} width={"200px"} />
                </Col>
              ))}
          </Row>
        </Container>
      ))}
    </>
  )
}