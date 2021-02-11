       function displayCart(){
    
    let cartItems = localStorage.getItem("cart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems)
    let productContainer = document.querySelector(".products");
     let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer) {
        console.log("running")
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
              <div class ="product">
              
              <ion-icon name ="close-circle"></ion-icon>
              <div class="product-title">${item.name}</div>
              <div class="lens">${item.lenses}</div>
              <div class="price">$${item.price}</div>
              
              </div>
            
          `
        });
            
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


let contacts = [];
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

localStorage.setItem('MyContactList' , JSON.stringify(contacts))
};
          document.addEventListener('DOMContentLoaded' , () => {
  document.getElementById('btn').addEventListener('click' , addContact);
  

     });

 



 