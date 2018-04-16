module.exports = {
    
    env: 'development',
    
    jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
    jwtExpires: 7, //days
    
    db: 'mongodb://db:27017/monoidai', // from node container
    migration: 'mongodb://localhost:27017/monoidai', // from localhost

    nodePort: 8031,
    nodeHost: '0.0.0.0',
    imagePath: '/api/image/',
    
    mail: {
        host: "mailtrap.io",
        port: 2525,
        auth: {
            user: "4cd7f90cddaf27",
            pass: "12ce88c03f43c8"
        }
    },

    fileStorageDest: '',
    vuejsSrc: '/usr/src/app/backend/parser/src',

    systemUserId: '507f1f77bcf86cd899439111',
    adminUserGroupId: '507f1f77bcf86cd899439222',
    
};