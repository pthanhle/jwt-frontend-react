import {
    Switch,
    Route,
} from "react-router-dom";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoute from "./PrivateRoutes";

const AppRoute = (props) => {



    return (
        <>
            <Switch>
                <PrivateRoute path='/users' component={Users} />
                <PrivateRoute path='/project' component={Users} />

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    404 NOT FOUND
                </Route>
            </Switch>
        </>
    )
}

export default AppRoute