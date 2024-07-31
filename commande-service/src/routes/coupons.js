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

// Supprimer un coupon
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const coupon = await Coupons.findByPk(id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon non trouvé' });
        }

        await coupon.destroy();

        res.status(200).json({ message: 'Coupon supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du coupon', error });
    }
});

// Ajouter un nouveau coupon
router.post('/add', async (req, res) => {
    const { code, discount_percentage, valid_from, valid_until, is_active } = req.body;

    try {
        const coupon = await Coupons.create({
            code,
            discount_percentage,
            valid_from,
            valid_until,
            is_active,
        });

        res.status(201).json({ message: 'Coupon ajouté avec succès', coupon });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du coupon', error });
    }
});

export default router;
