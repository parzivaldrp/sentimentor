import mongoose from 'mongoose';


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOURI) 
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });

    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}

export default connectDB;