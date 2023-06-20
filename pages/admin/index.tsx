import AdminPanelLayout from '@/app/components/adminPanelLayout';
import React from 'react';
import { NextPageWithLayout } from '../_app';

const AdminPanel:NextPageWithLayout = () => {
    return (
        <div>
            <h1>Admin Panel Layout</h1>
        </div>
    );
};
AdminPanel.getLayout = (page) => <AdminPanelLayout>{page}</AdminPanelLayout>
export default AdminPanel;