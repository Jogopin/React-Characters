import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import PageOne from './components/PageTwo';
import PageTwo from './components/PageOne';


function App() {
  
  const [listOfCharacters, setListOfCharacters] = useState()

  
  
  useEffect(() => {
    axios
      .get('https://ih-crud-api.herokuapp.com/characters')
      .then((response) => {

        setListOfCharacters(response.data.slice(0,10))

      })
      .catch( (error) =>{
        console.log(error)
      });
  }, [])
  

  const deleteCharacter = (idOfCharacter) => {
    const newList = [...listOfCharacters].filter((elm) => {
      return elm.id !== idOfCharacter;

      

    });
    setListOfCharacters(newList)
  }
  
  return (
    <div className="App character" >
<PageOne/>
<PageTwo/>

      <div className="characters-list" >{listOfCharacters !== undefined && listOfCharacters.map((char,index)=>{
        return (
          <div className="characters" key={char.id}>
            
            <h3>{char.name}</h3>
            <p>{char.occupation}</p>
            <p>{char.weapon}</p>
            <button className="btn-delete" onClick={()=>{deleteCharacter(char.id)}}>X</button>
          </div>)
        })}
      </div>
    </div>
  );
}


export default App;
