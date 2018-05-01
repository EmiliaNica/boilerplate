export class users {

     

    constructor(public id = 0 ,public name:string = '', public teacher = false, public username:string ='',public password:string ='') {
        
        this.name = name;
        this.teacher = teacher;
        this.username = username;
        this.password = password;
    }
    clone(){
        return new users(this.id,this.name = name,
        this.teacher ,
        this.username,
        this.password );
    }
    
}