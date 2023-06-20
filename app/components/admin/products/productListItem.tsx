import Product from '@/app/models/product';
import React, { useState } from 'react';
import DeleteConfirmation from '../../shared/deleteConfirmation';
import { toast } from 'react-toastify';
import ValidationError from '@/app/exceptions/validationError';
import { DeleteProducts } from '@/app/services/product';
import { KeyedMutator } from 'swr';
import Modal from '../../shared/modal';
import EditProductForm from '@/app/forms/admin/product/editProductForm';
import { useRouter } from 'next/router';
import Link from 'next/link';


interface Props {
    product : Product, 
    mutateProducts : KeyedMutator<{
        products: any;
        total_page: any;
    }>
}


const ProductListItem = ({ product, mutateProducts } : Props) => {
    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState<boolean>(false);
    const router = useRouter();
    const deleteHandler = async () => {
        try {
            await DeleteProducts(product.id);

            await mutateProducts();
            
            toast.success('محصول مورد نظر با موفقیت حذف شد');

            setShowDeleteConfirmation(false);
            
        } catch (error) {
            if(error instanceof ValidationError){
                Object.entries(error.messages).forEach( ([key, value ]) => toast.error(value as string));
                return;
            }
            toast.error('متاسفانه مشکلی در حذف محصول وجود دارد');

            console.log(error);
        }
    }
    return (
        <tr>
            <td className='hidden'>
                {
                    // showCreateProduct &&  <Modal
                    `edit-product-${product.id}` in router.query &&  <Modal
                        // setShow={setShowCreateProduct}
                        setShow={() => router.push('/admin/products')}
                    >
                        <div className="inline-block w-full max-w-3xl mt-8 mb-20 overflow-hidden text-right align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
                            <h2 className="text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b">ویرایش محصول</h2>
                            <EditProductForm product={product} mutateProducts={mutateProducts} />
                        </div>
                    </Modal>
                }
                {
                    showDeleteConfirmation && <DeleteConfirmation 
                        title={`حذف محصول${product.title}`}
                        description='آیا از حذف حصول مورد نظر خود اطمینان دارید یا خیر؟ در صورت حذف محصول قابل برگشت نیست'
                        handleCancel={() => setShowDeleteConfirmation(false)} 
                        handleTrue={deleteHandler}
                    />
                }
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {product.id}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.title}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <Link
                    href={`/admin/products?edit-product-${product.id}`}
                    as={`/admin/products/${product.id}/edit`}
                    type="button"
                    className="text-indigo-600 hover:text-indigo-900 ml-4"
                >
                    ویرایش
                </Link>
                <button onClick={() => setShowDeleteConfirmation(true)} className="text-indigo-600 hover:text-indigo-900">
                    حذف
                </button>
            </td>
        </tr>
    );
};

export default ProductListItem;