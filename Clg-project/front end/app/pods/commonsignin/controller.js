import Controller from '@ember/controller';

export default Controller.extend({
    actions:{
        redirecttousersignin(){
            this.transitionToRoute('usersignin');
        },
        redirecttoemployeesignin(){
            this.transitionToRoute('employeesignin');
        },
        redirecttohome(){
            this.transitionToRoute('/')
        }
    }
});