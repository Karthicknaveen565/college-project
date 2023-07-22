import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    cookies: service(),
    beforeModel(){
        let cookieService = this.get('cookies');
        let cookies = cookieService.read();
        console.log(cookies);
        this.set('id',cookies.customerid);
        if(this.id==null)
        {
            this.transitionTo('/');
        }
    },
    setupController(controller,model){
        this._super(controller, model);
        controller.set("customerid",this.id);
        controller.send("checkinvitationstatus");
   }
});
