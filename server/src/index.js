const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

// import passport middleware
require('./middlewares/passport-middleware');

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// import route
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventoryRoute');
const warehouseRoutes = require('./routes/warehouseRoute');

// initialize route
app.use('/api', authRoutes, inventoryRoutes, warehouseRoutes);

const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error('Error: ${error.message}');
    }
}

appStart();