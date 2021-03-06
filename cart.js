
///////   Get Data From LocalStorage///////////// 

let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);
console.log(cartItems)

///////////////Display Item in Cart  And Map To Product////////////////

function displayCart(){
    
    let productContainer = document.querySelector(".products");
    let cartCostN  = localStorage.getItem('totalCost');
    
    console.log("here is" , cartCostN );
    console.log(cartItems);
    if(cartItems && productContainer) {
      
      console.log("running")
      // firat time noting 
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
      // second time add item + more not overright and create backtik for inject items inside html 
      productContainer.innerHTML += `
      <div class ="product">
      <div class="product-title">${item.name}</div>
      <div class="lens">${item.lenses}</div>
      <div class="qty">${item.qty}</div>
      <div class="price">$${item.price}</div>
      <button class="remove" data-name="${item.name}"
      data-lens="${item.lenses}">Remove</button>
      </div>
      `
               
      ////////////OnClick Remove Bottom/////////////
            
      productContainer.onclick = function(e) {
        
      console.log("clicked List")
      console.log(e.target)
      const lens = e.target.dataset.lens
      const name = e.target.dataset.name
      
      /////////////// Update TotalCost when item removed///////////////////
                           
      cartCostN  = parseInt(cartCostN);
      localStorage.setItem("totalCost" , cartCostN - item.price) ;
              
      ///////////////////Remove Item/////////////////////

      console.log(cartItems);
      removeItem(e,name,lens);
      return
    }
    
   });
       
   
           //////////////////////Remove Item/////////////////////////////////
        
    function removeItem(e,name,lens) {
      
      //////////////need to delete item from cart/////////
     for (let i = 0; i <cartItems.length; i++) {
       //if the name is in list name of pass in 
        if (cartItems[i].name === name && cartItems[i].lenses === lens )  {
          console.log(cartItems[i].name);
          cartItems.splice(i, 1);
          console.log(cartItems);
        }
    }
   ////////////////remove node from page////////////////////////////
     e.target.parentElement.remove();
   /////////// //get cart sync in local storage/////////////////////

     localStorage.setItem("cart" , JSON.stringify(cartItems));
     cartItems = JSON.parse(localStorage.getItem("cart"));

     updateTotal();
     
    }
     // update function + get item.price fron cartitems .
     function updateTotal() {
       const basket = document.getElementById("basketTot");
     
       let total = 0;
        for (let i = 0; i <cartItems.length; i++)  {
          total += cartItems[i].price ;
          console.log(cartItems[i]); 
           }
           console.log(basket.innerHTML, total);
        basket.innerHTML = total;  
        localStorage.setItem('totalCost' , total); 
     }
 
   //////////////// Map Total Basket ///////////////////////////////   
  
   productContainer.innerHTML += `
   <div class="basketTotalContainer">
    <h5 class="basketTotalTitle">
         Basket Total
    </h5>
     <h5 class="basketTotal" id="basketTot">
         $${cartCostN }
     </h5>   
   </div>   
   `
    };
    
  }
 ////// Function display : Void///////////////////////////////////////////

  displayCart();
      
///////////////////////////// Create Contacts/////////////////////////////
  
  const fname = document.getElementById('fname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');  
  const address = document.getElementById('address'); 
  const city = document.getElementById('city');
  const errorElement = document.getElementById('error');
  const form = document.getElementById('form');
   
///////////////////////////  Form Validation function  /////////////////////////////
    
  form.addEventListener('submit', (e) => {
        
    let messages = [];

    if (fname.value === '' || fname.value == null) {
        messages.push('Warning : Name is Required');
    }
    if(lastname.value === '' || lastname.value == null) {
       messages.push('Lastname is required')
    }
    if(address.value === '' || address.value == null) {
        messages.push('Address is required')
    }
    if(city.value === '' || city.value == null) {
      messages.push('City is required')
    }
    if(email.value === '' || email.value == null) {
      messages.push('Email is required')
    }
    if (messages.length > 0) {
      e.preventDefault()
      errorElement.innerText = messages.join(', ')
    }
     e.preventDefault();

       // ************************************************************************
      // ** get id and creat new array and push id to new array **************************************
      // ************************************************************************
      function getIds() {
        let idArray = [];
        for(let i=0; i <cartItems.length; i++) {
          idArray.push(cartItems[i].id);
          console.log(idArray);
          
        };
        return idArray
      };
      
      let cartIds = getIds();
      console.log(cartIds);
     // ************************************************************************
                  ////Create posstOpject Request//////////////
     // ************************************************************************
      // same shape of server requred.
      const  postRequestObj = {
      contact: {
          firstName:fname.value,
          lastName: lastname.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
     products: cartIds
    }
      ////////////////// Submit Form Data and "Fetch" send "POST" request to "Server"////////
    fetch('http://localhost:3000/api/cameras/order', {
      
      method: 'POST',
      headers: {
      // the content type header value is usually auto set - depending on the request body
        'Content-Type': 'application/json', 
         'Accept': 'application/json'
    },
     body: JSON.stringify(postRequestObj)
    })
      .then(response => response.json())
      //Return the response as formdata object 
      .then(data  => {
       console.log(data);
       console.log('Success:', postRequestObj);
       localStorage.clear();
       window.location.href = 'confirm.html';
       ////save data to local storage
       localStorage.setItem('MyOrderId' , JSON.stringify(data));
       
    })
       .catch((error) => console.error('Error:' , error));
       // return with Error if catch error
    });
   
    
