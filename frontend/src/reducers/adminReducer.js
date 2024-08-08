export function adminUserUpdate(state, action) {
  switch (action.type) {
    case'id':
    return {
      ...state,
      id:action.value
    };
    case "name":
      return { ...state, name: action.value };
    case "email":
      return { ...state, emailid: action.value };
    case "mobile":
      return { ...state, mobile: action.value };

    default:
      return state;
  }
}

export function usereditValidation(state, action) {
  switch (action.type) {
   
    case "name":
      return {
        ...state,
        name: action.valid,
        nameerror: !action.valid ? "please provide proper name" : "",
      };
    case "emailid":
      return {
        ...state,
        emailid: action.valid,
        emailerror: !action.valid ? "please provide proper emailid" : "",
      };
    case "mobile":
      return {
        ...state,
        mobile: action.valid,
        mobileerror: !action.valid ? "please provide valid mobile number" : "",
      };
    default:
      return state;
  }
}
