module.exports = {  
    target: 'node',
    resolve: {
        fallback: {
          "http": false,
          "https": false,
        }
    }
};