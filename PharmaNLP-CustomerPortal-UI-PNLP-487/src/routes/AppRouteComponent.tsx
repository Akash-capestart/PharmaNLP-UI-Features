import React from 'react'
import { NotLoggedInRoutes } from './NotLoggedInRoutes';
import { HasLoggedInRoutes } from './HasLoggedInRoutes';

type AppRoutesProps = {
    hasAuth: boolean
}

export function AppRouteComponent({ hasAuth }: AppRoutesProps) {
    return (
        <>
            {hasAuth ?
                <HasLoggedInRoutes /> : <NotLoggedInRoutes />
            }
        </>
    )
}
