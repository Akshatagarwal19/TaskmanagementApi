class Task {
    constructor (id,user_id,title,description,due_date,status){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.status = status;
    }
}

export default Task;