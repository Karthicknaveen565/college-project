import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies: service(),
    queryParams: ['employeeid'],
    customerid:null,
    goback:null,
    result:null,
    init(){
        this._super(...arguments);
        this.employeeid;
        this.checkinvite=false;
        this.initialinvite=true;
        this.initial=true;
        this.accepted=false;
        this.rejected=false;
    },
    actions:{
        displaydetails(eid)
        {
           Ember.$.ajax({
              url:'http://localhost:8080/clgproject/getEmployeeDetails',
              type:'POST',
              dataType:'json',
              data:{
                id:eid
              }
           }).then((response)=>{
                console.log(response);
                this.set("result",response.result[0]);
                this.send("checktask",eid);
           });
        },
        gotodashboard()
        {
            let destination=this.goback;
            console.log(this.goback);
            this.transitionToRoute(destination);
        },
        invitetowork(eid)
        {
            var cid = this.customerid;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/createWork',
                type:'POST',
                dataType:'json',
                data:{
                    eid:eid,
                    cid:cid
                }

            }).then((res)=>{
                console.log(res);
                this.set("initialinvite",false);
                this.set("checkinvite",true);
            });
        },
        checktask(eid)
        {
            var cid=this.customerid;
            Ember.$.ajax({
               url:'http://localhost:8080/clgproject/checkWork',
               type:'POST',
               datatype:'json',
               data:{
                   eid:eid,
                   cid:cid
               }
            }).then((response)=>{
                console.log(response);
                var text=response.success;
                if(text=="task exist")
                {
                    var status=response.status;
                    if(status == 0)
                    {
                        this.set("initialinvite",false);
                        this.set("checkinvite",true);
                        this.set("initial",true);
                        this.set("accepted",false);
                        this.set("rejected",false);
                    } 
                    if(status == 1 || status == 2)
                    {
                        this.set("initial",false);
                        this.set("accepted",true);
                        this.send("displayalldetails",eid);
                    }
                    if(status == -1)
                    {
                        this.set("initialinvite",false);
                        this.set("checkinvite",false);
                        this.set("initial",true);
                        this.set("accepted",false);
                        this.set("rejected",true);
                    }
                }
                else
                {
                    this.set("initialinvite",true);
                    this.set("checkinvite",false);
                    this.set("initial",true);
                    this.set("accepted",false);
                    this.set("rejected",false);
                }
                
            });
        },
        displayalldetails(eid){
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/getFullEmployeeDetails',
                type:'POST',
                dataType:'json',
                data:{
                  id:eid
                }
             }).then((response)=>{
                  console.log(response);
                  this.set("result",response.result[0]);
             });
        },
        reinvite()
        {
            var cid=this.customerid;
            var eid=this.employeeid;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/updateInvitationStatus',
                type:'POST',
                dataType:'json',
                data:{
                  cid:cid,
                  eid:eid,
                  status:0
                }
             }).then((response)=>{
                  console.log(response);
                  if(response.response == "updated")
                  {
                    window.location.reload();
                  }
                  else{
                    console.log("error in reinvite");
                  }
             });
        },
        cancelinvite(){
           var cid=this.customerid;
           var eid=this.employeeid;
           Ember.$.ajax({
               url:'http://localhost:8080/clgproject/RemoveFromWorkList',
               type:'POST',
               dataType:'json',
               data:{
                cid:cid,
                eid:eid
               }
           }).then((response)=>{
               if(response.success == "task removed")
               {
                 window.location.reload();
               }
               else{
                  console.log("error in cancelinvite");
               }
           })
        },
        redirecttohome(){
            let cookieService = this.get('cookies');
            cookieService.clear('customerid');
            window.location.reload();
        },
        saveratingandreview(){
            var cid=this.customerid;
            var eid=this.employeeid;
            var rating = document.getElementById("rating-value").value;
            if(rating=="")
            {
                rating = 1;
            }
            console.log(rating);
            var text = document.getElementById("textAreaExample").value;
            console.log(text);
            // var words = text.split(/\s+/);
            // console.log(words);
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/reviewAndRating',
                type:'POST',
                dataType:'json',
                data:{
                    eid:eid,
                    cid:cid,
                    rating:rating,
                    review:text
                }
            }).then((response)=>{
                console.log(response.success);
            })
            this.send("cancelinvite");
            this.send("updatestatus",0);
            this.send("gotodashboard");
            
        },
        updatestatus(status){
            var eid=this.employeeid;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/updateAvailabilityStatus',
                type:'POST',
                dataType:'json',
                data:{
                  eid:eid,
                  status:status
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
        },
        gotodashboard()
        {
              this.transitionToRoute("userdashboard")
        },
        dummy()
        {
            console.log("dummy version");
        }
    }
});
