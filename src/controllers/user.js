const { User } = require('../../models');

export async function create(req, res) {
    const users = await User.findAll();
    res.send(users);
}

export async function all(req, res) {
    const users = await User.findAll();
    res.send(users);
}

export async function info(req, res) {
    const user = await User.findOne({where: {id: req.params.id}});
    user ? res.send(user) : res.sendStatus(404);
}

export async function update(req, res) {
    const users = await User.findAll();
    res.send(users);
}

export async function destroy(req, res) {
    const users = await User.findAll();
    res.send(users);
}