import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import Card from "./Card";
import he from "he";


function UserComponent(){
    const {id} = useParams()
    const url = `/api/users/${id}`;
    let content = null;
    const [user, setUser] = useState({
         loading: false,
         data: null,
         error: false
    });
    useEffect(() => { 
        setUser({
            loading: true,
            data: null, 
            error: false
        })
        axios.get(url)
            .then(response => {
                setUser({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setUser({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url]);

    if (user.error){
        content = <h3>Error Getting User Info:( </h3>
    }
    if (user.loading){
        content = <Spinner animation="border" variant="primary" />
    }
    if (user.data){
        let userData = user.data.user;
        let stories = user.data.stories;
        content = 
        <div>
            <div style={{textAlign: "left", margin: "1rem"}}>
                <h3>user: {userData.hn_id}</h3>
                <p>about: {he.decode(userData.about).replace(/(<([^>]+)>)/gi, "")}</p>
                <p>{userData.karma} karmas</p>
                <p>Active since {new Date(userData.created * 1000).toLocaleDateString("en-US")}</p>
            </div>
            <div>
                <h3>Available Stories</h3>
                {stories.map((news, key) =>
                    <div key = {news._id}>
                        <Card news={news} />
                    </div>
                )}
            </div>
        </div>
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default UserComponent;