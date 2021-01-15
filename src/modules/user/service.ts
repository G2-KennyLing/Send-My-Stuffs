import { IUser } from './model';
import Users from './schema';
export default class UserService {
    
    public createUser(userParams: IUser, callback: any) {
        const _session = new Users(userParams);
        _session.save(callback);
    }

    public filterUser(query: any, callback: any) {
        Users.findOne(query, callback);
    }

    public filterUsers(query: any, callback){
        Users.find(query, callback);
    }

    public updateUser(userParams: IUser, callback: any) {
        const query = { _id: userParams._id };
        Users.findOneAndUpdate(query, userParams,{new: true}, callback);
    }

    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        Users.deleteOne(query, callback);
    }

    public updateUserSync(_id: String ,query: any, callback: any){
        Users.findByIdAndUpdate(_id, query,{new: true}, callback);
    }

}