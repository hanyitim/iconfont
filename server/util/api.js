let Axios = require('axios'),
    qs = require('qs');


/**
 * request 工厂
 * @param {*} requireOption   axios config
 * @return function(data) 
 */
function requireFactory(requireOption){
    return (data) =>{
        // console.log(opt,requireOption);
        switch(requireOption.method){
        case 'get':
            requireOption.params = data;
            break;
        case 'post':
            requireOption.data = qs.stringify(data);
            break;
        default:
            requireOption.params = data;
            break;
        }
        // console.log(requireOption);
        return Axios({
            ...requireOption,
        });
    };
}

const apiOauthToken = requireFactory({
    url:'http://gitlab.lizhi.fm/oauth/token',
    method:'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

const apiGetUser = requireFactory({
    url:'http://gitlab.lizhi.fm/api/v4/user',
    method:'get',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

const apiGitCommit = requireFactory({
    url:'http://gitlab.lizhi.fm/api/v4/projects/1058/repository/commits',
    method:'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

module.exports = {
    apiOauthToken,
    apiGetUser,
    apiGitCommit
}
