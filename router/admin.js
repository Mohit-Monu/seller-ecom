const express=require('express')
const bodyParser=require('body-parser')

const db=require('../utils/database')

const app=express()
const router=express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/get/',(req,res)=>{
    db.execute('SELECT * FROM datas')
    .then((results)=>{
        res.send(results[0])
        return res.redirect('/')
        // next()

    }).catch((err)=>{
        console.log(err);
    })
})
router.post('/add/',(req,res,next)=>{

    const price=req.body.price;
    const name=req.body.name;
    db.execute('INSERT INTO datas(price,name)VALUES(?,?)',[
        price,
        name
    ]).then(()=>{
        return res.redirect('/get/')
        // next()
    }).catch((err)=>{
        console.log(err);
    })
})
router.get('/delete/:id',(req,res,next)=>{
    const id= req.params.id;
    db.execute('DELETE FROM datas WHERE id= (?)',[id])
    .then((result)=>{
        return res.redirect('/get/')
    })
    .catch(err=>console.log(err))
})

module.exports=router;
