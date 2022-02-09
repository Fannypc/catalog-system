const auth = (roles = []) => {
    return (req, res, next) => {
        try {
            // console.log(req.user.Role.name);
            // console.log(roles);
            if (!req.user || !req.user.Role) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (roles.length && !roles.includes(req.user.Role.name)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        } catch (err) {
            console.log(err);
            res.status(401).send({error:'Unauthorized.'});
        }
    }
}

module.exports = auth;