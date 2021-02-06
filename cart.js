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

        
        
          ////////remove item///////
        /// ion-icon.onclick function () {
          //localStorage.removeItem("products")
       // }

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
    ///('.products ion-icon').click( function() {
      //  localStorage.removeItem(this);
     //  });
    
      
}
displayCart();
////////remove item///////
///delete_data.onclick=function(){
   /// localStorage.removeItem("products")
//}

//  createContact = (response) => {
        //onsole.log(response);
        const container = document.getElementsByClassName('container')
        const form = document.getElementsByClassName('card-p5');
        const firstname = document.getElementById('first-name');
        const lastname = document.getElementById('last-name');
        const email = document.getElementById('email');
        const address = document.getElementById('address');
        const submitButton =  document.getElementById('submit-button');
        const done =document.getElementsByClassName('d-done')

        
        
        ///boolen to false/////
        let isFirstnameValid= false;
        let isLastnameValid= false;
        let isValidAddress= false;
        let isEmailValid= false;


        const regLastname = /^ [A-Za-z] {3,32}$/; 
        const regName = /^ [A-Za-z] {3,32}$/;
        const regAddress = /^ [A-Za-z0-9 ] {7,32}$/; 
        const emailReg = /^ [a-z0-9._%+-] +@[a-z0-9.-]+\.[a-z]{2,}$/;
           
    

       
        firstname.addEventListener('blur', () => {
            if (regName.test(firstname.value)) {
                firstnameError.classList.add('d-none');
                isFirstnameValid = true;
                firstname.style.border = 'medium solid red';
            }
            else {
                firstnameError.classList.add.remove('d-none');
                firstname.style.border = 'medium solid orang';
            }
        }); 

        lastname.addEventListener('blur', () => {
            if (regLastname.test(lastname.value)) {
                lastnameError.classList.add('d-none');
                isLastnameValid = true;
                lastname.style.border = 'medium solid red';
            }
            else {
                lastnameError.classList.remove('d-none');
                lastname.style.border = 'medium solid orang';
            }
        });

        email.addEventListener('blur', ($event) => {
            if (emailReg.test(email.value)) {
                emailError.classList.add('d-none');
                isEmailValid = true;
                email.style.border = 'medium solid red';
            }
            else {
                emailError.classList.remove('d-none');
                email.style.border = 'medium solid orang';
            }
        });

        address.addEventListener('blur', () => {
            if (regAddress.test(address.value)) {
                addressError.classList.add('d-none');
                isValidAddress = true;
                address.style.border = 'medium solid red';
            }
            else {
                addressError.classList.remove('d-none');
                address.style.border = 'medium solid orang';
            }
        });
         
          submitButton.addEventListener('click' , ($event) => {
               $event.preventDefault();
               const Contact = {
                   firstName:firstname.value,
                   lastName: lastname.value,
                   address: address.value,
                   email: email.value,
                
               }
                        const orderObject = {
                Contact , container
            };
                  /////submitForm() Validation Bool/////

           if ((isFirstnameValid) && (isLastnameValid) && (isEmailValid) && (isValidAddress)) {
                submitForm(orderObject);
           }
               //if an ERROR!!!!!!///
           else {
               document.getElementById('submitError').classList.remove('d-none');
            }

           if (surname.value === '') {
               firstnameError.classList.remove('d-none');
               firstname.style.border = 'medium solid green';
            }

            if (lastname.value === '') {
               lastnameError.classList.remove('d-none');
               lastname.style.border = 'medume solid green';
            }
             if (address.value === '') {
                addressError.classList.remove('d-none');
              address.style.border = 'medium solid green';
            }
               
             
            if (email.value === '') {
              emailError.classList.remove('d-none');
               email.style.border = 'medium solid green';
           }
            

        });
            
        submitForm = async (orderObject) => {
           try {
                const resquestPromise = makeRequest(orderObject);
                const response = await resquestPromise;

               displayConfirmation(response);
                createContact(response); 
           } catch (error) {
                document.querySelectorAll('form').innerHTML = '<h2 class = "mx-auto">' + error +'<h2>';
           }
        }
                             /////Function to make api request////
                            
                            makeRequest = (data) => {
                               return new Promise((resolve, reject) => {
                                    let apiRequest = new XMLHttpRequest();
                                    apiRequest.open('post' ,'http://localhost:3000/api/cameras/order');
                                    apiRequest.setRequestHeader('Content-Type', 'application/json');
                                    apiRequest.send(JSON.stringify(data));
                                   apiRequest.onreadystatechange = () => {
                                        if (apiRequest.readyStatus === 4) {
                                           if (apiRequest.status === 201) {
                                                resolve(JSON.parse(apiRequest.response));
                                           }
                                            if (apiRequest.status === 400) {
                                                reject(" Something Went Wrong -- API Request Failed!!")
                                        }
                                    }
                                };
                           });
                        }
                            

  ///close response//////



