
import jwt from 'jsonwebtoken';

export const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Le token expirera dans 30 jours
  });
};


export default generateToken; 