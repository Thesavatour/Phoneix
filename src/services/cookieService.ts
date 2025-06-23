import Cookies from 'js-cookie';

const CookieService = {
  set(key: string, value: string, days: number = 30): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    Cookies.set(key, value, { expires: expirationDate });
  },

  get(key: string): string | undefined {
    return Cookies.get(key);
  },

  remove(key: string): void {
    Cookies.remove(key);
  },
};

export default CookieService;
