'use strict';
export const Tool = {};
//fetch()方法返回的Promise对象并不会在HTTP状态码为404或者500的时候自动抛出异常，而需要用户进行手动处理
//默认情况下，fetch并不会发送任何的本地的cookie到服务端，注意，如果服务端依靠Session进行用户控制的话要默认开启Cookie
//如果需要设置fetch自动地发送本地的Cookie，需要将credentials设置为same-origin:
//可以将credentials的值设置为include来在CORS情况下发送请求。
const sendRequest = (path, res, rej) => {
    return new Promise((resolve, reject) => {
        if(rej) {
            reject(rej);
        }
        fetch('http://localhost:3838/' + path, {
            method: 'POST', 
            mode: 'no-cors', 
            credentials: 'include', 
            headers: new Headers({
                'Origin': 'http://localhost:3838',
                'Content-Type': 'text/plain'

            })
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            let [flag, response] = res(json);
            if (flag) {
                resolve(response);
            } else {
                reject(response);
            }
        })
        .catch(err => {
            reject(err)
        })    
    })
}


Tool.Search = (keywords) => {
    return sendRequest(
      'search/?keywords=' + keywords + '&type=1&limit=5&offset=0',
      json => { return [true, json.result] })
}


