import './App.css';
import { useState, useEffect } from 'react';

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

const Inventory = ({ itemList }) => {
  return (
    <div className='my-12 px-24'>
      <h2 className='font-bold'>Inventory:</h2>
      <div className='flex gap-4 flex-wrap'>
        {itemList.map((item, index) => {
          const [color] = Object.entries(items.itemSelection).find(([color, { items }]) => items.includes(item));
          const colorClass = items.itemSelection[color].color;
          const imageSrc = items.srcSelection[item];
          return (
            <div className={`${colorClass} p-2 border border-gray-400 rounded-lg flex flex-col justify-center items-center`} key={index}>
              <p>{item}</p>
              <img className={"w-auto h-16"} src={imageSrc} alt={`OSRS img of ${imageSrc}`}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const Case = ( {openedItem, openedColor} ) => {

  return (
    <div className='flex flex-col justify-center items-center'>
      {openedItem &&
        <div className={`${openedColor} p-2`} >
          <h2>You opened:</h2>
          <b>{openedItem}</b>
        </div>
      }
    </div>
  )
}

const Opening = ({ fakeList, isOpen, setIsOpen, selectItem, openCase }) => {
  
  const rollCase = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 8000)
  }

  useEffect(() => {
    if (isOpen) {
      openCase();
    }
  }, [isOpen]);

  return (
    <>
    <button className='bg-green-500 my-12 p-4' onClick={rollCase}>Roll</button>
    <button className='bg-blue-500 my-12 p-4' onClick={openCase}>No roll</button>
    <div className='scroller-container'>
      <div className={`scroller ${isOpen ? 'open' : ''}`}>
        {fakeList.map((item) => (
          <div className="p-2 border border-gray-400 rounded-lg" key={item}>{item}</div>
        ))}
      </div>
    </div>
    </>
  );
}

function App() {

  const [itemList, setItemList] = useState([]);
  const [openedItem, setOpenedItem] = useState("");
  const [openedColor, setOpenedColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fakeList, setFakeList] = useState(["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10", 
  "item11", "item12", "item13", "item14", "item15", "item16", "item17", "item18", "item19", "item20",
  "item21", "item22", "item23", "item24", "item25", "item26", "item27", "item28", "item29", "item30"]);

  const selectItem = (color) => {
    let chanceItem = Math.floor(Math.random() * 3); // change size dynamically to object length
    fillList()
    const selectedItem = items.itemSelection[color].items[chanceItem];

    setTimeout(() => {
      setOpenedItem(selectedItem);
      setOpenedColor(items.itemSelection[color]);
      setItemList(prevList => {
        const newList = [...prevList, selectedItem];
        return newList;
      });
    }, 8000);
  }

  const fillList = () => {
    let fillColor;
    const chance = Math.floor(Math.random() * 1000);
    if (chance <= 2) {
      fillColor = "Gold";
    } else if (chance > 2 && chance <= 12) {
      fillColor = "Red";
    } else if (chance > 12 && chance <= 62) {
      fillColor = "Purple";
    } else {
      fillColor = "Blue";
    }
    
    for (let i = 0; i < fakeList.length; i++) {
      fakeList[i] = (items.itemSelection[fillColor].items[Math.floor(Math.random() * 3)]);
    }

    setFakeList(prevList => {
      const newList = [...prevList, fakeList];
      return newList;
    });
  }

  const openCase = () => {
      const chance = Math.floor(Math.random() * 1000);
      if (chance <= 2) {
        selectItem("Gold");
      } else if (chance > 2 && chance <= 12) {
        selectItem("Red");
      } else if (chance > 12 && chance <= 62) {
        selectItem("Purple");
      } else {
        selectItem("Blue");
      }
  }


  return (
    <div>
    <div className="flex flex-col items-center">
      <Opening fakeList={fakeList} isOpen={isOpen} setIsOpen={setIsOpen} selectItem={selectItem} openCase={openCase} />
      <Case openedColor={openedColor} openedItem={openedItem} />
    </div>
      <Inventory itemList={itemList}/>
    </div>
  );
}




export default App;
