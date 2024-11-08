let buttons = document.querySelector('.grand_butt');
let input = document.querySelector('.form');
let inp = document.querySelector('.FrontDisplay_Input');

let ing = document.querySelectorAll('.ingridien');
let inputBox = document.querySelector('.Textinput-Box');

let clear = document.querySelector('.clear');
let parentheses = '';

let inputCopy = '';

let operands = {
    lNum: 0,
    rNum: 0,
    expression(operand, lnum, rnum) {
        this.lNum = Number(lnum);
        this.rNum = Number(rnum);

        switch (operand) {
            case '+':
                return this.lNum + this.rNum;

            case '-':

                return this.lNum - this.rNum;
            case '*':
                return this.lNum * this.rNum;
            case '/':
                if (this.rNum !== 0) {
                    return this.lNum / this.rNum;
                } else {
                    input.value = 'Ошибка';
                }
            default:
                input.value = 'Ошибка';
        }
    }
};

function priority(string){

    let priorityList = [];

    for (let i = 0; i < string.length; i++){

        switch(string[i]){
            case ')':
            case '(':
                priorityList.push([1, i])
                break;
            case '*':
            case '/':
                priorityList.push([2, i])
                break;
            case '+':
            case '-':
                priorityList.push([3, i])
                break;
        }


    };

    return priorityList.sort((a, b) => a[0] - b[0]);
}




buttons.addEventListener('click', function(event){
    let button = event.target;

    if (button.tagName != 'BUTTON') return;

    calc(button.innerHTML)

});




function calc(butt){
    switch(butt){
        case 'DEL':
            input.value = input.value.slice(0, input.value.length - 1)
            inputCopy = inputCopy.slice(0, inputCopy.length - 1)
            break;

        case 'C':
            input.value = '';
            inputCopy = '';
            break;

        case '*':
        case '/':
        case '-':
        case '+':
            input.value += butt
            inputCopy += ' ' + butt + ' ';
            break;

        case '()':
            if (parentheses == '('){
                parentheses = '';
                input.value += ')';
                inputCopy += ' ) ';
            }

            else{

                input.value += '(';
                inputCopy += ' ( ';
                parentheses = '(';

            }
            break;


        case '=':

            if (input.value.includes('(') && parentheses == '('){

                input.value += ')';
                inputCopy += ' ) '
                parentheses = '';
            }


            let res = inputCopy.split(' ');

            let sortPriority = priority(res);


            let totalShift = 2;
            let leftOperand =  -1;
            let rightOperand = 1;
            let indexPriority = sortPriority[0][0];






            for (let i = 0; i < sortPriority.length; i++){

                if (sortPriority[i][0] == 3){

                    totalShift = -sortPriority.filter(elem => elem[1] < sortPriority[i][1]).length * 2

                }

                if (sortPriority[i][0] == 2){

                    totalShift -= 2;
                }

                if (sortPriority[i][0] == 1){
                    
                }


                let operator = sortPriority[i][1] + totalShift






                let dig = operands.expression(res[operator], res[operator + leftOperand],
                    res[operator + rightOperand]);

                    console.log('indexPriority:', indexPriority)
                    console.log('operator:',sortPriority[i][0])

                    console.log('номер элемента:', i)

                    console.log('индекс выражения:',operator)
                    console.log(...sortPriority)
                    console.log('индекс левого операнда:', leftOperand)
                    console.log('индекс правого операнда:', rightOperand)
                    console.log('смещение:', totalShift)
                    console.log('смещенный индекс левого операнда:',operator + leftOperand)
                    console.log('смещенный индекс:', operator - totalShift)
                    console.log('смещенный индекс правого операнда:',operator+ rightOperand)

                    console.log('----------------------------------------------------')


                    res[operator - 1] = dig;
                    res.splice(operator, 2)






                    console.log(res)

            }

            input.value = res;

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
//     // }