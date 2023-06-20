import { withFormik } from "formik";
import * as yup from "yup";

import callApi from "../../../helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import Router from "next/router";
import { CreateProductInterface } from "@/app/contracts/admin/products";
import { CreateProducts } from "@/app/services/product";
import { toast } from "react-toastify";
import InnerProductForm from "@/app/components/admin/products/innerProductForm";

const validationSchema = yup.object().shape({
    title : yup.string().required().min(4).max(255),
    category_id : yup.number().required(),
    price : yup.number().required().min(0),
    description : yup.string().required().min(4).max(6000),
})

interface ProductFormProps {
}

const CreateProductForm = withFormik<ProductFormProps , CreateProductInterface>({
    mapPropsToValues : props => ({
        title: '',
        category_id: '',
        price: 0,
        description: '',
    }),
    validationSchema: validationSchema,
    handleSubmit : async(values, {props , setFieldError }) => {
        try {
            console.log({values});
            // const res = await callApi().post('products/create', {
            //     ...values,
            //     body : values.description,
            //     category : values.category_id
            // });
            await CreateProducts(values);

            Router.push('/admin/products');

            toast.success('محصول مورد نظر با موفقیت ثبت شد');
            
        } catch (error) {
            if(error instanceof ValidationError){
                Object.entries(error.messages).forEach( ([key, value ]) => setFieldError(key, value as string ));
                return;
            }
            toast.error('متاسفانه مشکلی در ثبت محصول وجود دارد');

            console.log(error);
        }
    }
})(InnerProductForm)

export default CreateProductForm;