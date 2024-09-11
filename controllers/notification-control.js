import { notificationModel } from "../models/notification-model.js";
import { User_Model } from "../models/users-model.js";
import { notificationSchema } from "../schema/notifition-schema.js";


export const createNotification = async (req, res) => {

    // try {
    //     const { error, value } = notificationSchema.validate(req.body)
    //     if(error){
    //         return res.status(400).send(error.details[0].message)
    //     }

    //     const userId = req.session?.user?.id || req?.user?.id 
    //     console.log("Extracted User ID:", userId);

    //     if (!userId) {
    //         return res.status(400).send("User ID is missing from the request.");
    //     }

    //     const user = await User_Model.findById(userId);
    //     console.log("User found:", user);

    //     if (!user) {
    //         return res.status(404).send("User not found");
    //     }

    //     const notification = await notificationModel.create({ ...value, user:userId })

    //     await notification.save()

    //     res.status(200).send(notification)

    // } catch (error) {
    //     res.status(500).json({ error: 'Failed to create notification' });


    // }

    try {
        const notification = notificationModel(req.body)
        await notification.save()

        res.status(201).json(notification)


    } catch (error) {

        res.status(500).json({ error: "invaild" })

    }
}

export const getNotifications = async (req, res) => {

    try {

        const { userId } = req.query;
        const notifications = await notificationModel.find({ userId }).sort({ createdAt: -1 }).limit(10);

        res.status(200).json(notifications)


    } catch (error) {
        res.status(500).json({error: "invalid info"})
    }

}


export const deleteNotification = async (req, res) => {
    try {
        const {id} = req.params;
        const notification = await notificationModel.findByIdAndDelete(id);

        if(notification){
            return res.status(201).json({ message: 'Notification deleted successfully' });

        }

        if (!notification){
            return res.status(404).json({ error: "Notification not deleted"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
};