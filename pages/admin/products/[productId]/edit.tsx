import { useState } from "react";
import AdminPanelLayout from "../../../../app/components/adminPanelLayout";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { NextPageWithLayout } from "../../../_app";
import Modal from "../../../../app/components/shared/modal";
import { useRouter } from "next/router";
import CreateProductForm from "@/app/forms/admin/product/createProductForm";
import useSWR from 'swr';
import { GetSingleProduct } from "@/app/services/product";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ValidationError from "@/app/exceptions/validationError";
import { toast } from "react-toastify";
import EditProductForm from "@/app/forms/admin/product/editProductForm";


const ProductEdit: NextPageWithLayout = ({ productId } : InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter();
    
    // const productId = router.query.productId;
    const {data, error} = useSWR({url: `/admin/products/${productId}/edit` , productId}, GetSingleProduct);

    // if(! router.isReady){
    //     return <span>Page Is Loading</span>
    // }

    if(error instanceof ValidationError){
      router.push('/admin/products');
      toast.error('چنین محصولی وجود ندارد');
      return <></>
    }

    const isLoading = !data && !error;

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">ویرایش محصول</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                 {
                  isLoading 
                  ? 
                    <div>Loading...</div>
                  :
                    <EditProductForm product={data.product} />
                 }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductEdit.getLayout = (page) => <AdminPanelLayout>{page}</AdminPanelLayout>;

export const getServerSideProps : GetServerSideProps = async ({query}) => {
  return {
    props :{
      productId : query?.productId
    }
  }
}

export default ProductEdit;
