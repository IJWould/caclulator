let buttons = document.querySelector('.grand_butt');
let input = document.querySelector('.form');
let inp = document.querySelector('.FrontDisplay_Input');

let ing = document.querySelectorAll('.ingridien');
let inputBox = document.querySelector('.Textinput-Box');

let clear = document.querySelector('.clear');
let parentheses = '';

let inputCopy = '';

function expression(operator='+', lnum=0, rnum=0) {

    let lNum = parseFloat(lnum);
    let rNum = parseFloat(rnum);

    if (typeof lnum === 'string' && lnum.includes('%')){
        lNum /= 100;
   }
    if (typeof rnum === 'string' && rnum.includes('%')){
        rNum = lNum / 100 * rNum;

    };


    switch (operator) {
        case '+':
            return lNum + rNum;
        case '-':
            return lNum - rNum;
        case '*':
            return lNum * rNum;
        case '/':
            return rNum !== 0 ? lNum / rNum : input.value = 'Ошибка';
        default:
            input.value = 'Ошибка';
        };
};




function createPriorityList(string){

    let priorityList = [];
    let check = false;
    for (let i = 0; i < string.length; i++){

        if (string[i].includes('(')) {
            check = true;
            string[i] = string[i].slice(1);
        }
        else if (string[i].includes(')')){
            check = false;
            string[i] = string[i].slice(0, -1);
        };
        switch(string[i]){
            case '*':
            case '/':
                check ? priorityList.push([0, i]) : priorityList.push([2, i]);
                break;
            case '+':
            case '-':
                check ? priorityList.push([1, i]) : priorityList.push([3, i]);
                break;
            default:
                break;

            };
        };
    return priorityList.sort((a, b) => a[0] - b[0]);
};

function inputResult(){

    const start = performance.now();

    if (input.value.includes('(') && parentheses == '('){

        input.value += ')';
        inputCopy += ' )';
        parentheses = '';
    }


    let res = inputCopy.split(' ');

    let sortPriority = createPriorityList(res);

    let operator;
    let totalShift = 2;
    let leftOperand =  -1;
    let rightOperand = 1;
    let shiftForParentheses = 2;

    for (let i = 0; i < sortPriority.length; i++){
        // if (sortPriority[i][0] == 0){
        //     shiftForParentheses -= 2;

        // }
        // else if (sortPriority[i][0] == 1){
        //     shiftForParentheses = -sortPriority.filter(elem =>elem[0] < 2 && elem[1] < sortPriority[i][1]).length * 2


        if (sortPriority[i][0] == 2){

           totalShift -= 2;

        }
        else if (sortPriority[i][0] == 3){

            totalShift = -sortPriority.filter(elem =>elem[1] < sortPriority[i][1]).length * 2

        };



        operator = sortPriority[i][1] + totalShift


        let dig = expression(res[operator], res[operator + leftOperand],
            res[operator + rightOperand]);

            console.log('operator:',sortPriority[i][0])

            console.log('номер элемента:', i)

            console.log('индекс выражения:',sortPriority[i][1])
            console.log(...sortPriority)
            console.log(res)
            console.log('индекс левого операнда:', leftOperand)
            console.log('индекс правого операнда:', rightOperand)
            console.log('смещение:', totalShift)
            console.log('смещенный индекс левого операнда:',operator + leftOperand)
            console.log('смещенный индекс:', operator)
            console.log('смещенный индекс правого операнда:',operator+ rightOperand)

            console.log('----------------------------------------------------')


        res[operator - 1] = dig;
        res.splice(operator, 2)

        console.log(res)
        console.log('----------------------------------------------------')

        }

    const end = performance.now();
    console.log(`Время выполнения: ${end - start} мс.`);
    input.value = res;
    inputCopy = res;
}


buttons.addEventListener('click', function(event){
    let button = event.target;
    if (button.tagName != 'BUTTON') return;
    calc(button.innerHTML)
});



input.addEventListener('keydown', function(event){
    if (/[0-9%\/*\-+\(\)=]|Backspace|Enter/.test(event.key)){
        calc(event.key);
        event.preventDefault();
    }
});

// document.addEventListener('keydown', event => {

//     if ((event.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(event.key)

// })




function calc(butt){

    switch(butt){
        case 'Backspace':
        case 'DEL':
            input.value = input.value.slice(0, - 1)
            inputCopy = inputCopy.slice(0, - 1)
            break;


        case 'C':
            input.value = '';
            inputCopy = '';
            parentheses ='';
            break;

        case '*':
        case '/':
        case '-':
        case '+':
            input.value += butt
            inputCopy += ' ' + butt + ' ';
            break;
        case '%':
            input.value += butt;
            inputCopy += butt;
            break;

        case '()':
            if (parentheses == '('){
                parentheses = '';
                input.value += ')';
                inputCopy += ')';
            }

            else{
                input.value += '(';
                inputCopy += '(';
                parentheses = '(';
            }
            break;

        case 'Enter':
        case '=':
            inputResult()
            break;

        default:

            input.value += butt;
            inputCopy += butt;
            break;
    }
}






































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
