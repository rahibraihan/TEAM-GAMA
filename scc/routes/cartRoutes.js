const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const cartItem = req.body;
        res.status(200).json({ 
            success: true, 
            message: 'Item added to tray successfully!', 
            data: cartItem 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;