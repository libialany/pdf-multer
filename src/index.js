const express = require('express');
const path =require('path');
const morgan =require('morgan');

const app = express();
app.set('public',path.join(__dirname,'public'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use(
  express.static("public", {
    setHeaders: (res, filepath) =>
      res.set(
        "Content-Disposition",
        `attachment; filename="pdf-express-${path.basename(filepath)}"`
      )
  })
);



// routes
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname,'public')))

app.listen(3000, () => {
  console.log('server listening at port 3000');
});
