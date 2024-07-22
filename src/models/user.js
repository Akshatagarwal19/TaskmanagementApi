import bcrypt from "bcrypt";
class User {
    constructor(id ,username ,email ,password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    async setpassword(password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(password, salt);
    }

    async verifypassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

export default User;