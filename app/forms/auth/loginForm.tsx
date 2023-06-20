import { withFormik } from "formik";
import * as yup from "yup";

import InnerLoginForm from "../../components/auth/innerLoginForm";
import { LoginFormValuesInterface } from "../../contracts/auth";
import callApi from "../../helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import Router from "next/router";

const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/  //patern shomare haye iran

const loginFormValidationSchema = yup.object().shape({
    // email : yup.string().required().email(),
    // password : yup.string().required().min(8),
    phone : yup.string().required().min(11).matches(phoneRegExp, 'the phone format is not corect'),
})

interface LoginFormProps {
    // setCookie: any 
    setToken : (token: string) => void
}

const LoginForm = withFormik<LoginFormProps , LoginFormValuesInterface>({
    mapPropsToValues : props => ({
        // email : '',
        // password : '',
        phone : ''
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit : async(values, {props , setFieldError }) => {
        try {
            const res = await callApi().post('auth/login', values);
            if(res.status === 200){
                console.log('ok login',res.data.token);
                props.setToken(res.data.token);
                Router.push('/auth/login/phone-verify');
                // localStorage.setItem('phone-verify-token', res.data.token);
                // props.setCookie('phone-verify-token', res.data.token, {
                //     'maxAge': 3600 * 24 * 30, // one mount in secound 
                //     'domain' :'localhost',
                //     'path' : '/',
                //     'sameSite': 'lax'
                // })
            }
        } catch (error) {
            if(error instanceof ValidationError){
                console.log(error.messages );
                Object.entries(error.messages).forEach( ([key, value ]) => setFieldError(key, value as string ));
                // setFieldError('email', 'error text')
            }
        }
        // console.log({res});
    }
})(InnerLoginForm)

export default LoginForm;