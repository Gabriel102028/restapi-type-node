export default{
    jwtSecret: process.env.JWT_SCRET || 'SecretTocken',
    DB:{
        URI: process.env.MONGODB_URI || 'mongodb://localhost/jwtapi',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}