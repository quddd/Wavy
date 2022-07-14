import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import {Col, Container, Spinner} from 'react-bootstrap';


function TopNews(){
    const url = "/api";
    let content = null;
    const [newsList, setNewsList] = useState({
         loading: false,
         data: null,
         error: false
    });

    useEffect(() => { 
        setNewsList({
            loading: true,
            data: null, 
            error: false
        })
        axios.get(url)
            .then(response => {
                setNewsList({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setNewsList({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url]);

    if (newsList.error){
        content = <h3>Error getting fetching top news :(</h3>
    }

    if (newsList.loading){
        content = <Spinner animation="border" variant="primary" />
    }
    if (newsList.data) {
        content = 
        newsList.data.map((news, key) => 
            <div key={news._id}>
                <Card news={news} />
            </div>
        )
    }
    return (
        <div>
            <h1>Top Stories</h1>
            <div  className="card-container">
                 {content}
            </div>
        </div>
    );
}

export default TopNews;