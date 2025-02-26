import Cafe from '../model/cafe.model';

const createCafe = async (cafeData: any) => {
    try{
        const cafe = await Cafe.create(cafeData);
        return {data:cafe, success:true};
    }catch(error: any){  
        throw {success: false, message: error.message};
    }
}

const getCafeById = async (cafeId: any) => {
    try{
        const cafe = await Cafe.findById(cafeId);
        return {data:cafe, success:true};
    }catch(error: any){
        throw {success: false, message: error.message};
    }
}

const getCafeByMobileNumber = async (mobileNumber: any) => {
    try{
        const cafe = await Cafe.findOne({mobile_number:mobileNumber});
        return {data:cafe, success:true};
    }catch(error: any){
        throw {success: false, message: error.message};
    }
}
export {createCafe, getCafeById, getCafeByMobileNumber};
