import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies: service(),
    actions:{
        gotodashboard(){
            this.get('cookies').clear();
            this.transitionToRoute("intropage");
        }
    }
});
