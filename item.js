 
/////////functio for API//////////////////////////////////////////
///////////////console.log("running")////////////////////////////////

const products = document.getElementById('products');
let currItem = {

    'name': '',
    'price': 0,
    'lenses':'',
    'qty' : 1,
    'id' : ''
}; 
//get item cart if doesnt exit logical or emplt array string
let cartString = localStorage.getItem("cart") || '[]';
console.log(cartString);
let cart = JSON.parse(cartString);
console.log(cart);

////////////////////////////////Make Request ////////////////////////
   
makeRequest = () => {
    return new Promise((resolve, reject) => {
        //id is retreived from the querystring searchparm
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        
       let apiRequest = new XMLHttpRequest();
       //id is used to build the unique url for the single item page.
       apiRequest.open('GET' , 'http://Localhost:3000/api/cameras/' + id);
       apiRequest.send();
       apiRequest.onreadystatechange = () => {
        if (apiRequest.readyState === 4) { 
            if (apiRequest.status === 200) {
       // if ready state and status return success codes resolve promise with response.   
         resolve(JSON.parse(apiRequest.response));
        } else{
            //if unsuccessfull reject with error message.
            reject('Something went wrong - API resquest Faild ');
        }
      }
     }
  });
}

//================== Create Elements ================================

createCard = (response) => {
    //create and query elements
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
    //setup classes and attributes and append to card
    newImg.classList.add('img');
    newImg.setAttribute('width' ,'100%');
    newImg.setAttribute('src' , img) ;
    card.appendChild(newImg);
    

    card.classList.add('col', 'card', 'p-3');
    card.innerHTML += '<h2>' + response.name + '</h2>';
    currItem.name = response.name  
    currItem.id = response._id
    dropMenuLabel.innerHTML = 'Choose you lense here &nbsp;&nbsp;&nbsp;';
    dropMenu.classList.add('drop-menu');
    document.querySelectorAll('.drop-menu')
    dropMenu.addEventListener('change' , changeLens);
    function changeLens(ev) {
        console.log(ev.target.value);
        currItem.lenses = ev.target.value;
    }
    form.appendChild(dropMenuLabel);
    form.appendChild(dropMenu);
       
      for (let x in response.lenses) {
      const option = document.createElement('option');
      option.innerHTML = response.lenses[x];
      option.setAttribute('value' , response.lenses[x])
      dropMenu.appendChild(option);
    }
    
    currItem.lenses = response.lenses[0];
     
     
    card.innerHTML += '<p>' +response.description +'</p>';
    card.innerHTML += '<p>' + '$' + response.price / 100 + '</p>';
    card.appendChild(form);
    currItem.price = response.price / 100;
    currItem.qty = 1

    btn.classList.add('btn','btn-secondary','w-25' , 'mx-auto');
    btn.innerHTML = 'Add to Card';
    newP.classList.add('text-center' , 'text-success');
    newP.innerHTML += '<p>' + response + '</p>';
    products.appendChild(card);
    card.appendChild(btn);
    card.appendChild(main);
    
               
  /////////////////   BTN Event add even Listener   /////////////////////

    btn.addEventListener('click' , (ev) => {
        
        document.querySelector("#app").innerHTML =
     `<p> Thank you !!!Your Product Successfully added ${currItem.name},${currItem.lenses} </p>
      <a href="index.html" class="navbar-brand">Shop</a>
      <a href="cart.html" class="navbar-brand"> <ion-icon name= "basket"></ion-icon>Cart</a>
       `   
        ///// alert(' !!! Your Current Item Added Successfully');
        totalCost(currItem);          
        console.log('currItem' , currItem);
        let quantChange = false;
        if (cart.length === 0 ) {
            cart.push(currItem);
            quantChange = true;
        
        } else  { 
            for(i=0; i < cart.length; i++){
                if (currItem.name === cart[i].name && currItem.lenses === cart[i].lenses) {
                    cart[i].qty += 1
                    quantChange = true;
               
                } 
            }
        }

        if (!quantChange) {
            cart.push(currItem);
        }
        localStorage.setItem("cart" , JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
        
        quantChange = false;
        currItem.qty = 1;
        
    });
       
   ///////////////////// Total Cost ///////////////////////
   
  function totalCost(currItem) {
     console.log("the product price is ,product.price");
      let cartCost  = localStorage.getItem('totalCost');
     console.log("my cartCost is" , cartCost);
     ////typof we want see which kind off data is it
      console.log(typeof cartCost );
      /////if cart cost is not null if the exsit////
      if (cartCost != null) {
          //update my cart coz should convet from  string to a number
           cartCost = parseInt(cartCost);
           localStorage.setItem("totalCost" , cartCost + currItem.price);
           
       } else {
           //first time add do this :
           localStorage.setItem("totalCost", currItem.price);
      };
    };
          
 }///////////closed Respons createCard////////////////

   
   init = async () => {
        // call makeRequest for api request and await respose 
        try{
            const requestPromise = makeRequest();
            const response = await requestPromise;
             //pass response to createCard function to display results

            createCard(response);
        } catch (error) {
            //error message displayed if request fails
            document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>';
        }
        }
    
     init()
