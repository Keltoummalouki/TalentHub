import { generateToken, verifyToken } from '../utils/jwt';

describe('JWT Utils', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
    process.env.JWT_EXPIRES_IN = '7d';
  });

  const payload = { userId: '123', username: 'testuser', role: 'admin' };

  test('should generate valid token', () => {
    const token = generateToken(payload);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('should verify valid token', () => {
    const token = generateToken(payload);
    const decoded = verifyToken(token);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.username).toBe(payload.username);
    expect(decoded.role).toBe(payload.role);
  });

  test('should throw error for invalid token', () => {
    expect(() => verifyToken('invalid-token')).toThrow();
  });
});
