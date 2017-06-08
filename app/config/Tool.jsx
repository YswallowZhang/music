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
        // fetch('http://localhost:3838/' + path, {
        //     method: 'POST', 
        //     mode: 'cors', 
        //     credentials: 'include', 
        //     headers: new Headers({
        //         'Origin': 'http://localhost:3838',
        //         'Content-Type': 'text/plain'
        //     })
        // })
        // .then(res => {
        //     console.log(res);
        //     return res
        // })
        // .then(json => {
        //     console.log(json)
        //     let [flag, response] = res(json);
        //     console.log(flag, response)
        //     if (flag) {
        //         resolve(response);
        //     } else {
        //         reject(response);
        //     }
        // })
        // .catch(err => {
        //     console.log(err)
        //     reject(err)
        // })  
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3838/' + path, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 304) {
                let jsonData = xhr.responseText;
                resolve(JSON.parse(jsonData).result)
            }
        }
    })
}


Tool.Search = (keywords, type, offset) => {
    return sendRequest(
      'search/?keywords=' + keywords + '&type=' + type + '&limit=30&offset=' + offset)
}


