import { HttpInterceptorFn } from '@angular/common/http';

//Перехватывает все HTTP-запросы, отправляемые из приложения, добавляет к ним JWT-токен
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }
  return next(req);
};
