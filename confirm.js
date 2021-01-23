//functio for API///
makeRequest = () => {
    return new Promise ((resolve, reject) => {
       let apiRequest = new XMLHttpRequest();
       apiRequest.open('GET' , 'http://Localhost:3000/api/cameras/');
       apiRequest.send();
       apiRequest.onreadystatechange = () => {
        if (apiRequest.readyState === 4) { 
            if (apiRequest.status=== 200) {

         resolve(JSON.parse(apiRequest.response));
        }       
        else{
            reject('Server is down !!! ');
        }
      }
     }
    });
}