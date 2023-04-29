const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

const displayItems = () => {
    let itemsFromStorage;
    if(localStorage.getItem("items") === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    itemsFromStorage.forEach((item) => {
        addItemToDOM(item);
    })
    checkUI();
}


const onSubmit = (e) => {
    e.preventDefault();
    
    const newItem = itemInput.value;

    if(checkItemIfExist(newItem)){
        alert("Item Exist");
        return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);
    checkUI();

    itemInput.value = " ";
}

function addItemToDOM(item) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);
}


function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    let itemsFromStorage;
    if(localStorage.getItem("items") === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    itemsFromStorage.push(item);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));

}

function checkItemIfExist(item){
    let itemsFromStorage;
    if(localStorage.getItem("items") === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsFromStorage.includes(item);

}

itemForm.addEventListener('submit', onSubmit);

function onClickItem(e) {
    if(e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement.parentElement);
    }
}

const removeItem = (item) => {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUI();
}


function removeItemFromStorage(itemText){
    let itemsFromStorage;
    if(localStorage.getItem("items") === null){
        itemsFromStorage = []
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    itemsFromStorage = itemsFromStorage.filter((item) => item!== itemText);
    
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));

}


itemList.addEventListener('click', onClickItem);

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem("items");
    
    checkUI();
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll("li");
    items.forEach((item) => {
        if(item.firstChild.textContent.toLowerCase().includes(text)) {
            item.style.display = "flex";
        }else {
            item.style.display = "none";
        }
    })

}

clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);

function checkUI() {
    const items = document.querySelectorAll("li");
    if(items.length === 0) {
        clearBtn.style.display = "none";
        filter.style.display = "none";
    }else{
        clearBtn.style.display = "block";
        filter.style.display = "block";
    }
}

checkUI();

document.addEventListener("DOMContentLoaded", displayItems);
