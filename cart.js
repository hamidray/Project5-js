




function displayCart(){
    
    let currItem = localStorage.getItem("cart");
    currItem = JSON.parse(currItem);
    let productContainer = documents.querySelector(".currItem");
     let cartCost = localStorage.getItem('totalCost');
    console.log(currItem);
    if( currItem && productContainer) {
        productContainer.innerHTML = '';
        Object.value(currItem).map(item => {
            productContainer.innerHTML += `

              <div class ="product">
              <ion-icon name ="close-circle"></jon-icon>
              </div>
              <div class="price">$${currItem.price},00</div>
              <div class="quantity">${currItem.qty}</div>
              <div class= "total">$${cartCost},00</div>
              
          `
          ;  
        });
          
    }

}
displayCart();

//////////////////////////////////////////////// Creat Contacts ///////////////
createContact = (response) => {
    onsole.log(response);
    const surname = document.getElementById('surname');
    const forename = document.getElementById('forename');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    
                                                                  /////validation boolen to false/////
    let isSurnameValid= false;
    let isForenameValid= false;
    let isValidAddress= false;
    let isCityValid= false;
    let isEmailValid= false;
                                                                ///// regex for data validation/////
    const regName = /^ [A-Za-z] {3,32}$/;
    const regAddress = /^ [A-Za-z0-9 ] {7,32}$/; 
    const emailReg = /^ [a-z0-9._%+-] +@[a-z0-9.-]+\.[a-z]{2,}$/;

    
                                                              ////Surename Validation ///// Uses Blur Listener if true update//////

    surname.addEventListener('blur', () => {
        if (regName.test(surname.value)) {
            surnameError.classList.add('d-none');
            isSurnameValid = true;
            surname.style.border = 'medium solid red';
        }
        else {
            surnameError.classList.remove('d-none');
            surname.style.border = 'medium solid orang';
        }
    }); 
                                                             ///Forname Validation//////
        forename.addEventListener('blur', () => {
            if (regname.test(forename.value)) {
                forenameError.classList.add('d-none');
                isForenameValid = true;
                forename.style.border = 'medium solid red';
            }
        
            else {
                forenameError.classList.remove('d-none');
                forename.style.border = 'madium solid orang' ;
            }
        });
                                                            /////Address Validation//////
        address.addEventListener('blur' , () => {
            if (regAddress.test(address.value)) {
                addressError.classList.add('d-none');
                isValidAddress = true;
                address.style.border = 'medium solid red';
            }
            else {
                 addressError.classList.remove('d-none');
                 address.style.border = 'madium solid orang';
            }
        });
                                                           /////// City Validation/////////
             city.addEventListener('blur' , () => {
            if (regName.test(city.value)) {
                cityError.classList.add('d-none');
                isCityValid = true;
                city.style.border = 'medium solid red';
            }
            else { 
                 cityError.classList.remove('d-none');
                 city.style.border = 'madium solid orang';
            }
             });
                                                          /////////  email Validation //////    
           email.addEventListener('blur' , () => {
            if (emailReg.test(email.value)) {
                emailError.classList.add('d-none');
                isEmailValid = true;
                email.style.border = 'medium solid red';
                submitError.classList.add('d-none');
            }
            else {
                 emailError.classList.remove('d-none');
                 email.style.border = 'madium solid red';
            }
           });
                                           

           submitButton.addEventListener('click' , ($event) => {
               $event.preventDefault();
               const contact = {
                   firstNmae:forename.value,
                   lastName: surname.value,
                   address: address.value,
                   city: city.value,
                   email: email.value,
                
               };
            
                  const orderObject = {
                      contact , products
                  };
                                  /////submitForm() Validation Bool

                  if ((isSurnameValid) && (isForenameValid) && (isCityValid) && (isEmailValid) && (isValidAddress)) {
                      submitForm(orderObject);
                  }
                                /////// if an ERROR!!!!!!///
                  else {
                      document.getElementById('submitError').classList.remove('d-none');
                  }

                  if (surname.value === '') {
                      surnameError.classList.remove('d-none');
                      surname.style.border = 'medium solid green';
                  }

                  if (forename.value === '') {
                      forenameError.classList.remove('d-none');
                      forename.style.border = 'medume solid green';
                  }
                   if (address.value === '') {
                      addressError.classList.remove('d-none');
                      address.style.border = 'medium solid green';
                  }
                     
                   if (city.value === '') {
                      cityError.classList.remove('d-none');
                      city.style.border = 'medium solid green';
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
                            
}
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


};
        //////opens the confirmatiom page - after clrearing Local storage////
    ///const btn = document.createElement('botton')    
    ///const newA = document.createElement('a');
    ///newA.setAttribute('href', 'confirm.html?id=' + response[i]._id);
    //console.log('setAttribute');
   // newA.textContent('your items added');
   // card.appendChild(newA);
    
    
