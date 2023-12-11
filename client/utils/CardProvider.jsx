import { createContext, useContext, useEffect, useState } from "react"

// Create the context itself
const CardContext = createContext({})

// Create a React hook that will allow other components to use the context 
export const useCardCtx = () => useContext(CardContext)

export default function CardProvider(props){

  const [ cardIndex, setCardIndex ] = useState({})

  async function fetchCards(){
    try {
      const query = await fetch("/api/cardindex/")
      const response = await query.json()
      if( response.result === "success" ){
        setCardIndex(response.payload)
        console.log (response.payload)
      }
    } catch(err){
      console.log(err)
    }
  }



  useEffect(() => {
    fetchCards()
  },[])


  return (
    <CardContext.Provider value={{ user, fetchCards }}>
      { props.children }
    </CardContext.Provider>
  )
}