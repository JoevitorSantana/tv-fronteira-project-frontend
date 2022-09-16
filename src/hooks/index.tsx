import {ReactNode} from 'react';
import { AuthProvider } from "./AuthContext";

interface Type{
    children: ReactNode;
}

export const AppProvider = ({children}:Type) => (
    <AuthProvider>        
        {children}
    </AuthProvider>
)