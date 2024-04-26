import './App.css';
import { useState } from 'react';

import voidwaker from './images/voidwaker.png';
import ghraziRapier from './images/ghraziRapier.png';
import scytheOfVitur from './images/scytheOfVitur.png';
import abyssalWhip from './images/abyssalWhip.png';
import saradominSword from './images/saradominSword.png';
import dragonScimitar from './images/dragonScimitar.png';
import runeScimitar from './images/runeScimitar.png';
import dragonDagger from './images/dragonDagger.png';
import graniteMaul from './images/graniteMaul.png';
import bronzeScimitar from './images/bronzeScimitar.png';
import ironScimitar from './images/ironScimitar.png';
import steelScimitar from './images/steelScimitar.png';


const items = {
  "itemSelection": {
    "Gold": {
      "items": ["Voidwaker", "Ghrazi Rapier", "Scythe of vitur"],
      "color": "bg-yellow-300"
    },
    "Red": {
      "items": ["Abyssal Whip", "Saradomin Sword", "Dragon Scimitar"],
      "color": "bg-red-300"
    },
    "Purple": {
      "items": ["Rune Scimitar", "Dragon Dagger", "Granite Maul"],
      "color": "bg-purple-300"
    },
    "Blue": {
      "items": ["Bronze Scimitar", "Iron Scimitar", "Steel Scimitar"],
      "color": "bg-blue-300"
    }
  },
  "srcSelection": {
    "Voidwaker": voidwaker,
    "Ghrazi Rapier": ghraziRapier,
    "Scythe of vitur": scytheOfVitur,
    "Abyssal Whip": abyssalWhip,
    "Saradomin Sword": saradominSword,
    "Dragon Scimitar": dragonScimitar,
    "Rune Scimitar": runeScimitar,
    "Dragon Dagger": dragonDagger,
    "Granite Maul": graniteMaul,
    "Bronze Scimitar": bronzeScimitar,
    "Iron Scimitar": ironScimitar,
    "Steel Scimitar": steelScimitar
  }
}

const Opening = ({ setRollingList }) => {
  
  // this has to be independent because we might need 1 roll or 30 rolls
  const rollItem = async () => { // we get Item
    const odds = await calculateOdds(); // get odds (number 1-1000)
    const color = await chooseColor(odds); // get color based on odds
    const selectedItem = await chooseColorItem(color); // choose item
    return selectedItem;
  }

  // we don't even need to populate 30 indexes and replace a certain one,
  // just populate all list once and select one is all we need,
  // just select the winning item to be the index it stops on.

  const populateList = async () => {
    let rollList = []; // create list
    for (let i = 0; i < 30; i++) {
      const rolledItem = await rollItem();
      rollList.push(rolledItem); // fill list with 30 random items
    }
    setRollingList(rollList);
    return rollList;
  }

    // create list
    // populate list with fake items
    // add won item to right index


    // Fill contents with items (opened item to index)
    // Start animation (with delay if needed)
    // After animation fill inventory
  // }
  
  const calculateOdds = () => {
    const chance = Math.floor(Math.random() * 1000); // get number between 1 and 1000
    return chance;
  }

  const chooseColor = (odds) => {
    let color = "";
    if (odds <= 2) {
      color = "Gold";
    } else if (odds > 2 && odds <= 12) {
      color = "Red";
    } else if (odds > 12 && odds <= 62) {
      color = "Purple";
    } else {
      color = "Blue";
    }
    return color;
  }

  const chooseColorItem = (color) => {
    const chanceItem = Math.floor(Math.random() * 3); // random number 1-3
    const selectedItem = items.itemSelection[color].items[chanceItem]; // get item based on color and random number
    return selectedItem;
  }

  // const populateList = () => {
  //   const createList = [];

  // }

  return (
    <div>
      <button className='bg-green-500 my-12 p-4' onClick={populateList}>Roll</button>
      <div>
        Scrolling container
      </div>
    </div>
  )
}

const Case = ({ rollingList }) => {
  return (
    <div>
      <h1>{rollingList}</h1>
    </div>
  )
}

const Inventory = () => {
  return (
    <div>
      Inventory
    </div>
  )
}

function App() {
 
  const [rollingList, setRollingList] = useState([])
 
  return (
    <div>
      <div className="flex flex-col items-center">
        <Opening setRollingList={setRollingList} />
        <Case rollingList={rollingList} />
      </div>
      <Inventory />
    </div>
  )
}

export default App;