export default {
    getAllTasks,
    getAllGroups,
    createTasks
}


// get all tasks
export async function getAllTasks(user_id) {

    const params = {
        user_id: user_id
    }
    const query = new URLSearchParams(params)
    const res = await fetch(`https://koppepan-todo-app-server.herokuapp.com/api/v1/cards/get/all?${query}` );
    const data = await res.json()
    
    return data.results
}

export async function getAllGroups(user_id) {
    const params = {
        user_id: user_id
    }
    const query = new URLSearchParams(params)
    const res = await fetch(`https://koppepan-todo-app-server.herokuapp.com/api/v1/groups/get/all?${query}` );
    const data = await res.json();
    console.log(data.results)
    return data.results
}

// create task 
export async function createTasks(task){
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify(
        {
            id: task.id,
            user_id: task.user_id,
            group_id: task.group_id,
            title: task.title,
            description: task.description
        }
    )
    const res = await fetch('https://koppepan-todo-app-server.herokuapp.com/api/v1/cards/create', {method, headers, body});
    const data = await res.json();
    console.log(data.results)
    return data.results
}

export async function updateTasks(task){
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify(
        {
            id: task.id,
            user_id: task.user_id,
            group_id: task.group_id,
            title: task.title,
            description: task.description
        }
    )
    const res = await fetch('https://koppepan-todo-app-server.herokuapp.com/api/todos/update', {method, headers, body});
    const data = await res.json();
    console.log(data.results)
    return data.results
}