export class courses {



    constructor(public id:number = 0, public teachID:number=0, public name:string ="") {

        this.teachID = teachID;
        this.name=name;

    }
    clone() {
        return new courses(this.id,
           this.teachID,
            this.name);
    }

}