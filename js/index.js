const letters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N",  
  "Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z","SPACE"
];

document.addEventListener("DOMContentLoaded", () => {
  //REFERENCE OF LABELS TO CHANGE THE MESSAGE
  const nextPosition        = document.querySelector("#nextPosition");
  const prevPosition        = document.querySelector("#prevPosition");
  const increaseMemory      = document.querySelector("#increaseMemory");
  const decreaseMemory      = document.querySelector("#decreaseMemory");
  const jumpToNextLeftFist  = document.querySelector("#jumpToNextLeftFist");
  const jumpToNextRightFist = document.querySelector("#jumpToNextRightFist");
  const showLetter          = document.querySelector("#showLetter");
  const jumpToStart         = document.querySelector("#jumpToStart");
  const jumpToEnd           = document.querySelector("#jumpToEnd");
  const jumpToMiddle        = document.querySelector("#jumpToMiddle");
  const deleteCharacter     = document.querySelector("#deleteCharacter");

  //REFERENCE OF THE RESULT OF THE HAND MESSAGE
  const result  = document.querySelector("#result");

  //REFERENCE OF MESSAGE
  const message = document.querySelector("#message");

  //REFERENCE OF CURRENT MEMORY AND POSITION
  let currentMemoryValue   = document.querySelector("#currentMemoryValue");
  let currentPositionValue = document.querySelector("#currentPositionValue");

  //DECLARE THE INITIAL VALUE LABELS
  currentMemoryValue.innerHTML   = "0";
  currentPositionValue.innerHTML = "A";

  result.innerHTML = `" "`;

  //INITIAL VALUE FOR MEMORY, POSITION OF ARRAY AND THE INITIAL RESULT
  currentMemoryValue.value   = 0;
  currentPositionValue.value = 0;

  result.value = `" "`;

  //HANDLE EVENT LISTENER OF HANDS
  nextPosition.addEventListener("click", () => {
    message.value = message.value + "👉"; //Add hand to message
    handleChange();
  });

  prevPosition.addEventListener("click", () => {
    message.value = message.value + "👈"; //Add hand to message
    handleChange();
  });

  increaseMemory.addEventListener("click", () => {
    message.value = message.value + "👆"; //Add hand to message
    handleChange();
  });

  decreaseMemory.addEventListener("click", () => {
    message.value = message.value + "👇"; //Add hand to message
    handleChange();
  });

  jumpToNextLeftFist.addEventListener("click", () => {
    message.value = message.value + "🤜"; //Add hand to message
    handleChange();
  });

  jumpToNextRightFist.addEventListener("click", () => {
    message.value = message.value + "🤛"; //Add hand to message
    handleChange();
  });

  showLetter.addEventListener("click", () => {
    message.value = message.value + "👊"; //Add hand to message
    handleChange();
  });

  jumpToStart.addEventListener("click", () => {
    message.value = message.value + "🌝"; //Add hand to message
    handleChange();
  });

  jumpToEnd.addEventListener("click", () => {
    message.value = message.value + "🌚"; //Add hand to message
    handleChange();
  });

  jumpToMiddle.addEventListener("click", () => {
    message.value = message.value + "🌞"; //Add hand to message
    handleChange();
  });

  deleteCharacter.addEventListener("click", () => {
    const msgLength = message.value.length; //Get the length for the message
    message.value   = message.value.substring(0, msgLength - 2); //Delete the last emoji

    handleChange();
  });

  //FUNCTION TO CHANGE THE POSITION AND MEMORY VALUE 
  const handleChange = () => {
    //IF THERE IS NO MESSAGE, SET THE INITIAL VALUES
    currentMemoryValue.value   = 0;
    currentPositionValue.value = 0;
    result.value = "";
    
    currentMemoryValue.innerHTML   = currentMemoryValue.value.toString();
    currentPositionValue.innerHTML = letters[currentPositionValue.value];
    result.innerHTML = `""`;


    //DOING THIS SPLIT EACH EMOJI INTO 2 STRINGS LIKE THESE DOING THIS SPLIT EACH EMOJI INTO 2 STRINGS LIKE THISE ["\ud83d", "\udc49"]
    let dirtyArray = message.value.split(""); 

    //ARRAY TO SAVE EACH EMOJI LIKE THIS [👉, 👈]
    let cleanArray = [];

    //MAP THE DIRTY ARRAY AND COMBINE THE BOTH STRINGS THAT BEFORE WERE SPLITTED
    dirtyArray.map((_, index) => {
      if (index % 2 === 0) {
        cleanArray.push(dirtyArray[index] + dirtyArray[index + 1]);
      }
    });

    let skipByLeftFist = false; //IGNORE ALL EMOJIS UNTIL FIND 🤜
    let skipByRightFist = false;//IGNORE ALL EMOJIS UNTIL FIND 🤛

    cleanArray.map((emoji) => {
      switch (emoji) {
        case "👉":
          if (!skipByLeftFist && !skipByRightFist) {
            const positionValue = currentPositionValue.value; //Save the current position
            const lettersLength = letters.length; //Save the length of letters
            currentPositionValue.value = positionValue < lettersLength - 1 ? positionValue + 1 : 0;
            currentPositionValue.innerHTML = letters[currentPositionValue.value];
          }
          break;
        case "👈":
          if (!skipByLeftFist && !skipByRightFist) {
            const posValue = currentPositionValue.value; //Save the current position
            const lettLength = letters.length; //Save the length of letters
            currentPositionValue.value = posValue === 0 ? lettLength - 1 : posValue - 1;
            currentPositionValue.innerHTML = letters[currentPositionValue.value];
          }
          break;
        case "👆":
          if (!skipByLeftFist && !skipByRightFist) {
            currentMemoryValue.value = currentMemoryValue.value === 0 ? 255 : 0;
            currentMemoryValue.innerHTML = currentMemoryValue.value.toString();
          }
          break;
        case "👇":
          if (!skipByLeftFist && !skipByRightFist) {
            currentMemoryValue.value = currentMemoryValue.value === 255 ? 0 : 255;
            currentMemoryValue.innerHTML = currentMemoryValue.value.toString();
          }
          break;
        case "🤜":
          if (!skipByLeftFist && currentMemoryValue.value === 0) {
            skipByRightFist = true;
          } else if (skipByLeftFist) {
            skipByLeftFist = false;
          }
          break;
        case "🤛":
          if (skipByRightFist) {
            skipByRightFist = false;
          } else if (!skipByRightFist && currentMemoryValue.value !== 0) {
            skipByLeftFist = true;
          }
          break;
        case "👊":
          if (!skipByLeftFist && !skipByRightFist) {
            result.value = result.value + letters[currentPositionValue.value];
            result.innerHTML = `"${result.value.replaceAll("SPACE", " ")}"`;
          }
          break;
        case "🌝":
          if (!skipByLeftFist && !skipByRightFist) {
            currentPositionValue.value = 0;
            currentPositionValue.innerHTML = letters[currentPositionValue.value];
          }
          break;
        case "🌚":
          if (!skipByLeftFist && !skipByRightFist) {
            currentPositionValue.value = letters.length - 1;
            currentPositionValue.innerHTML = letters[currentPositionValue.value];
          }
          break;
        case "🌞":
          if (!skipByLeftFist && !skipByRightFist) {
            currentPositionValue.value = 12;
            currentPositionValue.innerHTML = letters[currentPositionValue.value];
          }
          break;
        default:
          return console.error("An error has ocurred");
      }
    });
  };
});
