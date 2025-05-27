import { addNewNoteWithResult } from "./HistoryScript.js";

// let inp = document.querySelector(".FrontDisplay_Input");

// let ing = document.querySelectorAll(".ingridien");
// let inputBox = document.querySelector(".Textinput-Box");

// let clear = document.querySelector(".clear");
let buttons = document.querySelector(".grand_butt");
let input = document.querySelector(".Textinput-Control");
let historyCopy = "";
let inputCopy = "";



const operations = {
  "+": (lNum, rNum) => lNum + rNum,
  "-": (lNum, rNum) => lNum - rNum,
  "*": (lNum, rNum) => lNum * rNum,
  "/": (lNum, rNum) => (rNum !== 0 ? lNum / rNum : "Ошибка"),
  "^": (lNum, rNum) => lNum ** rNum,
};

function expression(operator = "+", lnum = 0, rnum = 0) {

  let lNum;
  let rNum;

  if (typeof lnum === "string" && lnum.includes("(")) {
    lNum = parseFloat(lnum.replace("(", ""));
  } else {
    lNum = parseFloat(lnum);
  }

  if (typeof rnum === "string" && rnum.includes(")")) {
    rNum = parseFloat(rnum.replace(")", ""));
  } else {
    rNum = parseFloat(rnum);
  }

  if (typeof lnum === "string" && lnum.includes("%")) {
    lNum /= 100;
  }
  if (typeof rnum === "string" && rnum.includes("%")) {
    rNum = (lNum / 100) * rNum;
  }

  const operation = operations[operator];

  if (operation) {
    const result = operation(lNum, rNum);
    if (result === "Ошибка") input.value = "Ошибка";
    return result;
  } else {
    input.value = "Ошибка";
  }
}

function createPriorityList(expression) {
  let priorityList = [];
  let parenthesesPriority = 0;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    let startPriority;
    if (char.includes("(")) {
      parenthesesPriority++;
    } else if (char.includes(")")) {
      parenthesesPriority--;
    } else if (["*", "/", "+", "-", "%", "^"].includes(char)) {
      if (["%", "^"].includes(char)) {
        startPriority = 0;
      } else if (char === "*" || char === "/") {
        startPriority = 1;
      } else {
        startPriority = 2;
      }

      const priority = startPriority - parenthesesPriority * 10;

      priorityList.push([priority, i]);
    }
  }

  return priorityList.sort((a, b) => a[0] - b[0]);
}

function MultiplyBeforeParentheses(expression) {
  let res = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    const prevChar = expression[i - 1];

    if (char === "(") {
      if (
        prevChar &&
        ((prevChar >= "0" && prevChar <= "9") ||
          prevChar === "%" ||
          prevChar === ")")
      ) {
        res += " * (";
        continue;
      }
    }

    res += char;
  }

  return res;
}

function inputResult() {
  let res = MultiplyBeforeParentheses(inputCopy).split(" ");
  let sortPriority = createPriorityList(res);



  for (let i = 0; i < sortPriority.length; i++) {
    const operatorIndex = sortPriority[i][1];

    let leftOperandIndex = operatorIndex - 1;
    let rightOperandIndex = operatorIndex + 1;

    while (res[leftOperandIndex] === " " && leftOperandIndex >= 0) {
      leftOperandIndex--;
    }
    while (res[rightOperandIndex] === " " && rightOperandIndex < res.length) {
      rightOperandIndex++;
    }

    const operator = res[operatorIndex];
    const leftOperand = res[leftOperandIndex];
    const rightOperand = res[rightOperandIndex];

    // if (leftOperand === undefined || rightOperand === undefined) {
    //   input.value = "Ошибка";
    //   return;
    // }

    const result = expression(operator, leftOperand, rightOperand);

    res[operatorIndex] = result;
    res[leftOperandIndex] = " ";
    res[rightOperandIndex] = " ";


  }

  const finalResult = res.filter((value) => value !== " ")[0];
  input.value = finalResult;
  inputCopy = String(finalResult);
  addNewNoteWithResult(inputCopy, historyCopy);
}

