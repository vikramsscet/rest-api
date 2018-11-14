
function setResponse(statusCode, body,header){
    return {
        statusCode,
        header,
        body: JSON.stringify(body)
    }
}

module.exports = {
    setResponse
};