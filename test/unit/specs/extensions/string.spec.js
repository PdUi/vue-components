import { isNullOrWhiteSpace } from '@/extensions/string';

describe('string extensions', () => {
  describe('isNullOrWhiteSpace', () => {
    it('should return true with null', () => {
      expect(isNullOrWhiteSpace(null)).toBeTruthy();
    });

    it('should return true with undefined', () => {
      expect(isNullOrWhiteSpace(undefined)).toBeTruthy();
    });

    it('should return true with empty string', () => {
      expect(isNullOrWhiteSpace('')).toBeTruthy();
    });

    it('should return true with space', () => {
      expect(isNullOrWhiteSpace(' ')).toBeTruthy();
    });

    it('should return true with tab', () => {
      expect(isNullOrWhiteSpace('\t')).toBeTruthy();
    });

    it('should return true with newline', () => {
      expect(isNullOrWhiteSpace('\n')).toBeTruthy();
    });

    it('should return true with carriage return', () => {
      expect(isNullOrWhiteSpace('\r')).toBeTruthy();
    });

    it('should return false with non-empty string', () => {
      expect(isNullOrWhiteSpace('a')).toBeFalsy();
    });
  });
});
