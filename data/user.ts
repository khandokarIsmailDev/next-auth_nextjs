import { db } from "@/lib/db";

export const getUserByEmail =async (email:string) =>{
    try{
        const user = await db.user.findFirst({where:{email}});
        // console.log('-----343aerererer',user)
        return user;
    }catch(err){
        return null;
    }
}

export const getUserById = async (id:string) =>{
    try{
        const user = await db.user.findUnique({where:{id}})
        return user;
    }catch(err){
        null;
    }
}