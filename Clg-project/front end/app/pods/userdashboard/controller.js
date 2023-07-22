import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies: service(),
    verify:false,
    results:null,
    loader:false,
    init(){
       
       this.send("getDetails");
    },
    actions:
    {
        getDetails()
        {
            this.set("loader",true);
            console.log("entered into controller");
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/getAllEmployeeDetails',
                type:'POST',
                dataType: 'json',
            }).then ((response) => {
                
                console.log(response);
                let check = response.response;
                if(check=="no results found")
                {
                    this.set("verify",true);
                }
                else
                {
                   this.set("results",response.result); 
                }
                this.set("loader",false);
                
            });
        },
        redirecttohome()
        {
            let cookieService = this.get('cookies');
            cookieService.clear('customerid');
            window.location.reload();
        },
        displayemployee(id)
        {
            console.log(id);
            let eid=id;
            let cookieService = this.get('cookies');
            cookieService.write('goback',"userdashboard");
            this.transitionToRoute("displayemployee",{queryParams:{employeeid:id}});
        },
        searchjob()
        {
            var search = document.getElementsByName('search');
            var search_type;
            for(var i = 0; i < search.length; i++){
                if(search[i].checked){
                search_type = search[i].value;
                }
            }
            console.log(search_type);
            let searchval=document.getElementById("searchval").value;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/searchjob',
                type:'POST',
                dataType: 'json',
                data:{
                    search:searchval,
                    searchby:search_type
                }
            }).then ((response) => {
                
                console.log(response);
                let check = response.response;
                if(check=="no results found")
                {
                    this.set("verify",true);
                    this.set("results",response.result);
                }
                else
                {
                    this.set("verify",false);
                   this.set("results",response.result); 
                }
                
            });
        },
        gotoinvitationstatus()
        {
            this.transitionToRoute("invitationstatus");
        },
        filter(){
         console.log("filter done");

        }
    }
});
