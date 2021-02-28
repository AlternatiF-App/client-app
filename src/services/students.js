const fetchAuth = {
    method:"GET",
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("access token"),
        "Content-Type":"application/json, application/x-www-form-urlencoded"
    }
}

export async function getAllIDStudents(url, option) {
    return new Promise((resolve, reject) =>{
        fetch(url, fetchAuth)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
    })
}

export async function getAllClusters(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
    }) 
}

export async function updateAllClusters(url, option) {
    return new Promise((resolve, reject) => {
        fetch(url, option)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
    }) 
}