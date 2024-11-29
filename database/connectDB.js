const mongoose=require ('mongoose')
const connectDB=async () =>{
    try{
    const conn = await mongoose.connect('mongodb://localhost:27017/usersetup',{})
    console.log(`MongoDB connected :${conn.connection.host}`)
    }catch(error){
        console.log(error)
        Process.exit(1)
    }

}
module.exports=connectDB