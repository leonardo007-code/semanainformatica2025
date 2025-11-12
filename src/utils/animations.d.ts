// TypeScript declaration for animations.js
// This allows importing animation functions without type errors

declare module '../utils/animations' {
  export function enterStagger(target: any, delay?: number): void;
  export function pulseAccent(target: any): void;
  export function fadeInUp(target: any, duration?: number): void;
}
