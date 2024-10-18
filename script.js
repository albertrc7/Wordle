let resultElement = document.querySelector('.result');
let rowId = 1;
let words = ['carinyo', 'bebe', 'bimbo', 'octubre', 'frenchie','xixa','brownie','helena','albert','mimitos','culito','tatimu','amor','roma','menorca','somlom','malgrat','arenys','starbucks','delixouxou','vaguete'];

let word = words[Math.floor(Math.random() * words.length)];
let wordArray = word.toUpperCase().split('');
console.log(wordArray);
let mainContainer = document.querySelector('.main-container');
let actualRow = document.querySelector('.row');

drawSquares(actualRow);
listenInput(actualRow);

addFocus(actualRow);

function listenInput(actualRow) {
    let squares = actualRow.querySelectorAll('.square');
    squares = [...squares];

    let userInput = [];

    squares.forEach(element => {
        element.addEventListener('input', event => {

            if (event.inputType !== 'deleteContentBackward') {
                userInput.push(event.target.value.toUpperCase());
                console.log(userInput);
                if (event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                } else {
                    let squaresFilled = document.querySelectorAll('.square');
                    squaresFilled = [...squaresFilled];
                    let lastFiveSquaresFilled = squaresFilled.slice(-word.length);
                    let finalUserInput = [];

                    lastFiveSquaresFilled.forEach(element => {
                        finalUserInput.push(element.value.toUpperCase());
                    });

                    // Evitar repetir letras correctas (verdes)
                    let rightIndex = compareArrays(wordArray, finalUserInput);
                    console.log(rightIndex);
                    rightIndex.forEach(element => {
                        squares[element].classList.add('green');
                    });

                    // Después de marcar las verdes, marcar las doradas
                    let existIndexArray = existLetter(wordArray, finalUserInput, rightIndex);
                    existIndexArray.forEach(element => {
                        squares[element].classList.add('gold');
                    });

                    // Si todas son correctas
                    if (rightIndex.length == wordArray.length) {
                        showResult('¡Ganaste!');
                        return;
                    }

                    let actualRow = createRow();
                    if (!actualRow) {
                        return;
                    }
                    drawSquares(actualRow);
                    listenInput(actualRow);
                    addFocus(actualRow);
                }
            } else {
                userInput.pop();
            }

        });
    });
}

function compareArrays(array1, array2) {
    let iqualsIndex = [];
    array1.forEach((element, index) => {
        if (element == array2[index]) {
            console.log(`En la posicion ${index} sí son iguales`);
            iqualsIndex.push(index);
        } else {
            console.log(`En la posicion ${index} no son iguales`);
        }
    });
    return iqualsIndex;
}

function existLetter(array1, array2, correctIndices) {
    let existIndexArray = [];
    let tempArray1 = [...array1]; // Copia temporal de la palabra original
    let tempArray2 = [...array2]; // Copia temporal del input del usuario

    // Eliminar las letras que ya fueron identificadas como correctas
    correctIndices.forEach(index => {
        tempArray1[index] = null;  // Marcar la posición como ya usada
        tempArray2[index] = null;  // Ignorar la letra correcta del input
    });

    tempArray2.forEach((element, index) => {
        if (element !== null && tempArray1.includes(element)) {
            existIndexArray.push(index);
            // Eliminar la letra del array temporal para que no se repita
            tempArray1[tempArray1.indexOf(element)] = null;
        }
    });

    return existIndexArray;
}

function createRow() {
    rowId++;
    if (rowId <= 5) {
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id', rowId);
        mainContainer.appendChild(newRow);
        return newRow;
    } else {
        showResult(`Perdiste, la respuesta correcta era "${word.toUpperCase()}"`);
    }
}

function drawSquares(actualRow) {
    wordArray.forEach((item, index) => {
        if (index === 0) {
            actualRow.innerHTML += '<input type="text" maxlength="1" class="square focus">';
        } else {
            actualRow.innerHTML += '<input type="text" maxlength="1" class="square">';
        }
    });
}

function addFocus(actualRow) {
    let focusElement = actualRow.querySelector('.focus');
    focusElement.focus();
}

function showResult(textMsg) {
    resultElement.innerHTML = `
    <p>${textMsg}</p>
    <button class="button">Reiniciar</button>`;

    let resetBtn = document.querySelector('.button');
    resetBtn.addEventListener('click', () => {
        location.reload();
    });
}
