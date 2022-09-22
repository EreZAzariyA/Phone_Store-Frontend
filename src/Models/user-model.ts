import Role from "./role";

class UserModel {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      roleId: Role;

      constructor(user: UserModel) {
            this.userId = user.userId;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.password = user.password;
            this.roleId = user.roleId
      }
}

export default UserModel