import { useState } from "react";
import AdminPanelLayout from "../../../app/components/adminPanelLayout";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { NextPageWithLayout } from "../../_app";
import Modal from "../../../app/components/shared/modal";
import { useRouter } from "next/router";
import CreateProductForm from "@/app/forms/admin/product/createProductForm";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/store/auth";
import { toast } from "react-toastify";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];


const ProductCreate: NextPageWithLayout = () => {

  const user = useSelector(selectUser);
  console.log({user});
  const router = useRouter();

  // if(permissions.length === 0) {
  if(! user.canAccess('add_new_product|manage_products')) {
    router.push('/admin');
    return <span>Loading ...</span>
}
   
// "manage_products" 
// "manage_users"
// "edit_product"
// "delete_product"
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">ایجاد محصول</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <CreateProductForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductCreate.getLayout = (page) => <AdminPanelLayout>{page}</AdminPanelLayout>;

export default ProductCreate;
