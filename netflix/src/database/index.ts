import mongoose from 'mongoose';

// const url = process.env.MONGODB_URI
const url = "mongodb+srv://solomononyango925:ZbeRu7CTTW1nVFm3@mernblog.j0l4m.mongodb.net/?retryWrites=true&w=majority&appName=mernblog"

const connectDB = async () => {
    await mongoose.connect(url)
        .then(() => console.log("Database connnected successfully"))
        .catch(() => console.log("Database connection failed something went wrong"))

}

export default connectDB;
