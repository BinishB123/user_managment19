
export function userUpdate(state,action){
    switch (action.type) {
        case "name":
            return{...state,name:action.value};
            case 'email':
                return {...state,emailid:action.value}
             case 'mobile':
                return {...state,mobile:action.value}
                case 'image':
                    return {...state,image:action.value}
        default:
           return state;
    }
}

