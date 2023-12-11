import {useState, useEffect} from "react"


export default function Auth({cardId}){

  const [card, setCard] = useState(null);

  async function cardFind(cardId){
    const finalPath = `/api/card/${cardId}`
    try {
      const query = await fetch(finalPath, {
        method: "POST",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const response = await query.json()
      if( response.result === "success" ){
        setCard(response.payload)
        console.log(response.payload)
        return
      }
    } catch(err){
      console.log(err.message)
    }

  }

  useEffect(() =>{
    cardFind(cardId)
  }, [])
  


  return (
    <div>
      <img src={`./img/card/${cardId}.png`}  alt={card?.name} />
      <p>{card?.name}</p>
      
      
    </div>
  )

}