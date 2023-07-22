import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies: service(),
    actions:{
        redirecttoemployeesignup(){
            this.transitionToRoute('employeesignup');
        },
        login(){
            console.log("hello");
            let mail = document.getElementById("email").value;
            let password= document.getElementById("password").value;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/employeeLogin',
                type:'POST',
                dataType: 'json',
                data:
                {
                      mail:mail,
                      pass:password
                }
            }).then ((response) => {
                
                let data=response.success;
                let id = response.employeeid;
                console.log(data);
                if(data == "login failed incorrect username or password")
                {
                    alert("incorrect email or password");
                }
                else{
                    let cookieService = this.get('cookies');
                    cookieService.write('login', id);
                    this.transitionToRoute('employeedashboard');
                }
                
            });
        }
    }
});
