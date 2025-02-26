import { Response } from "express";


const returnResponse = (responseData: any, res: Response)=>{
    const {status,message,data} = responseData;
    switch(status){
        case 200:
            res.status(status).json({message,data, success:true});
            break;
        case 201:
            res.status(status).json({message,data, success:true});
            break;
        case 400:
            res.status(status).json({message,data, success:false});
            break;
        case 401:
            res.status(status).json({message,data, success:false});
            break;
        case 403:
            res.status(status).json({message,data, success:false});
            break;
        case 404:
            res.status(status).json({message,data, success:false});
            break;
        case 500:
            res.status(status).json({message,data, success:false});
            break;
        default:
            res.status(status).json({message,data, success:false});
            break;
    }
}

export { returnResponse };