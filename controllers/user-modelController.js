import { User_Model } from "../models/users-model.js";
import { userSchema } from "../schema/users-modelSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signUp = async (req, res, next) => {
    try {
        //error handling and validation
        const { error, value } = userSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].
                message);
        }
        //finding out if the user exists in the database
        const { email } = value

        const ifUserExists = await User_Model.findOne({ email })

        if (ifUserExists) {
            return res.status(401).send("User already exists")

        } else {
            const hashPassword = bcrypt.hashSync(value.password, 0);
            value.password = hashPassword

            const newUser = await User_Model.create(value);

            return res.status(200).send(newUser)
        }

    } catch (error) {

        next(error)

    }
}


export const logIn = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const user = await User_Model.findOne({
            $or: [{ email: email }, { userName: userName }],
        });
        if (!user) {
            return res.status(401).json("User does not exist");

        } else {

            const correctPass = await bcrypt.compare(password, user.password);
            if (!correctPass) {
                return res.status(401).json("Invalid Credentails");
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '5hr' })

            //Return Response
            res.status(201).json({
                message: "Login Sucessfully",
                accessToken: token,
                user: {
                    firstName:user.firstName,
                    userName: user.userName,
                    lastName: user.lastName
        }})
        }

    } catch (error) {
        next(error);
    }

}

export const getUser = async (req, res, next) => {
    try {
        const userName = req.params.userName.toLowerCase();

        const options ={ sort: { startDate: -1 } }

        const findSignUp = await User_Model.findOne({ userName }).select("-password")
        .populate({
            path: "userProfile",
            options,
        })
        
        .populate("userProfile")
        .populate("scrolling-page")
        
        ;

        return res.status(200).json({ user: findSignUp })

    } catch (error) {
        next()
    }

}

// export const getUser = async (req, res) => {
//     console.log(req.body)

//         try {
//             const userId = req.session?.user?.id || req?.user.id;

//             // if(!userId){
//             //     return res.status(400).json({ error: "User ID not found in session or request." });
//             // }

//             const user = await User_Model.findOne({ user: userId })
//                 .populate({
//                     path: 'user',
//                     select:'-password'
//                 });
              
//                 if (!user) {
//                     return res.status(400).json({ error: "profile not found", userId: userId });
//                 }

//                 res.status(200).json({ user: user  });

                

//         } catch (error) {

//             console.error(error);
//             return res.status(500).json({ error: "Server error" }); 
            
//         }


// };

export const getAllUsers = async (req, res) => {

    // const email = req.query.email?.toLowerCase();
    const userName = req.query.userName?.toLowerCase();

    const filter = {};


    if (userName){
        filter.userName = userName;
    }

    const users = await User_Model.find(filter);

    return res.status(200).json({ users });
    
};

export const getAllemail = async (req, res) => {

    const email = req.query.email?.toLowerCase();
    // const userName = req.query.userName?.toLowerCase();

    const filter = {};

    if (email) {
        filter.email = email;
    }

    
    const users = await User_Model.find(filter);

    return res.status(200).json({ users });
    
};

// export const logout = async (req, res, next) => {
//     try {
        
//         await req.session.destroy();

//         res.status(200).json({ message: "User Logged Out" });
//     } catch (error) {
//         next(error);
//     }
// }

export const logout = async (req, res, next) => {
    try {
        if (!req.session) {
            console.error('Session is undefined');
            return res.status(400).json({ message: "No active session found." });
        }

        await req.session.destroy();
        res.status(200).json({ message: "User Logged Out" });
    } catch (error) {
        next(error);
    }
}
