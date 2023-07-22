import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies: service(),
    actions:
    {
        sendData(){
            console.log("hello");
            let mail = document.getElementById("email").value;
            let password= document.getElementById("password").value;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/userLogin',
                type:'POST',
                dataType: 'json',
                data:
                {
                      mail:mail,
                      pass:password
                }
            }).then ((response) => {
                
                let data=response.success;
                let id = response.customerid;
                console.log(data);
                if(data == "login failed incorrect username or password")
                {
                    alert("incorrect email or password");
                }
                else{
                    let cookieService = this.get('cookies');
                    cookieService.write('customerid', id);
                    this.transitionToRoute("userdashboard");
                }
                
            });
        },
        redirecttousersignup(){
             this.transitionToRoute("usersignup");
        }
    }
});
