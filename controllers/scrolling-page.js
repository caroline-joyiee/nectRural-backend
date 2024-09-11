import { scrollingPage_Model } from "../models/scrolling-page.js";
import { User_Model } from "../models/users-model.js";
import { scrollingPageSchema } from "../schema/scrolling-pageSchema.js";


export const postIssues = async (req, res) => {
    try {
        const { error, value } = scrollingPageSchema.validate({
            ...req.body,
            image: req?.file?.filename // Check here for typos in `filename`
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req?.user?.id ||
        console.log("Extracted User ID:", userId);

        if (!userId) {
            return res.status(400).send("User ID is missing from the request.");
        }

        const user = await User_Model.findById(userId);
        console.log("User found:", user);

        if (!user) {
            return res.status(404).send("User not found");
        }

        const issues = await scrollingPage_Model.create({ ...value, user: userId });
        console.log("Created issue:", issues);

        user.issues = issues._id;
        await user.save(); // Remember to save the user after modifying

        res.status(201).json({ Issues: issues });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getIssues = async (req, res) => {
    try {
        const userId = req.session?.user?.id || req?.user.id;

        const issues = await scrollingPage_Model.find({ user: userId });

        if (issues.length == 0) {
            return res.status(200).json({ issue: issues });
        }

        res.status(200).json({ issue: issues});
    } catch (error) {
        res.status(400).json({ error: "error information"})
    }
}

export const getAllIssues = async (req, res) => {

    const title =req.query.title?.toLowerCase();
    const filter = {};
    if (title){
        filter.title = title;
    }

    const issue = await scrollingPage_Model.find(filter);
    return res.status(200).json({ issue });
}


export const updateIssues = async(req, res) => {
    console.log(req.body)
    try {
        const updateField = {...req.body}
        if (req.file?.image) {
            updateField.image = req.file.filename;

        }else if (req.file?.image) {
            updateField.image = req.file.image[0].image;
        }

        const {error, value} = scrollingPageSchema.validate(updateField)

        if (error) {
            return res.status(400).send(error.details[0].message);

        }

        const userId = req.session?.user?.id || req?.user.id;
        
        const user = await User_Model.findById(userId);
        if (!user) {
            return res.status(404).send("User not found")
        }

        const issue = await scrollingPage_Model.findByIdAndUpdate(req.params.id, value, { new: true});
        // console.log(issue)

        if (!issue) {
            return res.status(404).send("Issue not found");
        }

        res.status(201).json({ issue })
    } catch (error) {
        console.log(error);
    }
}

export const deleteIssue = async (req, res) => {
try {
    
    const deleteField = {...req.body};

    if (req.file?.image) {
        deleteField.image = req.file.filename;
    } else if (req.file?.image) {
        deleteField.image = req.file.image[0].filename;

    }

    const { error, value } = scrollingPageSchema.validate(deleteField);
    if(error){
        return res.status(400).send(error.details[0].message);

    }

    const userId = req.session?.user?.id || req?.user.id;
    const user = await User_Model.findById(userId);

    if (!user){
        return res.status(404).send("Issue not found")

    }

    const issue = await scrollingPage_Model.findByIdAndDelete(req.params.id, value, { new: true });
    if (!issue) {
        return res.status(200).send("Issue Deleted");
    }

    res.status(201).json({ issue })
} catch (error) {
    console.log(error);
}

}