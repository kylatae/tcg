import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import {useState, useEffect} from "react"
import { useAppCtx } from "../utils/AppProvider"


export default function ViewCards(){

  const appCtx = useAppCtx()


  useEffect(() =>{
    console.log (appCtx?.user?.inventory)
  }, [appCtx])



if (!appCtx?.user?.inventory) return <>Loading...</>

  return (
    <>
    <Container>
      <Row> Summoner </Row>
      <Row>
        {appCtx.user.inventory.cards
        .filter(types => types.cardType == "Summoner")
        .map((cards) =>(
          <Col key={cards.cardId} xs="12" sm="6" md="4" lg="3" xxl="2" className={"cardInventory"}>
            <Card >
              <img src={`./img/card/${cards.cardId}.png`} height={"200px"} width={"200px"} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row> Spell </Row>
      <Row>
        {appCtx.user.inventory.cards
        .filter(types => types.cardType == "Spell")
        .map((cards) =>(
          <Col key={cards.cardId} xs="12" sm="6" md="4" lg="3" xxl="2" className={"cardInventory"}>
            <Card >
              <img src={`./img/card/${cards.cardId}.png`} height={"200px"} width={"200px"} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row> Trap </Row>
      <Row>
        {appCtx.user.inventory.cards
        .filter(types => types.cardType == "Trap")
        .map((cards) =>(
          <Col key={cards.cardId} xs="12" sm="6" md="4" lg="3" xxl="2" className={"cardInventory"}>
            <Card >
              <img src={`./img/card/${cards.cardId}.png`} height={"200px"} width={"200px"} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row> Summon </Row>
      <Row>
        {appCtx.user.inventory.cards
        .filter(types => types.cardType == "Summon")
        .map((cards) =>(
          <Col key={cards.cardId} xs="12" sm="6" md="4" lg="3" xxl="2" className={"cardInventory"}>
            <Card >
              <img src={`./img/card/${cards.cardId}.png`} height={"200px"} width={"200px"} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  )
}