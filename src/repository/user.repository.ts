import User from "../model/user.model";

const createUser = async(userData: any)=>{
    try{
        const user = await User.create(userData);
        return {data:user, success:true};
    }catch(error: any){
        throw {success: false, message: error.message};
    }
}

const getUserByEmail = async(email: any)=>{
    try{
        const user = await User.findOne({email});
        return {data:user, success:true};
    }catch(error: any){
        throw {success: false, message: error.message};
    }
}

const getUserById = async(id: any)=>{
    try{
        const user = await User.findById(id);
        return {data:user, success:true};
    }catch(error: any){
        throw {success: false, message: error.message};
    }
}


export {createUser, getUserByEmail, getUserById};