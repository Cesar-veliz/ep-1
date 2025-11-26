// Setup file for Jasmine tests
import '@testing-library/jest-dom';

// Mock localStorage
global.localStorage = {
  getItem: jasmine.createSpy('getItem'),
  setItem: jasmine.createSpy('setItem'),
  removeItem: jasmine.createSpy('removeItem'),
  clear: jasmine.createSpy('clear')
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jasmine.createSpy('matchMedia').and.returnValue({
    matches: false,
    addListener: jasmine.createSpy('addListener'),
    removeListener: jasmine.createSpy('removeListener')
  })
});

// Suppress console errors in tests
beforeEach(() => {
  spyOn(console, 'error');
  spyOn(console, 'warn');
});
