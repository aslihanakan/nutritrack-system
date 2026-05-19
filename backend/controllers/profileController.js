const {
    getProfileByUser,
    saveProfile
} = require("../services/profileService");

async function getProfile(req, res) {
    try {
        const profile = await getProfileByUser(req.user.id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function updateProfile(req, res) {
    try {
        const profile = await saveProfile(req.user.id, req.body);

        res.status(200).json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getProfile,
    updateProfile
};