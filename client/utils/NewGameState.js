export function newGameState(){
 return [
  {tileRow: 1, tileCol: 1, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 1, tileCol: 2, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 1, tileCol: 3, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 1, tileCol: 4, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 1, tileCol: 5, occupied: true, playerControl: "Wall", cardId: "wall"},
  {tileRow: 2, tileCol: 1, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 2, tileCol: 2, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 2, tileCol: 3, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 2, tileCol: 4, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 2, tileCol: 5, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 3, tileCol: 1, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 3, tileCol: 2, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 3, tileCol: 3, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 3, tileCol: 4, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 3, tileCol: 5, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 4, tileCol: 1, occupied: true, playerControl: "Wall", cardId: "wall"},
  {tileRow: 4, tileCol: 2, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 4, tileCol: 3, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 4, tileCol: 4, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 4, tileCol: 5, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 5, tileCol: 1, occupied: true, playerControl: "Wall", cardId: "wall"},
  {tileRow: 5, tileCol: 2, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 5, tileCol: 3, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 5, tileCol: 4, occupied: false, playerControl: null, cardId: "empty"},
  {tileRow: 5, tileCol: 5, occupied: false, playerControl: null, cardId: "empty"}    
]

}