import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'jawadmughaldev',
    api_key: '273434779457487',
    api_secret: 'Gu3a2tA5-1SiWA9IGP40NNprMWU'
});


const uploadCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null;
        // console.log("cloudinary into try catch ")
        const responseFile = await cloudinary.uploader.upload(localFilePath,
            { public_id: "auto" })
        // console.log("responseFile  : ", responseFile)
        return responseFile
    } catch (error) {
        console.log("error into upload cloudinary ", error)
    }
}

export { uploadCloudinary }