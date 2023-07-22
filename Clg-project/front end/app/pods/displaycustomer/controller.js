import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies:service(),
    employeeid:null,
    queryParams: ['customerid'],
    checkinvitemsg:null,
    buttonname:null,
    init(){
      this.defaultcase=true;
      this.checkinvite=false;
      
    },
    actions:{
        redirecttohome()
        {
            let cookieService = this.get('cookies');
            cookieService.clear('login');
            window.location.reload();
        },
        displaydetails(cid)
        {
           Ember.$.ajax({
              url:'http://localhost:8080/clgproject/getCustomerDetails',
              type:'POST',
              dataType:'json',
              data:{
                id:cid
              }
           }).then((response)=>{
                console.log(response);
                this.set("result",response.result[0]);
                this.send("getstatus",cid);
           });
        },
        acceptorreject(cid,status){
            
             console.log(cid);
             console.log(status);
             if(status==0)
             {
              this.set("defaultcase",true);
              this.set("checkinvite",false);
             }
             if(status != 0)
             {
                this.set("defaultcase",false);
                this.set("checkinvite",true);
             }
             if(status == 1)
             {
                this.set("checkinvitemsg","accepted");  
                this.set("buttonname","success");
             }
             if(status == -1)
             {
                this.set("checkinvitemsg","rejected");
                this.set("buttonname","danger");
             }
        },
        getstatus(cid)
        {
            var eid=this.employeeid;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/getInvitationStatus',
                type:'POST',
                dataType:'json',
                data:{
                  cid:cid,
                  eid:eid,
                }
             }).then((response)=>{
                  console.log(response);
                  if(response.response == "result found")
                  {
                    this.send("acceptorreject",cid,response.status);
                  }
                  else{
                    console.log("error in updateInvitation Status");
                  }
             });
        },
        updateinvitationstatus(cid,status)
        {
            var eid=this.employeeid;
            Ember.$.ajax({
                url:'http://localhost:8080/clgproject/updateInvitationStatus',
                type:'POST',
                dataType:'json',
                data:{
                  cid:cid,
                  eid:eid,
                  status:status
                }
             }).then((response)=>{
                  console.log(response);
                  if(response.response == "updated")
                  {
                    this.send("acceptorreject",cid,status);
                  }
                  else{
                    console.log("error in updateInvitation Status");
                  }
             });
            //  Ember.$.ajax({
            //     url:'http://localhost:8080/clgproject/sendMessage',
            //     type:'POST',
            //     dataType:'json',
            //  }).then((response)=>{
            //       console.log(response);
            //       if(response.success == "message sent")
            //       {
            //          console.log("message sent");
            //       }
            //       else{
            //         console.log("message not sent");
            //       }
            //  });
            if(status==1)
            {
              this.send("updatestatus",1);
            }
            else if (status == 2){
              this.send("updatestatus",0);
              this.send("gotodashboard");
            }
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
        gotodashboard(){
            this.transitionToRoute("employeedashboard");
        }
    }
    
});
