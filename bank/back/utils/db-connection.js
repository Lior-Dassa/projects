import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

try {
    await mongoose.connect(MONGO_URI, {serverApi:{version:"1",strict: true, deprecationErrors: true}});
} catch (error) {
    console.log(error.message);
    process.exit(0);
}

process.on('SIGINT', () => {
    mongoose.connection.close();
    process.exit(0);
});