const actions = {
  Backspace: () => {
    input.value = input.value.slice(0, -1);
    inputCopy = inputCopy.slice(0, -1);
  },
  DEL: () => {
    input.value = input.value.slice(0, -1);
    inputCopy = inputCopy.slice(0, -1);
  },
  C: () => {
    input.value = "";
    inputCopy = "";
  },

  "*": () => {
    input.value += "*";
    inputCopy += " * ";
  },
  "x<sup>y</sup>": () => {
    input.value += "^";
    inputCopy += " ^ ";
  },
  "/": () => {
    input.value += "/";
    inputCopy += " / ";
  },
  "-": () => {
    input.value += "-";
    inputCopy += " - ";
  },
  "+": () => {
    input.value += "+";
    inputCopy += " + ";
  },
  "%": () => {
    input.value += "%";
    inputCopy += "%";
  },
  "(": () => {
    input.value += "(";
    inputCopy += "(";
  },
  ")": () => {
    input.value += ")";
    inputCopy += ")";
  },
  Enter: () => {
    historyCopy = input.value;
    inputResult();
  },
  "=": () => {
    historyCopy = input.value;
    inputResult();
  },
};

function calc(butt) {
  if (actions[butt]) {
    actions[butt]();
  } else {
    input.value += butt;
    inputCopy += butt;
  }
}

const keyboardButtons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "+",
  "=",
  "%",
  "^",
  "*",
  "/",
  "(",
  ")",
  ".",
  "Backspace",
  "Enter",
];

input.addEventListener("keydown", function (event) {
  if (!keyboardButtons.includes(event.key)) {
    event.preventDefault();
  } else {
    event.preventDefault();
    calc(event.key);
  }
});

buttons.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;
  calc(button.innerHTML);
});

// function inputResult() {
//   if (input.value.includes("(") && parentheses == "(") {
//     input.value += ")";
//     inputCopy += " )";
//     parentheses = "";
//   }

//   let res = inputCopy.split(" ");
//   let sortPriority = createPriorityList(res);

//   console.log(res)
//   if (res.length === 1){
//     return res;
//   }
//   for (let i = 0; i < sortPriority.length; i++) {
//     const operatorIndex = sortPriority[i][1];
//     const leftOperand = operatorIndex - 1;
//     const rightOperand = operatorIndex + 1;

//     if (res[leftOperand] == ' ' || res[rightOperand] == ' ' ){
//       inputResult()
//     }

//     let dig = expression(
//       res[operatorIndex],
//       res[leftOperand],
//       res[rightOperand]
//     );

//     console.log(inputCopy)

//     console.log(sortPriority);

//     res[operatorIndex] = dig;
//     res[leftOperand] = ' ';
//     res[rightOperand] = ' ';
//   }
// }

// function inputResult() {
//   const start = performance.now();

//   if (input.value.includes("(") && parentheses == "(") {
//     input.value += ")";
//     inputCopy += " )";
//     parentheses = "";
//   }

//   let res = inputCopy.split(" ");

//   let sortPriority = createPriorityList(res);

//   let operator;
//   let totalShift = 2;
//   let leftOperand = -1;
//   let rightOperand = 1;
//   let shiftForParentheses = 2;

//   for (let i = 0; i < sortPriority.length; i++) {
//     if (sortPriority[i][0] == 0){
//         shiftForParentheses -= 2;

//     }
//     else if (sortPriority[i][0] == 1){
//         shiftForParentheses = -sortPriority.filter(elem =>elem[0] < 2 && elem[1] < sortPriority[i][1]).length * 2

//     if (sortPriority[i][0] == 2) {
//       totalShift -= 2;
//     } else if (sortPriority[i][0] == 3) {
//       totalShift =
//         -sortPriority.filter((elem) => elem[1] < sortPriority[i][1]).length * 2;
//     }

//     operator = sortPriority[i][1] + totalShift;

//     let dig = expression(
//       res[operator],
//       res[operator + leftOperand],
//       res[operator + rightOperand]
//     );

//     console.log("operator:", sortPriority[i][0]);

//     console.log("номер элемента:", i);

//     console.log("индекс выражения:", sortPriority[i][1]);
//     console.log(...sortPriority);
//     console.log(res);
//     console.log("индекс левого операнда:", leftOperand);
//     console.log("индекс правого операнда:", rightOperand);
//     console.log("смещение:", totalShift);
//     console.log("смещенный индекс левого операнда:", operator + leftOperand);
//     console.log("смещенный индекс:", operator);
//     console.log("смещенный индекс правого операнда:", operator + rightOperand);

