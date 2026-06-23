import { getRequiredRole } from '@/lib/core/session';
import React from 'react';

const OwnerLayout = async({children}) => {
    await getRequiredRole("owner")
    return (
        <div>
            {children}
        </div>
    );
};

export default OwnerLayout;