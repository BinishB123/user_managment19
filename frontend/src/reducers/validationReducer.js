export function LoginValidation(state, action) {
  switch (action.type) {
    case "emailid":
      return {
        ...state,
        emailid: action.valid,
        emailerror: !action.valid ? "please provide a proper emailid" : "",
      };
    case "password":
      return{
        ...state,
        password:action.valid,
        passworderror:!action.valid?'password not provided':""
      }
    default:
      return state ;
  }
}

export default function SignUpValidation(state, action) {
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
    case "password":
      return {
        ...state,
        password: action.valid,
        passworderror: !action.valid ? "please provide proper password" : "",
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


export  function usereditValidation(state, action) {
  
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