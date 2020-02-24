import {Errors} from "../../redux/ui-reducer";

export interface signUpProps {
     signUpUser(data: {
          email: string,
          password: string,
          confirmPassword: string,
          handle: string
     }, history: any): void;
     loading: boolean;
     errors: Errors;
}