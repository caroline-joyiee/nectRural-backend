import { notificationModel } from "../models/notification-model.js";
import { User_Model } from "../models/users-model.js";
import { notificationSchema } from "../schema/notifition-schema.js";


export const createNotification = async (req, res) => {

    try {
        const { error, value } = notificationSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }

        const userId = req.session?.user?.id || req?.user?.id 
        console.log("Extracted User ID:", userId);

        if (!userId) {
            return res.status(400).send("User ID is missing from the request.");
        }

        const user = await User_Model.findById(userId);
        console.log("User found:", user);

        if (!user) {
            return res.status(404).send("User not found");
        }

        const notification = await notificationModel.create({ ...value, user:userId })

        await notification.save()

        res.status(200).send(notification)

    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });

        
    }
}