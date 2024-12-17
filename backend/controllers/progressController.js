// Controller to get progress
exports.getProgress = async (req, res) => {
    const { projectId } = req.params;
    
    try {
        const progress = await Progress.findOne({ projectId });
        if (!progress) {
            return res.status(404).json({ message: "Progress not found" });
        }
        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: "Error fetching progress data" });
    }
};

// Controller to update progress
exports.updateProgress = async (req, res) => {
    const { projectId } = req.params;
    const { progressPercentage } = req.body;  // Accepts percentage value

    try {
        let progress = await Progress.findOne({ projectId });
        if (!progress) {
            // If no progress record exists for the project, create one
            progress = new Progress({
                projectId,
                progressPercentage,
            });
        } else {
            // Update existing progress
            progress.progressPercentage = progressPercentage;
        }

        await progress.save();  // Save the progress

        res.json({ message: "Progress updated successfully", data: progress });
    } catch (err) {
        res.status(500).json({ message: "Error updating progress" });
    }
};
