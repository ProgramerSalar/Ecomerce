import mongoose from "mongoose";
export const db = async () => {
    try {
        const connectDB = mongoose.connect('mongodb+srv://udamy_user:vfVjiniUHSosqrV2@cluster0.8r3vhxn.mongodb.net/?retryWrites=true&w=majority', {
            dbName: "Ecomerce-db"
        }).then(() => console.log('database is connected.....'));
    }
    catch (err) {
        console.log(err);
    }
};
