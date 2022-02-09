const { User } = require('../../models');


export async function all(req, res) {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function info(req, res) {
    try {
        const user = await User.findOne({where: {id: req.params.id}});
        user ? res.send(user) : res.sendStatus(404);
    } catch (err) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function update(req, res) {
    try{
        let userId = req.params.id;
        let {firstName, lastName} = req.body;
        const user = await User.update({
            firstName,
            lastName,
            updated_at: new Date()
        }, { returning: true, plain: true, where: {id: userId} });

        res.json(user);
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
}

export async function destroy(req, res) {
    try{
        let userId = req.params.id;
        let user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (user){
            await User.destroy({
                where: {
                    id: userId
                } 
            });
            res.json({message: "User has been deleted", user});
        }else{
            res.status(400).json({message: "Failed to delete user"});
        }
    }catch (error){
        res.sendStatus(400);
    }
}