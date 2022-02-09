const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export async function login(request, response) {
    const {errors, isValid} = validate(request.body);


    if (isValid){
        const {email, password} = request.body;
        let user = await User.findOne({where: {email}});
    
        if(!user){
            response.status(401).json({errors: {message: "Wrong credentials"}});
        }

        // compare passwords
        const correct = await bcrypt.compare(password, user.password);
        if (!correct){
            response.status(401).json({errors: {message: "Wrong credentials"}});
        }else{
            const token = await authToken(user);
            response.json({message: "You have successfully logged in", user, token});
        }
    }else{
        response.status(400).json({errors});
    }
}

export async function logout(req, res) {
    try {
        if (req.user) {
            console.log('si llegue a re user')
            await User.update({
                token: null
            }, { where: {id: req.user.id} });
        }
        delete req.user;
        delete req.token;
        res.json({message: "You have successfully logged out"});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function register(request, response) {
    let {firstName, lastName, email, password, roleId} = request.body;
    const passwordEncrypted = bcrypt.hashSync(password, 10);

    try{
        const user = await User.create(
            {
                firstName,
                lastName,
                email,
                password: passwordEncrypted,
                roleId
            }   
        );
        const token = await authToken(user);
        response.json({message:'User created', user, token});
    }catch(error){
        console.log(error);
        response.status(400).json({errors: {message:'Error trying to create user'}});
    }
}


async function authToken(user) {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email, 
            firstName: user.firstName,
            lastName: user.lastName
        }, 
            'secret', 
        {
            expiresIn:'10m'
        }
    );
    user.token = token;
    await user.save();
    return token;
}

function validate(data){
    let errors={};
        if (data.email === '') errors.email = "Informar campo"
        if (data.password === '') errors.password = "Informar campo"
        const isValid = Object.keys(errors).length === 0
        return {errors, isValid};
}