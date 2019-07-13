export class User {
    type = 'player';
    id: string;
    email: string;
    clubs: any;
    nickName: string;
    photoURL: string;
    notificationCount: number;

    constructor(id?: string, email?: string, nickName?: string, photoURL?: string) {
        this.id = id;
        this.email = email;
        this.nickName = nickName;
        this.photoURL = photoURL;
        this.clubs = [];
        this.notificationCount = 0;
    }
}
