
    ///////////functio for API////////////////////////////////////////
//console.log("running")
const products = document.getElementById('products');
let currItem = {

    'name': '',
    'price': 0,
    'lenses':'',
    'qty' : 1,
}; 
  
let cartString = localStorage.getItem("cart") || '[]';
console.log(cartString);
let cart = JSON.parse(cartString);
console.log(cart);

////////////////////////////////Make Request ////////////////////////
   
makeRequest = () => {
    return new Promise((resolve, reject) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        
       let apiRequest = new XMLHttpRequest();
       apiRequest.open('GET' , 'http://Localhost:3000/api/cameras/' + id);
       apiRequest.send();
       apiRequest.onreadystatechange = () => {
        if (apiRequest.readyState === 4) { 
            if (apiRequest.status === 200) {

         resolve(JSON.parse(apiRequest.response));
        } else{
            reject('Something went wrong - API resquest Faild ');
        }
      }
     }
    });
}

//================== Create Elements =========================

createCard = (response) => {
    console.log(response);
    const card = document.createElement('Article');
    console.log(response.imageUrl);
    const img = response.imageUrl;
    const newImg = document.createElement('IMG');
    const btn = document.createElement('button');
    const form = document.createElement('form');
    const main = document.createElement('main');
    const dropMenuLabel = document.createElement('Label');
    const dropMenu = document.createElement('select');
    const newP = document.createElement('p');
    
    
    newImg.classList.add('img');
    newImg.setAttribute('width' ,'100%');
    newImg.setAttribute('src' , img) ;
    card.appendChild(newImg);

   card.classList.add('col', 'card', 'p-3');
   card.innerHTML += '<h2>' + response.name + '</h2>';
   currItem.name = response.name  
   dropMenuLabel.innerHTML = 'Choose you lense here &nbsp;&nbsp;&nbsp;';
   form.appendChild(dropMenuLabel);
   form.appendChild(dropMenu);

   for (let x in response.lenses) {
      const option = document.createElement('option');
      option.innerHTML = response.lenses[x];
      option.setAttribute('value' , response.lenses[x])
      dropMenu.appendChild(option);
    };
    
   
    card.appendChild(form);
    currItem.lenses = response.lenses[0];

    card.innerHTML += '<p>' +response.description +'</p>';
    card.innerHTML += '<p>' + '$' + response.price / 100 + '</p>';
    currItem.price = response.price;
    currItem.qty = 1

    btn.classList.add('btn','btn-secondary','w-25' , 'mx-auto');
    btn.innerHTML = 'Add to Card';
    newP.classList.add('text-center' , 'text-success');
    newP.innerHTML += '<p>' + response + '</p>';
    products.appendChild(card);
    card.appendChild(btn);

               
  /////////////////   BTN Event Listener   /////////////////////
    btn.addEventListener('click' , () => {

                 alert("added");
            
        console.log(currItem);
        if (cart.length === 0 ) {
            cart.push(currItem);
        
        }else  { 
            for(i=0; i < cart.length; i++){
                if (currItem.name === cart[i].name && currItem.lenses === cart[i].lenses) {
                    cart[i].qty += 1
                } else {
                    cart.push(currItem);
                } 
            }
        }
        
        localStorage.setItem("cart" , JSON.stringify(cart));
        cart = localStorage.getItem("cart");
        console.log(cart);
     
    
    });
   
   ////////////// Total Cost //////////////

  // function totalCost(currItem) {
   // console.log(" The product price is", currItem.price);
   // let cart = localStorage.getItem("totalCost");
   // console.log("my cartCost" , cartCost);
   // localStorage.setItem("totalCost", currItem.price);

   //////////// Display Item /////////////////
               
    
  

 
}///////closed Respons creatCard




   init = async () => {
        try{
            const requestPromise = makeRequest();
            const response = await requestPromise;

            createCard(response);
        } catch (error) {
            document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>';
        }
        }
    
     init()
       
    
    
