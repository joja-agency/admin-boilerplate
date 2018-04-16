module.exports = {

    env: 'testing',

    jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
    jwtExpires: 7, //days

    db: 'mongodb://db:27017/monoidai', // from node container
    migration: 'mongodb://localhost:27017/monoidai', // from localhost

    nodePort: 8032,
    nodeHost: 'localhost',
    imagePath: 'https://adm-testing.deko.support/api/image/',

    mail: {
        host: "mailtrap.io",
        port: 2525,
        auth: {
            user: "xxx",
            pass: "xxx"
        }
    },

    fileStorageDest: 'web/testing/current/',
    vuejsSrc: '/usr/home/vhosts/deko_com/web/src/views',

    systemUserId: '507f1f77bcf86cd899439111',
    adminUserGroupId: '507f1f77bcf86cd899439222',

};