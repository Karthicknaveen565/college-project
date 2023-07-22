import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
export default Route.extend({
    cookies: service(),
    beforeModel(){
        let cookieService = this.get('cookies');
        let cookies = cookieService.read();
        console.log(cookies);
        this.set('id',cookies.login);
        if(this.id==null)
        {
            this.transitionTo('/');
        }
    },
    setupController(controller,model){
         this._super(controller, model);
         controller.set("employeeid",this.id);
         controller.send("checkorders");
    }
});
