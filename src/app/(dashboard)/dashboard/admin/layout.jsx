import { getRequiredRole, getUserSession } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async({children}) => {
    // const user = await getUserSession();
    // console.log(user);
    await getRequiredRole("admin")
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;