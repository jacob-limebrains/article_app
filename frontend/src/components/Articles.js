import React from "react";
import {useCookies} from "react-cookie";

import APIService from "../APIService";

const Article = ({id, title, description, editBtn, article, deleteArticle}) => {

    return (
        <div className='container' style={{minWidth: '20%', maxWidth: '60%', minHeight: "20%"}}>
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">The id of article: {id}</div>
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-text">{description}</p>
                </div>
                <div className='row' style={{marginBottom: '1%'}}>
                    <div className='col-md-1' style={{marginLeft: '1%'}}>
                        <button className='btn btn-warning' onClick={() => editBtn(article)}>Update</button>
                    </div>
                    <div className='col-md-1' style={{marginLeft: '4%'}}>
                        <button className='btn btn-danger' onClick={() => deleteArticle(article)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Articles = ({articles, editBtn}) => {

    const [token] = useCookies(['mytoken'])

    const handleToDeleteArticle = (article) => {
        APIService.DeleteArticle(article.id, token['mytoken'])
            .then(response => console.log(response))
    }
    return (
        <div>
            {articles.map(article => <Article key={article.id} id={article.id} title={article.title}
                                              description={article.description} editBtn={editBtn} article={article}
                                              deleteArticle={handleToDeleteArticle} />)}
        </div>
    )
}

export default Articles