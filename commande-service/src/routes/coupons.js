// routes/coupons.js
import express from 'express';
import { Coupons } from '../models/index.js';

const router = express.Router();

// Vérifier et appliquer un coupon
router.post('/apply', async (req, res) => {
    const { code, totalAmount } = req.body;

    try {
        const coupon = await Coupons.findOne({
            where: { code, is_active: true },
        });

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon invalide ou expiré' });
        }

        const currentDate = new Date();
        if (coupon.valid_from && coupon.valid_from > currentDate || coupon.valid_until && coupon.valid_until < currentDate) {
            return res.status(400).json({ message: 'Coupon non valide pour cette période' });
        }

        const discount = (totalAmount * coupon.discount_percentage) / 100;
        const discountedTotal = totalAmount - discount;

        res.json({ discountedTotal, discount });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'application du coupon', error });
    }
});

export default router;
