let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)


// get total

function getTotal(){
  // console.log('done')
  if (price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value )
     - +discount.value ;
      total.innerHTML = result;
      total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#a00d02';
  }
  
}



//create product
let dataPro = JSON.parse(localStorage.getItem('product')) || [] ;

submit.onclick = function (){
  let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  console.log('2');
  if (mood === 'create'){
    if(newPro.count > 1){
      for(let i = 0 ; i < newPro.count  ; i++){
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro [tmp] = newPro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
    
  }
  
  // save in localstorge
  localStorage.setItem('product' , JSON.stringify(dataPro));
  clearData();
  showData();
}

// clean inputs

function clearData(){
  title.value = '';
  price.value='';
  taxes.value = '';
  ads.value='';
  discount.value = '';
  total.innerHTML='';
  count.value = '';
  category.value='';
}
// read 
function showData(){
  let table ="";
  for(let i = 0 ; i < dataPro.length ; i++){
    const dataObject = dataPro[i];
    const{title,price,taxes,ads,discount,total,count,category}=dataObject;
    table += `<tr>
    <td>${i + 1}</td>
    <td>${title}</td>
    <td>${price}</td>
    <td>${taxes}</td>
    <td>${ads}</td>
    <td>${discount}</td>
    <td>${total}</td>
    <td>${count}</td>
    <td>${category}</td>
    
    <td><button onclick="updateData(${i});" id="update">update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
  </tr>`
}
document.getElementById('tbody').innerHTML = table;
let btnDelete = document.getElementById('deleteAll');
if(dataPro.length > 0){
  btnDelete.innerHTML = `
  <button onclick="deleteAll()" class="delete-all">Delet All</button>
  `
} else {
  btnDelete.innerHTML = '';
}
getTotal();
}
showData();

// delete
function deleteData(i){
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}


function deleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();

}

// update

function updateData(i){
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value=dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'update';
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth',
  })

}



// search

 let serchMood = '';
 function getSerchMood(id){
  let serch = document.getElementById('search');
  if (id == 'searchTitle'){
    serchMood = 'title';
    serch.placeholder = 'serch by title';
  } else {
    serchMood = 'categroy';
    serch.placeholder = 'serch by category';

  }
  serch.focus();
 }

 function searchData(value){
  let table = '';
  if(serchMood == 'title'){

    for(let i = 0 ; i < dataPro.length ; i++){
      if (dataPro[i].title.includes(value.toLowerCase())){
        table += `<tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].count}</td>
    <td>${dataPro[i].category}</td>
    
    <td><button onclick="updateData(${i});" id="update">update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
  </tr>`
      }
    }
  }else {
    for(let i = 0 ; i < dataPro.length ; i++){
      if (dataPro[i].category.includes(value.toLowerCase())){
        table += `<tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].count}</td>
    <td>${dataPro[i].category}</td>
    
    <td><button onclick="updateData(${i});" id="update">update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
  </tr>`
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;

 }










// clean data