//     console.log("----------------------------------------------------");

//     res[operator - 1] = dig;
//     res.splice(operator, 2);

//     console.log(res);
//     console.log("----------------------------------------------------");
//   }

//   const end = performance.now();
//   console.log(`Время выполнения: ${end - start} мс.`);
//   input.value = res;
//   inputCopy = res;
// }

// function createPriorityList(string) {
//   let priorityList = [];
//   let check = false;
//   for (let i = 0; i < string.length; i++) {
//     if (string[i].includes("(")) {
//       check = true;
//       string[i] = string[i].slice(1);
//     } else if (string[i].includes(")")) {
//       check = false;
//       string[i] = string[i].slice(0, -1);
//     }
//     switch (string[i]) {
//       case "*":
//       case "/":
//         check ? priorityList.push([0, i]) : priorityList.push([2, i]);
//         break;
//       case "+":
//       case "-":
//         check ? priorityList.push([1, i]) : priorityList.push([3, i]);
//         break;
//       default:
//         break;
//     }
//   }
//   return priorityList.sort((a, b) => a[0] - b[0]);
// }



// buttons.addEventListener('click', function(event){
//     let button = event.target;

//     if (button.tagName != 'BUTTON') return;

//     // if (button.innerHTML == 'C') {
//     //     input.value = '';
//     //     parentheses = '';
//     //     arr = [];
//     //     res = [];
//     //     return;
//     // };

//     // if (button.innerHTML == '()'){

//     //     if (parentheses == '('){
//     //         parentheses = '';
//     //         input.value += ')';
//     //         return
//     //     }

//     //     else{

//     //         input.value += '(';
//     //         parentheses = '(';
//     //         return
//     //     }
//     // };

//     calc(button.innerHTML);

// })

// function calc(expression){

//     switch(expression){

//     case '=':

//         arr.push(res.join(''))
//         console.log(arr)
//         try {
//             // input.value = eval(input.value.slice(0, input.value.length - 1));
//             input.value = eval(arr.join(''))
//             arr = [];
//             res=[];
//         }
//         catch {
//             input.value = 'Ошибка';
//             arr = [];
//             res=[];
//         };

//         arr.push(input.value)

//     case 'C':
//         input.value = '';
//         parentheses = '';
//         arr = [];
//         res = [];
//         break;

//     case '()':

//         if (parentheses == '('){
//             parentheses = '';
//             input.value += ')';
//             break;
//         }

//         else{

//             input.value += '(';
//             parentheses = '(';
//             break;
//         }

//     case '%':
//         console.log(arr)
//         arr.push(String(eval(`${arr.slice(0, arr.length - 1).join('')} / 100 *  ${res.join('')}`)))

//         console.log(arr)
//         break;

//     case (!isNaN(expression)):
//             res.push(expression)
//             console.log(res)
//             break;
//     case 'DEL':
//             input.value = input.value.slice(0, input.value.length - 1);
//             arr.pop()
//             break;

//     default:
//         arr.push(res.join(''))
//         arr.push(expression)
//         res = [];
//         console.log(arr)

//     // if (expression == '='){
//     //     try {
//     //         input.value = eval(input.value.slice(0, input.value.length - 1));
//     //     }
//     //     catch {
//     //         input.value = 'Ошибка';
//     //     };

//     //     arr = []
//     // };

//     }}

// // switch(expression){

//     //         case '=':
//     //             try {
//     //                 input.value = eval(input.value.slice(0, input.value.length - 1));
//     //             }
//     //             catch {
//     //                 input.value = 'Ошибка';
//     //             };
//     //             arr = []
//     //             break

//     //         case !isNaN(expression):

//     //             res.push(expression)
//     //             console.log(res)
//     //             break;

//     //         case '%':
//     //             arr[arr.length - 1] = `/ 100 *  ${arr[arr.length - 2]}`
//     //             break;

//     //         default:

//     //             arr.push(res.join(''))
//     //             arr.push(expression)
//     //             res = [];
//     //             console.log(arr)
//     //             break;
//     //     };
