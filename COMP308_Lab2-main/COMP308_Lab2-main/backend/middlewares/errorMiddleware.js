// const errorHandler = (err, req, res, next) => {
//     // Status Code, get by res or dafault: 500 (Internal Server Error)
//     const statusCode = res.statusCode ? res.statusCode : 500;

//     res.statusCode(statusCode)
//     res.json({
//         message: err.message,
//         stack: err.stack,
//     })
// }

// module.exports = {
//     errorHandler,
// }