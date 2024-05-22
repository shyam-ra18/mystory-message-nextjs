import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function DbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI! || '');
        connection.isConnected = db.connections[0].readyState
        console.log("DB Connected")
    } catch (error) {
        console.log("Database Connection Failed!!!", error)
        process.exit(1);
    }
}

export default DbConnect;