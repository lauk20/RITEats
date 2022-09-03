module.exports = {
    name: "messageCreate",
    execute({content}) {
        console.log(content);
        console.log("Message received");
    }
}