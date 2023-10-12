const {User} = require("../../db")

const checkGoogle = async(req, res) => {
    const { email } = req.body;

    const check = await User.findOne({where: {email}})

    if(check){  
        const exists = true;
        res.json({ exists})
    } else {
        const exists = false;
        res.json({exists})
    }
}

module.exports =  checkGoogle 

