const api = "https://rocky-tundra-53295.herokuapp.com";

let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8);

const headers = {
    Authorization: token
};

//get categories from server
export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data);

//get all posts for one category
export const getPostsForCategory = category =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => data);

//get all post
export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data);

//get one post
export const getPost = id =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())
        .then(data => data);

//update post
export const updatePost = (id, post) =>
    fetch(`${api}/posts/${id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json());

//get all comments
export const getComments = id =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(data => data);

//add new post
export const addPost = post =>
    fetch(`${api}/posts`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json());

//delete post
export const deletePost = id =>
    fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers
    })
        .then(res => res.json())
        .catch(data => data);

//update vote post
export const updateVotePost = (id, vote) =>
    fetch(`${api}/posts/${id}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: vote })
    })
        .then(res => res.json())
        .then(data => data);

//get one comment
export const getComment = id =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())
        .then(data => data);

//add comment
export const addComment = comment =>
    fetch(`${api}/comments`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .then(data => data);

//edit comment
export const updateComment = (id, comment) =>
    fetch(`${api}/comments/${id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    }).then(res => res.json());

//delete comment
export const deleteComment = id =>
    fetch(`${api}/comments/${id}`, {
        method: "DELETE",
        headers
    })
        .then(res => res.json())
        .then(data => data);

//update vote comment
export const updateVoteComment = (id, vote) =>
    fetch(`${api}/comments/${id}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: vote })
    })
        .then(res => res.json())
        .then(data => data);