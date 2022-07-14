import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import Comments from "./Comment";

function NewsComponent(){
    const {id} = useParams()
    const url = `/api/news/${id}`;
    let content = null;
    const [newsArticle, setNewsArticle] = useState({
         loading: false,
         data: null,
         error: false
    });
    useEffect(() => { 
        setNewsArticle({
            loading: true,
            data: null, 
            error: false
        })
        axios.get(url)
            .then(response => {
                setNewsArticle({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setNewsArticle({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url]);

    if (newsArticle.error){
        content = <p>Error Getting News Article :( </p>
    }
    if (newsArticle.loading){
        content = <Spinner animation="border" variant="primary" />
    }
    if (newsArticle.data){
        let news = newsArticle.data.news;
        let comments = newsArticle.data.comments;
        content = 
        <div>
            <h1>{news.title}</h1>
            <h3>by {news.by}</h3>
            <h6>Posted {new Date(news.time).toLocaleDateString("en-US")}</h6>
            {news.text == null ? 
                <p> Read Full Article <a href={news.url}>here</a></p>
                : <p>{news.text}</p>}
            <Comments comments={comments}/>
        </div>
        
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default NewsComponent;