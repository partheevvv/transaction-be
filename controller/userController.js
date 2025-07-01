const User = require("../models/User");

exports.getTheme = async(req, res, next) => {
    try {
        
        const user = await User.findById(req.user.id)
        .select("themePreference");

        res.json({
            theme: user.themePreference
        })
        
    } catch(e) {
        next(e);
    }
}

exports.setTheme = async(req, res, next) => {
    const { theme } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                themePreference: theme
            },
            {
                new: true
            }
        ).select("themePreference");
        res.json({
            theme: user.themePreference
        })
    } catch(e) {
        next(e);
    }
}