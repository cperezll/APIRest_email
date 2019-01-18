module.exports = {
    port: process.env.PORT || 3100,
    db: process.env.MONGODB || "mongodb://localhost:27017/node-basic",
    SECRET_TOKEN: "mySecretTokenKeyForDevPurposes"
}
