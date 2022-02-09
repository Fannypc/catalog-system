const auth = (roles = []) => {
    try {
        return (req, res, next) => {
                if (!req.user || !req.user.Role) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                if (roles.length && !roles.includes(req.user.Role.name)) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                next();
            }
    } catch (error) {
        console.log(error);
        res.status(401).send({error:'Unauthorized.'});
    }
}

module.exports = auth;