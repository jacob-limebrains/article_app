import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

import Articles from "./components/Articles";
import Form from "./components/Form";

import './App.css';

const App = ({history}) => {

    const [articles, setArticles] = useState([])
    const [editArticle, setEditArticle] = useState(null)
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [usernameCookie, setUsernameCookie, removeUsernameCookie] = useCookies(['username'])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/articles/', {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Token ${token['mytoken']}`
            }
        }).then(response => response.json())
            .then(response => setArticles(response))
            .catch(error => console.log(error))
    }, [])

    const editBtn = article => {
        setEditArticle(article)
    }

    const handleAddArticle = () => {
        setEditArticle({
            title: '',
            description: ''
        })
    }

    const insertedInformation = () => {
        const new_articles = [
            ...articles,
            articles
        ]
        setArticles(new_articles);
    }

    const handleUserLogOut = () => {
        removeToken(['mytoken']);
        removeUsernameCookie(['username'])
        history.push("/");
    }

    return (
        <div className='App bg-dark text-white'>

            <div className='row container' style={{marginBottom: 20}}>
                <div className='col'>
                    <h2>Article Project Test</h2>
                </div>
                <div className='col'>
                    <button className='btn btn-success' onClick={handleAddArticle}>Add Article</button>
                </div>
                <div className='col'>
                    <button className='btn btn-light' onClick={handleUserLogOut}>Log out</button>
                </div>
                <div className='row'>
                    <h4>Welcome: {usernameCookie['username']}</h4>
                </div>
            </div>

            <Articles articles={articles} editBtn={editBtn} username={usernameCookie}/>
            {editArticle ? <Form article={editArticle} insertedInformation={insertedInformation}
                                 username={usernameCookie}/> : null}
        </div>
    )
}

export default App;