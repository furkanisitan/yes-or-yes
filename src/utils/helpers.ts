import { v4 as uuidv4 } from 'uuid';

export class ResponsiveHelper {
  static getScale(): number {
    const width = window.innerWidth;
    if (width < 500) return 0.7;
    if (width < 900) return 0.85;
    if (width < 1200) return 0.95;
    return 1;
  }
}

export class UserHelper {
  static getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
    return userId;
  }
}
