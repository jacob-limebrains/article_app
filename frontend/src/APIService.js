import React from "react";

export default class APIService {
    static UpdateArticle(article_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .catch(error => alert(error))
    }

    static AddArticle(body, token) {
        return fetch(`http://127.0.0.1:8000/api/articles/`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .catch(error => console.log(error))
    }

    static DeleteArticle(article_id, token) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Token ${token}`
            }
        }).then(response => response.json())
            .catch(error => console.log(error))
    }

    static LoginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .catch(error => console.log(error))
    }

    static RegisterUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .catch(error => console.log(error))
    }
}