import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generate12ByteId(byteLength: any) {
  // Check for crypto support.
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Crypto support not found. Unable to generate secure ID.');
  }

  // Generate random bytes based on the specified byteLength.
  const randomBytes = new Uint8Array(byteLength);
  crypto.getRandomValues(randomBytes);

  // Convert the random bytes to a hexadecimal string.
  const hexString = Array.from(randomBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');

  // Return the hexadecimal string as the ID.
  return hexString;
}

// Convert currency to USD later to change to different currency
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
