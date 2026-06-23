import { getRequiredRole } from '@/lib/core/session';
import React from 'react';

const TenantLayout = async({children}) => {
    await getRequiredRole("tenant")
    return (
        <div>
            {children}
        </div>
    );
};

export default TenantLayout;