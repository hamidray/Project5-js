
 /////////   Get Data From LocalStorage///////////// 

let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);
console.log(cartItems)

///////////////Display Item in Cart  And Map To Product////////////////

function displayCart(){
    
    let productContainer = document.querySelector(".products");
    let cartCostN = localStorage.getItem('totalCost');
    console.log("here is" , cartCostN);
    console.log(cartItems);
    if(cartItems && productContainer) {
      console.log("running")
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class ="product">
      <div class="product-title">${item.name}</div>
      <div class="lens">${item.lenses}</div>
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
              
      /////////////// Update TotalCost///////////////////
          
      
      ///////////////////Remove Item/////////////////////

      console.log(cartItems);
      removeItem(e,name,lens);
      return
    }
    updateTotal();
 });
          
//////////////////////Remove Item/////////////////////////////////
        
    function removeItem(e,name,lens) {
      //////////////need to delete item from cart/////////
     for (let i = 0; i <cartItems.length; i++) {
        if (cartItems[i].name === name && cartItems[i].lenses === lens) {
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
    }

    ///////////// Function Update Total///////////////////////////
    function updateTotal(){
      cartCostN = parseInt(cartCostN);
      localStorage.setItem("totalCost" , cartCostN - item.price );
      console.log(cartCostN - item.price);
      productContainer.innerHTML += `
      <div class="basketTotalContainer">
       <h5 class="basketTotalTitle">
            Basket Total
       </h5>
        <h5 class="basketTotal">
            $${cartCostN}
        </h5>   
      </div>   
      ` 
     
    }    

   //////////////// Map Total Basket ///////////////////////////////   

    
    };
  }
 ////// Function display : Void///////////////////////////////////////////

  displayCart();
      
///////////////////////////// Create Contacts/////////////////////////////
  
  const fname = document.getElementById('fname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');  
  const address = document.getElementById('address'); 
  const errorElement = document.getElementById('error');
  const form = document.getElementById('form');
   
///////////////////////////  Form Validation  /////////////////////////////
    
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
    if(email.value === '' || email.value == null) {
      messages.push('Email is required')
    }
    if (messages.length > 0) {
      e.preventDefault()
      errorElement.innerText = messages.join(', ')
    }
     e.preventDefault();

      const  postRequestObj = {
      contact: {
          fnmae:fname.value,
          lastname: lastname.value,
          address: address.value,
          email: email.value,
       },
       ///cartItems [
         // 'id1' , 'id2'
      // ]
     }
    ////////////////// Submit Form Data and "Fetch" send "POST" request to "Server"////////
   
    fetch('http://localhost:3000/api/cameras/order', {

      method: 'POST',
      cache: 'no-cache',
      mode: 'no-cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(postRequestObj),
      })
      .then(response => response.json())
      .then(postRequestObj => {
        console.log('Success:', postRequestObj);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
          
  //  (async () => {
  ///const rawResponse = await fetch('https://httpbin.org/post', {
   // method: 'POST',
   /// headers: {
   //   'Accept': 'application/json',
    //  'Content-Type': 'application/json'
   // },
  //  body: JSON.stringify({a: 1, b: 'Textual content'})
 // });
 // const content = await rawResponse.json();

  //console.log(content);
//})();
 });/////////End Response

   
     
                  


   