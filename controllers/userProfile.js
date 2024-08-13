import { User_Model } from "../models/users-model.js";
import { userProfile } from "../models/userProfile-model.js";
import { userProfileSchema } from "../schema/userProfileSchema.js";


export const postProfile = async (req, res, next) => {
      try {
        const { error, value } = userProfileSchema.validate({ 
            ...req.body,
            image: req?.file?.filename,
            // profileImage: req?.file?.filename,
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req?.user.id;
        const user = await User_Model.findById(userId);
        console.log("user", user)

        if (!user) {
            return res.status(404).send("User not found")
        }

        const profile = await userProfile.create({ ...value, user: userId });
        console.log("profile", profile);

        user.userProfile = profile._id;

        await user.save();

        res.status(201).json({ Profile: profile})
      } catch (error) {
        next(error)
      }
}

export const updateUserProfile = async (req, res) => {
    console.log(req.body)
    try {
        const updateFields = { ...req.body };

        if (req.file?.image) {

            updateFields.image = req.file.filename;

        } else if (req.file?.image) {
            updateFields.image = req.file.image[0].image;
        }

        // if (req,file?.profileImage) {
        //     updateFields.profileImage = req.file.filename;

        // } else if (req.file?.profileImage) {
        //     updateFields.profileImage = req.file.profileImage[0].filename;
        // }

        const { error, value } = userProfileSchema.validate(updateFields);

        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userId = req.session?.user?.id || req?.user.id;

        const user = await User_Model.findById(userId);
        if (!user) {
            return res.status(404).send("Profile not found");
        }

        const profile = await userProfile.findByIdAndUpdate(req.params.id, value, { new: true});
        if (!profile){
            return res.status(404).send("Profile not found");
        }

        res.status(201).json({ profile })

    } catch (error) {

        console.log(error);
        
    }
};

export const getAllProfile = async (req, res) => {
    console.log(req.body)

        try {
            const userId = res.session?.user?.id || req?.user.id;

            const profile = await userProfile.findOne({ user: userId })
                .populate({
                    path: 'user',
                    select:'-password'
                });
                if (!profile) {
                    return res.status(200).json({ profile });
                }

                res.status(200).json({ profile });

        } catch (error) {

            return res.status(500).json({ error }) 
            
        }


};

export const deleteProfile = async (req, res) => {
    try {
        
        const deleteFields = { ...req.body };

        if (res.file?.image){
            deleteFields.image = req.file.filename;

        } else if (req.file?.image){
            deleteFields.image = req.file.image[0].filename;
        }

        const { error, value } = userProfileSchema.validate(deleteFields);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req?.user.id;

        const user = await User_Model.findById(userId);

        if (!user) {
            return res.status(404).send("Profile not found ");
        }

        const profile =await userProfile.findByIdAndDelete(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(200).send("Profile Deleted");
        }

        res.status(201).json({ profile });

    } catch (error) {
        console.log(error)
        
    }
}