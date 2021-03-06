
///////   Get Data From LocalStorage///////////// 

let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);
console.log(cartItems)

///////////////Display Item in Cart  And Map To Product////////////////

function displayCart(){
    
    let productContainer = document.querySelector(".products");
    let cartCostN  = localStorage.getItem('totalCost');
    
    console.log("here is" , cartCostN /100);
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
                                
      location.reload();
      cartCostN  = parseInt(cartCostN);
      localStorage.setItem("totalCost" , cartCostN - item.price) ;
            location.reload();
      
      
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
     
    }

 
   //////////////// Map Total Basket ///////////////////////////////   
  
   productContainer.innerHTML += `
   <div class="basketTotalContainer">
    <h5 class="basketTotalTitle">
         Basket Total
    </h5>
     <h5 class="basketTotal">
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
      // ******************* stuff I added **************************************
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
        'Content-Type': 'application/json', 
         'Accept': 'application/json'
    },
     body: JSON.stringify(postRequestObj)
    })
      .then(response => response.json())
      .then(data  => {
       console.log(data);
       console.log('Success:', postRequestObj);
       window.location.href = 'confirm.html';
       localStorage.setItem('MyOrderId' , JSON.stringify(data));
       
    })
       .catch((error) => console.error('Error:' , error));
    });
   
    
