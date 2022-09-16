import { RouteProps as ReactDOMRouteProps, Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface RouteProps extends ReactDOMRouteProps{
    isPrivate?: boolean;
    component: React.ComponentType;
}

export function Route({isPrivate = false, component: Component, ...rest}:RouteProps){
    const {user} = useAuth();

    return(
        <ReactDOMRoute 
            {...rest}
            render={({location}) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                    <Redirect 
                        to={{
                            pathname: isPrivate ? '/login' : '/computers',
                            state: {from: location,}
                        }}
                    />
                )
            }}        
        />
    )
}