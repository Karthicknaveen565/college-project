import Component from '@ember/component';

export default Component.extend({
    init(){
        this._super(...arguments);
        this.callemployee=this.displayemployee;
        this.result=this.result||"";
        this.ratings=[1,2,3,4,5];

    },
    actions:{
        redirecttodisplayemployee(id){
            console.log(id);
            this.callemployee(id);
        }
    }
});
