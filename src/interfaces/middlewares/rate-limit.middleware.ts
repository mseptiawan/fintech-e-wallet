import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // max 5 request per IP
  message: {
    status: 'fail',
    message: 'Terlalu banyak request, coba lagi nanti',
  },
});
