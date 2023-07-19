let nameInp = document.querySelector('#name-inp')
let lastNameInp = document.querySelector('#lastname-inp')
let numberInp = document.querySelector('#number-inp')
let imgInp = document.querySelector('#img-inp')

let container = document.querySelector('.container')

let sendBtn = document.querySelector('.send-btn')
let saveBtn = document.querySelector('.save-btn')
let btnClose = document.querySelector('.btn-close')


function initStorage() {
  if(!localStorage.getItem('info-data')) {
    localStorage.setItem('info-data', '[]')
  };
};
initStorage();

function setInfoToStorage(info) {
  localStorage.setItem('info-data', JSON.stringify(info))
}

function getInfoFromStorage() {
  let info = JSON.parse(localStorage.getItem('info-data'));
  return info;
};


function cleanFormInp() {
  nameInp.value = '';
  lastNameInp.value = '';
  numberInp.value = '';
  imgInp.value = '';
}


//create 
function createProduct() {
  if(saveBtn.id) return;

  if(!nameInp.value.trim() || !lastNameInp.value.trim() || !numberInp.value.trim() || !imgInp.value.trim() ) return alert('Some inputs are emppty')

  let infoObj = {
    id: Date.now(),
    name: nameInp.value,
    lastName: lastNameInp.value,
    number: numberInp.value,
    img: imgInp.value
  };

  let info = getInfoFromStorage();
  info.push(infoObj);
  setInfoToStorage(info)
  cleanFormInp()
  btnClose.click();
  render()
};



//read 
function render(data=getInfoFromStorage()) {
  container.innerHTML = '';
  data.forEach(item => {
    container.innerHTML += `
    <div class="card" style="width: 18rem;" id="${item.id}">
    <img src="${item.img}" class="card-img-top" alt="..." style="height: 250px;">
    <div class="card-body">
    <h5 class="card-title">${item.name} ${item.lastName}</h5>
    <p class="card-text">${item.number}</p>
    <a href="#" class="btn btn-danger delete-info-btn">Delete</a>
    <a href="#" class="btn btn-secondary update-info-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Update</a>
    </div>
    </div>
    `
  });
  if(data.length === 0) return;
  addDeleteEvent();
  addUpdateEvent();
};
render();


//delete 
function deleteProduct(e) { 
  let infoId = e.target.parentNode.parentNode.id; 
  let info = getInfoFromStorage();
  info = info.filter(item => item.id != infoId);
  setInfoToStorage(info);
  render();
} 

function addDeleteEvent() { 
  let delBtns = document.querySelectorAll(".delete-info-btn"); 
  delBtns.forEach((item) => item.addEventListener("click", deleteProduct)); 
} 


//update 
function updateProduct(e) {
  let infoId = e.target.parentNode.parentNode.id;
  let info = getInfoFromStorage();
  let infoObj = info.find(item => item.id == infoId);
  nameInp.value = infoObj.name;
  lastNameInp.value = infoObj.lastName;
  numberInp.value = infoObj.number;
  imgInp.value = infoObj.img;
  saveBtn.setAttribute('id', infoId)
};

function addUpdateEvent() {
  let updateBtns = document.querySelectorAll('.update-info-btn');
  updateBtns.forEach(item => item.addEventListener('click', updateProduct));
};

function saveChanges(e) {
  if(!e.target.id) return;
  let info = getInfoFromStorage();
  let infoObj = info.find(item => item.id == e.target.id);
  infoObj.name = nameInp.value;
  infoObj.lastName = lastNameInp.value;
  infoObj.number = numberInp.value;
  infoObj.img = imgInp.value;
  setInfoToStorage(info);
  saveBtn.removeAttribute('id');
  cleanFormInp();
  btnClose.click();
  render();
};


btnClose.addEventListener('click', () => {
  cleanFormInp();
  if(saveBtn.id) {
    saveBtn.removeAttribute('id')
  }
})

sendBtn.addEventListener('click', createProduct);

saveBtn.addEventListener('click', saveChanges)