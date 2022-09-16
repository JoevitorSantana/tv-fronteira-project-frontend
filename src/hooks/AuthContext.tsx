import {ReactNode, useState, useCallback, createContext, useContext} from 'react'
import api from '../service/api';

interface User{
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    lastName: string;
    city: string;
    phone: string;
}

interface AuthProviderProps{
    children: ReactNode;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;    
    updateUser(user: User):void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({children}:AuthProviderProps){
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@BestPC:token');
        const user = localStorage.getItem('@BestPC:user');

        if(token && user){
            api.defaults.headers.authorization = `Bearer ${token}`;

            return {token, user:JSON.parse(user)};
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }:SignInCredentials) => {
        const response = await api.post('/auth/sessions', {
            email, password
        });

        const {token, user} = response.data;

        localStorage.setItem('@BestPC:token', token);
        localStorage.setItem('@BestPC:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({token, user});
    },[]);

    const signOut = useCallback(() => {
        localStorage.removeItem('@BestPC:token');
        localStorage.removeItem('@BestPC:user');

        setData({} as AuthState);
    }, []);

    const updateUser = useCallback((user: User) => {
        localStorage.setItem('@BestPC:user', JSON.stringify(user));

        setData({
            token: data.token,
            user,
        });
    }, [setData, data.token]);

    return(
        <AuthContext.Provider value={{user: data.user, signIn, signOut, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth():AuthContextData{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an authProvider');
    }

    return context;
}