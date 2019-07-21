export class Club {
    type = 'club';
    id: string;
    name: string;
    rating: number;
    creator: string;
    members: any;
    // creationDate: any;

    constructor(id?: string, name?: string, creator?: string, members?: any) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.members = members;
        this.rating = 0;
    }
}
