const jwt = require('jsonwebtoken');  

const ensureAuthenticated = (req, res, next) => {  
    const authHeader =req.headers['authorization']; 
    // console.log(authHeader);
    //  res.status(401).
    // json({ message: 'Unauthorized, JWT token wrong or expired' }); 

    if (!authHeader) {  
        return res.status(403)  
            .json({ message: 'Unauthorized, JWT token is require' });  
        
    }  
    try {  
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);  
        req.user = decoded; // (optional)
        next();  
    } catch (err) {  
        return res.status(401)  
            .json({ message: 'Unauthorized, JWT token wrong or expired' });  
    }  
};  

module.exports = ensureAuthenticated;  