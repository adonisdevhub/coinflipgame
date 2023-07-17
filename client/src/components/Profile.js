import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/user";

function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user);
    const profilename = profile?.auth?.name || "";
    const address = profile?.auth?.address || "";
    const [username, setUsername] = useState(profilename);

    const changeName = (e) => {
        setUsername(e.target.value);
    }

    const checkPress = (e) => {
        let name = e.target.value;
        if (e.charCode === 13 ) {
            dispatch(updateUser({name, address}));
        }
    }

    return (
        <div className="metaportal_fn_page_ajax" style={{minHeight: '498px'}}>
            <div className="metaportal_fn_roadmaps">
                { profile.auth?
                    <input value={username} onChange={changeName} onKeyPress={checkPress} /> :
                    <h1>You need to connect</h1>
                }
            </div>
        </div>
    );
}

export default Profile;