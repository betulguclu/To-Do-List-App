const   express = require('express'),
        router = express.Router(),
        Task = require('../modals/task');

//TASKS list router
router.get('/',(req,res)=>{
    Task.find()
    .then((tasksDB)=>{
        res.json(tasksDB);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
});


//Add new task for database
router.post('/', (req,res)=>{
    console.log(req.body);
    Task.create(req.body)
    .then((newTask)=>{
        res.status(201).json(newTask);
    })
    .catch((err)=>{
        console.log("========== ERROR =============");
        console.log(err);
        res.send(err);
    })
});

//Show Route
router.get('/:taskID',(req,res)=>{
    Task.findById(req.params.taskID)
    .then((bulunanTask)=>{
        res.json(bulunanTask);
    })
    .catch((err)=>{
        console.log("========== ERROR =============");
        console.log(err);
        res.send(err);
    })
});

//Update Route
router.put('/:taskID', (req,res)=>{
    Task.findByIdAndUpdate({_id:req.params.taskID}, req.body, {new:true})
    .then((updateTask)=>{
        res.json(updateTask);
    })
    .catch((err)=>{
        console.log("========== ERROR =============");
        console.log(err);
        res.send(err);
    })
});

//Delete Route
router.delete('/:taskID', (req,res)=>{
    Task.remove({_id:req.params.taskID})
    .then(()=>{
        res.json({mesaj:'Success Deleted'});
    })
    .catch((err)=>{
        console.log("========== ERROR =============");
        console.log(err);
        res.send(err);
    })
});


module.exports = router;