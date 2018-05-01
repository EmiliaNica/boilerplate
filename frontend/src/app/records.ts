export class records {



    constructor(public id = 0, public courseID: number = 0, public studID: number = 0, public grade: number = 0) {

        this.courseID = courseID;
        this.studID = studID;
        this.grade = 0;

    }
    clone() {
        return new records(this.id,
            this.courseID,
            this.studID,
            this.grade);
    }

}