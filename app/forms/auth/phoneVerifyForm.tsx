import { withFormik } from "formik";
import * as yup from "yup";

import { PhoneVerifyFormValuesInterface } from "../../contracts/auth";
import callApi from "../../helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import Router from "next/router";
import innerPhoneVerifyForm from "@/app/components/auth/innerPhoneVerifyForm";
import { storeLoginToken } from "@/app/helpers/auth";


const phoneVerifyFormValidationSchema = yup.object().shape({
    code : yup.string().required().length(6).matches(/^[0-9]+$/, 'فقط میتوانید عدد وارد کنید'),
})

interface PhoneVerifyFormProps {
   token? : string,
   clearToken : () => void,
}

const PhoneVerifyForm = withFormik<PhoneVerifyFormProps , PhoneVerifyFormValuesInterface>({
    mapPropsToValues : props => ({
        code : '',
        token : props.token || ''
    }),
    validationSchema: phoneVerifyFormValidationSchema,
    handleSubmit : async(values, {props , setFieldError }) => {
        try {
            const res = await callApi().post('auth/login/verify-phone', values);
            // const token = localStorage.getItem('phone-verify-token');
            if(res.status === 200){
                storeLoginToken(res.data?.user?.token);
                await Router.push('/panel');
                //clear phone token verify from redux
                props.clearToken();
            }
        } catch (error) {
            if(error instanceof ValidationError){
                console.log(error.messages );
                Object.entries(error.messages).forEach( ([key, value ]) => setFieldError(key, value as string ));
            }
        }
    }
})(innerPhoneVerifyForm)

export default PhoneVerifyForm;