import React from 'react';
import useAuth from '@/app/hooks/useAuth';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/store/auth';
import { removeLoginToken } from '@/app/helpers/auth';
import { useRouter } from 'next/router';

const UserInfo = () => {
    const user = useAppSelector(selectUser);
    const router = useRouter();
    const logoutHandler = async () => {
        await removeLoginToken();
        await router.push('/');
    }

    // const { user } = useAuth();
    return (
        <div>
            <span>Username:</span>
            <h1>{user?.name}</h1>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default UserInfo;