const express = require('express');
const app = express();
const projectRoutes = require('./routes/projectRoutes'); // Correct import
const progressRoutes = require('./routes/progressRoutes'); // Correct import
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/projectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));


app.use(cors()); // Allow requests from different origins


app.use(express.json()); // Middleware to parse JSON

// Use the routes
app.use('/api/projects', projectRoutes); // Correct usage
app.use('/api/progress', progressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
