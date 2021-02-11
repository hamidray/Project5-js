      ///////////Show Item ////////////////////////////
let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);
console.log(cartItems)
    
function displayCart(){
    
    let productContainer = document.querySelector(".products");
     let cartCost = localStorage.getItem('totalCost');
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
              <button class="remove" data-name="${item.name}" data-lens="${item.lenses}">Remove</button>

           </div>
            
          `
          productContainer.onclick = function(e) {
            console.log("clicked List")
            console.log(e.target)
             const lens = e.target.dataset.lens
             const name = e.target.dataset.name
              removeItem(e,name,lens);
              
              return
  
         //   }
          }
        
        });

//////////////////////Remove Item/////////////////////////////////

        
        function removeItem(e,name,lens) {
         
          //need to delete item from cart//
          for (let i = 0; i <cartItems.length; i++) {
            if (cartItems[i].name === name && cartItems[i].lenses === lens) {
              cartItems.splice(i, 1);
              console.log(cartItems);
            
           }
          }
          //remove node from page
          e.target.parentElement.remove();

          //get cart sync in local storage
          localStorage.setItem("cart" , JSON.stringify(cartItems));
          cartItems = JSON.parse(localStorage.getItem("cart"));
          
        
        }
             productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h5 class="basketTotalTitle">
             Basket Total
          </h6>
          <h5 class="basketTotal">
            $${cartCost}
          </h5>     
        `
    }
  }
  
displayCart();



///////////////////// ADD Contacat////////////////

let contacts = [];
let form = document.getElementsByClassName('card-p5');
const addContact = (ev)=>{
  ev.preventDefault();
let contact = {
  firstname: document.getElementById('firstname').value,
  lastname: document.getElementById('lastname').value,
  email: document.getElementById('email').value,
  address: document.getElementById('address').value,
}
contacts.push(contact);
document.forms[0].reset(); ////to clear the form for the next entries

///for display purposes only

console.warn('Your INFO Added' ,{contacts} );

///pre.textContent = JSON.stringify('Submited', contact);

///////saving to local storage/////////

///localStorage.setItem('MyContactList' , JSON.stringify(contacts))
};
          document.addEventListener('DOMContentLoaded' , () => {
  document.getElementById('btn').addEventListener('click' , addContact);
  

     });

 



 