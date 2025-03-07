import Role from "./role-model";

class UserModel {
    unsubscribe() {
      throw new Error('Method not implemented.');
    }
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public identifyNumber: number;
    public password: string;
    public city: string;
    public street: string;
    public role: Role;
}

export default UserModel;
