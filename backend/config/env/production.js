module.exports = {

    env: 'production',

    jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
    jwtExpires: 7, //days

    db: 'mongodb://localhost:27017/monoidai',
    migration: 'mongodb://localhost:27017/monoidai',

    nodePort: 8033,
    nodeHost: 'localhost',
    imagePath: 'https://adm.deko.support/api/image/',

    mail: {
        host: "mailtrap.io",
        port: 2525,
        auth: {
            user: "xxx",
            pass: "xxx"
        }
    },

    fileStorageDest: '/public/assets',
    vuejsSrc: '/usr/home/vhosts/deko_com/web/src/views',

    systemUserId: '507f1f77bcf86cd899439111',
    adminUserGroupId: '507f1f77bcf86cd899439222',


};