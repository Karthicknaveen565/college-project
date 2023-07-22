import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies:service(),
    employeeid:null,
    init(){
        this._super(...arguments);
        this.show=false;
        this.waiting=true;
        this.accept=false;
        this.reject=false;
        this.showratings=false;
        this.ratings=[1,2,3,4,5];
        this.displayorders=true;

        // this.send('checkorders');
    },
    actions:
    {
       checkorders(){
           var eid = this.employeeid;
           Ember.$.ajax({
              url:'http://localhost:8080/clgproject/receivedOrders',
              type:'POST',
              datatype:'json',
              data:{
                eid:eid
              }
           }).then((response)=>{
                console.log(response);
                var check=response.response;
                if(check=="no results found"){
                       this.set('show',true);
                       this.set("displayorders",false);
                }
                else
                {
                    this.set("displayorders",true);
                    this.set("results",response.result);
                }
                this.send("getRatings");
           });
       },
       displaycustomers(id)
        {
            var eid=this.get('employeeid');
            console.log(eid);
            console.log(id);
            this.transitionToRoute("displaycustomer",{queryParams:{customerid:id}});
        },
        redirecttohome()
        {
            let cookieService = this.get('cookies');
            cookieService.clear('login');
            window.location.reload();

        },
        getRatings()
        {
            var eid = this.employeeid;
           Ember.$.ajax({
              url:'http://localhost:8080/clgproject/getEmployeeRating',
              type:'POST',
              datatype:'json',
              data:{
                eid:eid
              }
           }).then((response)=>{
                console.log(response);
                var check=response.response;
                if(check=="no results found"){
                       this.set('showratings',true);
                       
                }
                else
                {
                    this.set('showratings',false);
                    this.set("results1",response.result);
                }
                this.send("getStatus");
           });
        },
        getStatus(){
            var eid=this.employeeid;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/getAvailabilityStatus',
                type:'POST',
                dataType:'json',
                data:{
                  eid:eid,
                }
             }).then((response)=>{
                  console.log(response);
                  if(response.response == "status obtained")
                  {
                    this.set("Status",response.status);
                    console.log(this.Status);
                  }
                  else{
                    console.log("error in availability Status");
                  }
             }); 
        },
        updateStatus(){
            var select=document.getElementById("my-select").value;
            var eid=this.employeeid;
            if(select !="notfound")
            {
                Ember.$.ajax({
                    url:'http://localhost:8080/clgproject/updateAvailabilityStatus',
                    type:'POST',
                    dataType:'json',
                    data:{
                      eid:eid,
                      status:select
                    }
                 }).then((response)=>{
                      console.log(response);
                      if(response.response == "updated")
                      {
                        console.log("availability status updated")
                      }
                      else{
                        console.log("error in availability Status");
                      }
                 });
            }
        }
    
    }
});
