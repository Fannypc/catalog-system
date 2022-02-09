const jwt  = require('jsonwebtoken');
const { User, Role } = require('../models');

const auth = async (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.replace('Bearer', '').trim();
        const decoded  = jwt.verify(token, process.env.JWT_SECRET);
        const user  = await User.findOne({where: {id: decoded.id, token}, include: Role });

        if(!user){
            res.status(401).send({error:'Unauthorized.'});
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({error:'Unauthorized.'});
    }
}

module.exports = auth