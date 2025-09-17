import {
    Switch,
    Route,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const PrivateRoute = (props) => {
    const { user } = useContext(UserContext)

    let history = useHistory()
    useEffect(() => {
        console.log("check context user: ", user)
        let session = sessionStorage.getItem('account')
        if (!session) {
            history.push('/login');
            window.location.reload();
        }

        if (session) {
            //check role
        }
    }, [])

    return (
        <>
            <Route path={props.path} component={props.component} />

        </>
    )
}

export default PrivateRoute