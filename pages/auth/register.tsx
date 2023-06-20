import RegisterForm from '@/app/forms/auth/registerForm'
import { NextPageWithLayout } from '../_app'
import GuestLayout from '@/app/components/guestLayout'
// import type { NextPage } from 'next'
// const Register: NextPage = () => {
const Register: NextPageWithLayout = () => {

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Rigeter on Shopy</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </>
    )
}

Register.getLayout = (page) => <GuestLayout>{page}</GuestLayout>
export default Register
