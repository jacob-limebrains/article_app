import React, {useState} from "react";
import {useCookies} from "react-cookie";

import APIService from "../APIService";

const Form = ({article, insertedInformation}) => {

    const [title, setTitle] = useState(article.title)
    const [description, setDescription] = useState(article.description)
    const [token] = useCookies(['mytoken'])

    const handleUpdateSubmit = () => {
        APIService.UpdateArticle(article.id, {title, description}, token['mytoken'])
            .then(response => console.log(response))
    }

    const handleAddSubmit = () => {
        APIService.AddArticle({title, description}, token['mytoken'])
            .then(() => alert(`Added new post`))
            .then(response => insertedInformation(response))
            .catch(() => alert`Something went wrong`)
            .catch(error => console.log(error))
    }

    return (
        <div className='container border border-light' style={{maxWidth: '58%', borderRadius: 10}}>
            {article ? (
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label' style={{marginTop: 10}}>
                        <h3>{article.id ? article.title : "Add new Article"}</h3>
                    </label>
                    <input type='text' className='form-control' id='title' placeholder='title' value={title}
                           onChange={e => setTitle(e.target.value)}
                    />

                    <label htmlFor='description' className='form-label' style={{marginTop: 10}}><h5>Description:</h5>
                    </label>
                    <textarea className='form-control' id='description' rows='5'
                              onChange={e => setDescription(e.target.value)}>{description}</textarea>
                    {article.id ? <button className='btn btn-warning' style={{margin: '10px 0'}}
                                          onClick={handleUpdateSubmit}>Update Article </button>
                        : <button className='btn btn-success' style={{margin: '10px 0'}} onClick={handleAddSubmit}> Add
                            new Article </button>
                    }

                </div>
            ) : null}
        </div>
    );
}

export default Form;