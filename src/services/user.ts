import myAxios from "../plugins/myAxios";
import {getCurrentUserStates , setCurrentUserStates} from "../states/user";

export const getCurrentUser = async (i:number) => {
    const currentUserStates = getCurrentUserStates();
    if (currentUserStates && i){
        console.log(currentUserStates)
        return currentUserStates;
    }
    //不存在就从远程获取
    const res = await myAxios.get("/user/current");
    if (res.code === 0){
        setCurrentUserStates(res.data);
        return res.data;
    }
    return null;

}