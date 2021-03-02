//DATA IMPORTS
import emojis from "./emojis.json";

//SET EMOJIS ROWS
export const setEmojisRows = () => {
  let mainArray = [];
  for (let i = 0; i < 10; i++) {
    let subArray = [];
    for (let j = 0; j < 28; j++) {
      let random = Math.floor(Math.random() * emojis.length);
      subArray.push(emojis[random]);
    }
    mainArray.push(subArray);
  }
  return mainArray;
};
