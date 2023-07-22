import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    cookies: service(),
    beforeModel(){
        let cookieService = this.get('cookies');
        let cookies = cookieService.read();
        console.log(cookies);
        this.set('id',cookies.customerid);
        console.log(this.id);
        if(this.id==null)
        {
            console.log("hello world");
            this.transitionTo('/');
        }
    }
});
