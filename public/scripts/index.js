$(document).ready(function () {
    var tasks = $.getJSON("/api/tasks");

    tasks
    .then(addTasks);

    $('#taskInput').keypress(function (e) { 
        if (e.which == 13) {
            addNewTask();
        }
    })

    $('.tasks').on('click','.far' ,function () {
        //alert('test');
        var clicked=$(this).parent().parent();
        //console.log(clicked);

        deletedURL = '/api/tasks/'+ clicked.data('id');
        $.ajax({
            method : "DELETE",
            url:deletedURL
        })
        .then((deletedData)=>{
            console.log(deletedData);
            clicked.remove();
        });
    });

    $('.tasks').on('click','li' ,function () {
        //alert('test')
        //console.log($(this).data('isDoneStatus'));
        isDoneUpdate($(this));
    });

});

function addTasks(tasks){
    tasks.forEach(function (task) {  
        addTask(task);
    })
}

function addTask(task) {
    
    var newTask = $('<li class ="ourtasks">'+task.name+'<span><i class="far fa-trash-alt"></i></span> </li>');

    //deleted with id
    newTask.data('id',task._id);

    //update isDone
    newTask.data('isDoneStatus',task.isDone);

    if (task.isDone ==true) {
        $(newTask).addClass("isDone");
    }

    $('.tasks').append(newTask);
}

function addNewTask() {
    var newTask = $('#taskInput').val();
    //console.log(newTask);

    $.post('/api/tasks',{name: newTask})
    .then((addedNewTask)=>{
        addTask(addedNewTask);
        $('#taskInput').val('');
    });
}
function isDoneUpdate(task) {  
    var updateURL = '/api/tasks/'+task.data('id');
    var isDoneStatus = task.data('isDoneStatus');

    var updated = {isDone: !isDoneStatus};
    //console.log(updated);

    $.ajax({

        method:"PUT",
        url:updateURL,
        data:updated
    })
    .then((updatedTask)=>{
        console.log(updatedTask);
        task.toggleClass('isDone');
        task.data('isDoneStatus', !isDoneStatus);
    });
}