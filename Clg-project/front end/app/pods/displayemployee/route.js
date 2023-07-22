import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    cookies: service(),
    beforeModel(){
        let cookieService = this.get('cookies');
        let cookies = cookieService.read();
        console.log(cookies);
        this.set('id',cookies.customerid);
        this.set('back',cookies.goback);
        if(this.id==null)
        {
            this.transitionTo('/');
        }
    },
    model(params) {
        return params;
    },
    setupController(controller,model)
    {
        controller.set("customerid",this.id);
        controller.set("goback",this.back);
        controller.send('displaydetails',model.employeeid);
    }
});
