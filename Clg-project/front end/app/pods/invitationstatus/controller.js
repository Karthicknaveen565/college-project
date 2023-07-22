import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies: service(),
    customerid:null,
    init(){
        this.show=false;
        
    },
    actions:{
        checkinvitationstatus()
        {
            let cid=this.customerid;
           Ember.$.ajax({
              url:'http://localhost:8080/clgproject/checkInvitationStatus',
              type:'POST',
              datatype:'json',
              data:{
                cid:cid
              }
           }).then((response)=>{
                console.log(response);
                var check=response.response;
                if(check=="no results found"){
                       this.set('show',true);
                       
                }
                else
                {
                    this.set('show',false);
                    this.set("results",response.result);
                }
           });
        },
        displayemployee(id)
        {
            let cookieService = this.get('cookies');
            cookieService.write('goback',"invitationstatus");
            this.transitionToRoute("displayemployee",{queryParams:{employeeid:id}});
        },
        redirecttohome(){
            let cookieService = this.get('cookies');
            cookieService.clear('customerid');
            window.location.reload();
        },
        redirecttodashboard(){
            this.transitionToRoute('userdashboard');
        }

    }
});
