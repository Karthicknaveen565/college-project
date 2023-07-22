import Controller from '@ember/controller';

export default Controller.extend({
    actions:
    {
        redirecttousersignup(){
            this.transitionToRoute('usersignup')
        },
        redirecttoemployeesignup(){
            this.transitionToRoute('employeesignup');
        },
        redirecttointropage(){
            this.transitionToRoute('/');
        }
    }
});
