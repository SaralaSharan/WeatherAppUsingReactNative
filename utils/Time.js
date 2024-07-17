export function nowToHHMM() {
  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0"); // Ensures two-digit formatting
  return `${hours}:${minutes}`;
}
