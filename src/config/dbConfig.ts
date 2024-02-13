import mongoose from 'mongoose';

export const connecDb = async () => {
    try {
        if (!process.env.CONNECTION_STRING) {
            throw new Error('CONNECTION_STRING environment variable is not set');
        }

        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected: ", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
