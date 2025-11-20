const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


const connectMongo = require('./config/db_mongo');
const createPgPool = require('./config/db_postgres'); 


const authRoutes = require('./routes/auth.routes');
const booksRoutes = require('./routes/books.routes');
const aiRoutes = require('./routes/ai.routes'); 


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); 

async function startServer() {
    try {
        await connectMongo();
        
        createPgPool(); 

        app.use('/api/auth', authRoutes);
        app.use('/api/books', booksRoutes);

        app.get('/', (req, res) => {
            res.send('API Folium (Libris) está online!');
        });
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('Falha ao iniciar o servidor:', err);
        process.exit(1);
    }
}

startServer();