import {  withFormik } from "formik";
import * as yup from "yup";
import InnerRegisterForm from "../../components/auth/innerRegisterForm";
import { RegisterFormValuesInterface } from "../../contracts/auth";
import callApi from "@/app/helpers/callApi";
import Router from 'next/router'
import ValidationError from "@/app/exceptions/validationError";

const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/  //patern shomare haye iran

const registerFormValidationSchema = yup.object().shape({
    name : yup.string().required().min(4).max(255),
    phone : yup.string().required().min(11).matches(phoneRegExp, 'the phone format is not corect'),
    // email : yup.string().required().email(),
    // password : yup.string().required().min(8)
})

interface RegisterFormProps {
}

const RegisterForm = withFormik<RegisterFormProps , RegisterFormValuesInterface>({
    mapPropsToValues : props => ({
        name : '',
        phone : '',
        // email : '',
        // password : ''
    }),
    validationSchema: registerFormValidationSchema,
    handleSubmit : async (values, {props , setFieldError }) => {
        try {
            const res = await callApi().post('auth/register', values);
        if(res.status === 201){
            Router.push('/auth/login');
        }
        console.log({values} ,{res});
        } catch (error) {
            if(error instanceof ValidationError){
                console.log(error.messages );
                Object.entries(error.messages).forEach( ([key, value ]) => setFieldError(key, value as string ));
                // setFieldError('email', 'error text')
            }
            console.log(error);
        }
        
    }
})(InnerRegisterForm)

export default RegisterForm;