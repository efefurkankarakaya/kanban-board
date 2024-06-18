// import { IUserDTO } from "@/dto/user/auth.dto";

export interface UserCreationData {
  userName: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface IUserModel extends UserCreationData {
  _id: string;
}

// export class UserModel implements IUserModel {
//   _id: string;
//   userName: string;
//   createdAt: Date;
//   lastLogin: Date;

//   constructor(data: IUserDTO) {
//     this._id = data._id.toHexString();
//     this.userName = data.userName;
//     this.createdAt = data.createdAt;
//     this.lastLogin = data.lastLogin;
//   }
// }
