const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://yes-or-yes.netlify.app';

export class AuthHelper {
  static isAuthorized(event: any): boolean {
    const token = event.headers['authorization'] || event.headers['Authorization'];
    return token === `Bearer ${process.env.SECRET_KEY}`;
  }

  static isAllowedOrigin(event: any): boolean {
    if (this.isAuthorized(event)) return true;

    const origin = event.headers['origin'] || event.headers['Origin'] || '';
    const referer = event.headers['referer'] || event.headers['Referer'] || '';
    const userAgent = event.headers['user-agent'] || event.headers['User-Agent'] || '';

    const isValidOrigin = origin.startsWith(ALLOWED_ORIGIN);
    const isValidReferer = referer.startsWith(ALLOWED_ORIGIN);
    const isBrowser = /Mozilla|Chrome|Safari|Firefox|Edg|Opera|OPR|Trident|MSIE/i.test(userAgent);

    return (isValidOrigin || isValidReferer) && isBrowser;
  }

  static corsHeaders() {
    return {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      Vary: 'Origin',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    };
  }
}
