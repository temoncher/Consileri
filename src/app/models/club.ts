export class Club {
    type = 'club';
    id: string;
    name: string;
    rating: number;
    creator: {
        id: string,
        nickName: string,
        photoURL: string
    };
    members: any;
    imgURL: string;
    // creationDate: any;

    constructor(id?: string, name?: string, creator?: any, members?: any, imgURL?: string) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.members = members;
        this.imgURL = imgURL;
        this.rating = 0;
    }
}
