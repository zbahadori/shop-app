import { withFormik } from "formik";
import * as yup from "yup";

import callApi from "../../../helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import Router from "next/router";
import { CreateProductInterface } from "@/app/contracts/admin/products";
import { CreateProducts, UpdateProducts } from "@/app/services/product";
import { toast } from "react-toastify";
import { KeyedMutator } from 'swr';
import Product from "@/app/models/product";
import InnerProductForm from "@/app/components/admin/products/innerProductForm";

const validationSchema = yup.object().shape({
    title : yup.string().required().min(4).max(255),
    category_id : yup.number().required(),
    price : yup.number().required().min(0),
    description : yup.string().required().min(4).max(6000),
})

interface ProductFormProps {
    product: Product,
    mutateProducts? : KeyedMutator<{
        products: any;
        total_page: any;
    }>
}

const EditProductForm = withFormik<ProductFormProps , CreateProductInterface>({
    mapPropsToValues : ({product}) => ({
        title: product.title,
        category_id: product.category ?? "",
        price: product.price,
        description: product.body,
    }),
    validationSchema: validationSchema,
    handleSubmit : async(values, {props , setFieldError }) => {
        try {

            await UpdateProducts(props.product.id, values);

            if(props?.mutateProducts){
                props?.mutateProducts();
            }
            Router.push('/admin/products');

            toast.success('محصول مورد نظر با موفقیت ویرایش شد');
            
        } catch (error) {
            if(error instanceof ValidationError){
                Object.entries(error.messages).forEach( ([key, value ]) => setFieldError(key, value as string ));
                return;
            }
            toast.error('متاسفانه مشکلی در ویرایش محصول وجود دارد');

            console.log(error);
        }
    }
})(InnerProductForm)

export default EditProductForm;