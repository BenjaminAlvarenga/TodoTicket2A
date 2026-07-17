import dotenv from "dotenv"
dotenv.config()

export const config = {
    db:{uri: process.env.DB_URI},
    server:{port: process.env.PORT},
    jwt:{secret: process.env.JWT_SECRET_KEY},
    user:{email:process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD},
    wompi:{grant_type: process.env.GRANT_TYPE,
        audience: process.env.AUDIENCE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }
}