import Controller from '@ember/controller';

export default Controller.extend({
    actions:
    {
        redirecttoemployeesignin(){
            this.transitionToRoute("employeesignin");
        },
        saveDetails(){
            let check=true;
            let name=document.getElementById("registerName").value;
            let mobilenumber = document.getElementById("registerMobilenumber").value;
            let address = document.getElementById("registerAddress").value;
            let area = document.getElementById("registerArea").value;
            let city = document.getElementById("registerCity").value;
            let email = document.getElementById("registerEmail").value;
            let designation = document.getElementById("registerDesignation").value;
            let charges = document.getElementById("registerCharges").value;
            let password = document.getElementById("registerPassword").value;
            let repeatpassword = document.getElementById("registerRepeatPassword").value;
            if(mobilenumber.length != 10)
            {
                alert("pls enter a valid phone number");
                check=false;
            }
            if(password.length<8)
            {
                alert("pls enter a password greater than 8.");
                check=false;
            }
            if(password!==repeatpassword)
            {
               alert("repeat password is not matching");
               check=false;
            }
            if(check){
             Ember.$.ajax({
                 url:'http://localhost:8080/clgproject/storeEmployeeDetails',
                 type:'POST',
                 dataType: 'json',
                 data:
                 {
                       name:name,
                       mobilenumber:mobilenumber,
                       address:address,
                       area:area,
                       city:city,
                       designation:designation,
                       charges:charges,
                       email:email,
                       password:password
                 }
                 }).then ((response) => {
                 
                     let data=response.success;
                     console.log(data);
                     if(data=="user already exists")
                     {
                         alert("user exits pls log in");
                     }
                     else{
                         alert("registered successfully");
                         this.transitionToRoute('employeesignin');
                     }
                 });
            }
            
         }
    }
});
