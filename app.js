const express = require('express');
const path = require('path');
// importation de multer
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Configuration de stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // chemin de stockage des images
        cb(null, './public/data/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

// Enregistrement du fichier
const upload = multer({storage: storage});

const persons = [
    {
        name: 'Kientega',
        image: 'data/uploads/image1.png'
    },
    {
        name: 'Ouegraogo',
        image: '/data/uploads/image2.png'
    }
];

// definition du moteur de vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

    res.render('index', {persons});
});

app.post('/', upload.single('file'), (req, res) => {

    // recuperation des donnees du formulaire
    const newPerson = {
        name: req.body.name,
        image: '/data/uploads/' + req.file.filename,
    };

    persons.push(newPerson);
    res.render('index', {persons});
    
});

app.listen(port, () => {

    console.log(`App listenning port ${port}`);
});