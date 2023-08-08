// Get elements from the HTML
const liquidFieldSet = document.getElementById("liquidFieldSet");
const fruitFieldSet = document.getElementById("fruitFieldSet");
const veggieFieldSet = document.getElementById("veggieFieldSet");
const specialtyFieldSet = document.getElementById("specialtyFieldSet");
const submitButton = document.getElementById("submitButton");
const newOrderButton = document.getElementById("newOrder");
const smoothieMachineSection = document.getElementById("smoothieMachineSection");
const yourOrderSection = document.getElementById("yourOrderSection");
let objectName = 'orderNumber';
let orderNumber = 1;
const output = document.getElementById("output");
const output2 = document.getElementById("output2");
class smoothie {
    constructor(
            size,
            liquids,
            fruits,
            veggies,
            specialties,
        ) {
            this.size = size;
            this.liquids = liquids;
            this.fruits = fruits;
            this.veggies = veggies;
            this.specialties = specialties;
        }
  // Initialize variables for ordering
    outputDescription() {
        output.textContent = `Size: ${this.size}`;
        let tempString = "";
        let mainIngridentsArray = [];
        if (this.liquids.length > 1) {
            for (let i = 0; i < this.liquids.length; i++) {
                if (i == this.liquids.length - 1) {
                    tempString += `and ${this.liquids[i]}`
                }
                if (i != this.liquids.length - 1) {
                    tempString += `${this.liquids[i]}, `;
                }
            }

            tempString = `Your smoothie will have a mixture of ${tempString} as a base.`;
        }
        if (this.liquids.length <= 1) {
            tempString = `Your smoothie will have ${this.liquids[0]} as a base.`;
        }
        this.fruits.length > 0 ? this.fruits.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        this.veggies.length > 0 ? this.veggies.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        
        this.specialties.length > 0 ? this.specialties.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
       
        if (mainIngridentsArray.length > 1) {
            tempString += `The main ingridents will include: `
            for (let i = 0; i < mainIngridentsArray.length; i++) {
                if (i == mainIngridentsArray.length - 1) {
                    tempString += `and ${mainIngridentsArray[i]}.`;
                }
                if (i != mainIngridentsArray.length - 1) {
                    tempString += `${mainIngridentsArray[i]}, `;
                }
            }
        }
        if (mainIngridentsArray.length == 1) {
            tempString += `The main ingrident will be: ${mainIngridentsArray[0]} `;
        }
        output2.textContent = tempString;
    }
}

async function populate() {
    const requestURL = "https://raw.githubusercontent.com/tongxixihaha/jsassignment3/main/js/SmoothieMachine.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    const smoothieMachineOptions = await response.json();
    populateOptions(smoothieMachineOptions);
}
populate();

function populateOptions(options) {
   
    let liquids = options.liquids;
    let fruits = options.fruits;
    let veggies = options.veggies;
    
    let specialties = options.specialty;
   

    populateFieldSet(liquidFieldSet, liquids, "liquids");
    populateFieldSet(fruitFieldSet, fruits, "fruits");
    populateFieldSet(veggieFieldSet, veggies, "veggies");
   
    populateFieldSet(specialtyFieldSet, specialties, "specialties");
    
}

let populateFieldSet = (fieldset, jsonObj, key) => {
    for (let i = 0; i < jsonObj.length; i++) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        input.type = "checkbox";
        input.id = `${jsonObj[i]["name"]}Checkbox`;
        input.name = `${key}Checkbox`;
        input.value = `${jsonObj[i]["name"]}`;
        label.for = `${jsonObj[i]["name"]}Checkbox`;
        label.textContent = `${jsonObj[i]["name"]}`;
        let container = document.createElement("div");
        container.appendChild(input);
        container.appendChild(label);
        fieldset.appendChild(container);
    }
};


let placeOrder = () => {
 
    const size = document.querySelector('input[name="size"]:checked').value;
    const selectedLiquidElements = getSelectedItems("liquidsCheckbox");
    const selectedLiquidsArray = getSelectedValues(selectedLiquidElements);
    const selectedFruitElements = getSelectedItems("fruitsCheckbox");
    const selectedFruitsArray = getSelectedValues(selectedFruitElements);
    
    const selectedVeggieElements = getSelectedItems("veggiesCheckbox");
    const selectedVeggiesArray = getSelectedValues(selectedVeggieElements);
    const selectedSpecialtyElements = getSelectedItems("specialtiesCheckbox");
    const selectedSpecialtiesArray = getSelectedValues(selectedSpecialtyElements);
    
   
    if (selectedLiquidsArray.length == 0) {
        alert(`You must select atleast one base liquid.`);
        return;
    }
 
    window[objectName + orderNumber] = new smoothie(
        size,
        selectedLiquidsArray,
        selectedFruitsArray,
       
        selectedVeggiesArray,
        selectedSpecialtiesArray,
       
    );
    window[objectName + orderNumber].outputDescription();
    orderNumber++;
    yourOrderSection.style.display = "";
    smoothieMachineSection.style.display = "none";
};

let getSelectedItems = (checkName) => {
    return document.querySelectorAll(`input[name="${checkName}"]:checked`);
};

let getSelectedValues = (elementsArray) => {
    let tempArray = [];
    elementsArray.forEach((selectedOption) => {
        tempArray.push(selectedOption.value);
    });
    return tempArray;
};

submitButton.addEventListener("click", placeOrder);

newOrderButton.addEventListener("click", () => {
    smoothieMachineSection.style.display = "";
    yourOrderSection.style.display = "none";
    let allCheckBoxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
  
    allCheckBoxes.forEach((inputElement) => { inputElement.checked = false; });
  
    document.querySelector('input[id="small"]').checked = true;
});