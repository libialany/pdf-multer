const { Router } = require('express');
const router  = Router();
const path =require('path');
const { unlink } = require('fs-extra');
const { v4 }=require('uuid');
const multer = require('multer');
const pool  = require('../database');
const storage = multer.diskStorage({
    destination: './src/public/imgs',
    filename: function (req, file, cb) {
      cb(null,v4() + path.extname(file.originalname))
    }
});
  
const upload = multer({ storage: storage });


router.get('/download/:id',async (req,res)=>{
    const {id} =req.params;
    const archivo=(await pool.query('SELECT * FROM archivos WHERE id= ?',[id]))[0];
    var result=req.app.get('public')+'/'+archivo.path;
    res.download(result,archivo.title+path.extname(archivo.originalname));
});

router.get('/',async(req,res)=>{
    const archivos=await pool.query('SELECT * FROM archivos');
    console.log(req.user);
    res.render('listar',{archivos});
});

router.get('/listar',async(req,res)=>{
    const archivos=await pool.query('SELECT * FROM archivos');
    res.json(archivos);
});

router.get('/upload',(req,res)=>{
    res.render('upload');
});


router.get('/test',(req,res)=>{
    res.render('test');
})
router.get('/delete/:id',async (req,res)=>{
    const {id} =req.params;
    const archivo=await pool.query('SELECT * FROM archivos WHERE id= ?',[id]);
    var result=req.app.get('public')+'/'+archivo[0].path;
    unlink(result);
    await pool.query('DELETE FROM archivos WHERE id= ?',[id]);
    res.redirect('/');
});


router.post('/upload', upload.single('archivo'),async  (req, res, next) =>{
    const {title, description } = req.body;
    const { filename , originalname, mimetype, size }= req.file;
    const storedpath='/imgs/'+ req.file.filename; 
    const newFile = {
        title,
        description,
        filename,
        'path':storedpath,
        originalname,
        mimetype,
        size
    };
    console.log(newFile);
    await pool.query('INSERT INTO archivos set ?',[newFile]);
    res.redirect('/')
});
router.get('/image/:id',(req,res)=>{});
router.get('/image/:id/delete',(req,res)=>{

});

module.exports = router;