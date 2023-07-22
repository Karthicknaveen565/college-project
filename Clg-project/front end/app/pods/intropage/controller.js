import Controller from '@ember/controller';

export default Controller.extend({

    actions:{
        redirecttosignin(){
            this.transitionToRoute('commonsignin');
        },
        redirecttosignup(){
            this.transitionToRoute('commonsignup');
        }
    }
});
