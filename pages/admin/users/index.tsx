import AdminPanelLayout from '@/app/components/adminPanelLayout';
import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';

const Users:NextPageWithLayout = () => {
    return (
        <div>
            <h1>User`s Page</h1>
        </div>
    );
};
Users.getLayout = (page) => <AdminPanelLayout>{page}</AdminPanelLayout>
export default Users;