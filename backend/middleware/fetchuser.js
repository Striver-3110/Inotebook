const jwt = require('jsonwebtoken');
const JWT_SECRETE_KEY = "PRAJAPATIJAYCODINGCOURSE";


const fetchUser = (req,res,next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No Token Provided' })
    }
    try {
         const data = jwt.verify(token, JWT_SECRETE_KEY);
         // console.log(data);
        req.user = data.user;
        
         next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error:"Access denied! Please authenticate using valid token"})
    }
   
}

module.exports = fetchUser;