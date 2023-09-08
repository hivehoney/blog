const url = "http://localhost:8080/";
export const addPostAPI = (data) => {
    return fetch(url + '/api/notice/registerPost', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            throw error;
        });
};
