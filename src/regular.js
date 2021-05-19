

const URL = "https://jsonplaceholder.typicode.com/posts/1";
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const USERNAME = 'tes';
const PASSWORD = 'pw1';
const queryParams = {
    title: 'foo',
    body: 'bar',
    userId: 2
};
// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));


//authorization: Basic dGVzOnB3MQ==
//authorization: Basic dGVzOnB3MQ==
export const callAxios = () => {
    const axios = require('axios');
    const getData = async url => {
        try {
            const response = await axios.post(url, {}, {
                params: queryParams,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                auth: {
                    username: USERNAME,
                    password: PASSWORD
                }
            });
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    getData(POST_URL);

}

export const callHTTPS = () => {
    const https = require('https');
    // const URLSearchParams = require('URLSearchParams');
    // console.log('callHTTPS', https);
    const searchParams = new URLSearchParams(queryParams);
    console.log(searchParams.toString())

    const postData = JSON.stringify(queryParams);

    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts?' + searchParams.toString(),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        auth: USERNAME + ":" + PASSWORD
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        let responseData = '';

        res.on('data', d => {
            responseData += d;
        })
        res.on('end', () => {
            console.log(responseData);
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write('')
    req.end()
}

