export const BACKGROUNDS = [
  { id: "charcoal", name: "Charcoal", hex: "#1c1917" },
  { id: "zinc", name: "Deep Zinc", hex: "#09090b" },
  { id: "slate", name: "Slate Grey", hex: "#334155" },
  { id: "sand", name: "Warm Sand", hex: "#e7e5e4" },
  { id: "pure-white", name: "Pure White", hex: "#ffffff" },
];

export const THEMES = [
  { id: "one-dark", name: "One Dark (VS Code style)", isDark: true },
  { id: "dracula", name: "Dracula (Classic Dark)", isDark: true },
  { id: "github-light", name: "GitHub Light (Clean Light)", isDark: false },
];

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript / TypeScript", extension: "js", prismId: "javascript" },
  { id: "python", name: "Python", extension: "py", prismId: "python" },
  { id: "plaintext", name: "Plain Text", extension: "txt", prismId: "plaintext" },
];

export const RATIOS = [
  { id: "free", name: "Freeform (Auto Fit)", ratio: "free" },
  { id: "1-1", name: "1:1 Square (Instagram / LinkedIn)", ratio: "1/1", width: 800, height: 800 },
  { id: "16-9", name: "16:9 Landscape (X / YT / Blog)", ratio: "16/9", width: 1200, height: 675 },
];

export const EXAMPLE_SNIPPETS = [
  {
    title: "JavaScript / TypeScript",
    language: "javascript",
    code: `// A clean TypeScript example
interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

function verifyUser(user: User): boolean {
  if (user.isAdmin) {
    console.log(\`Admin logged in: \${user.name}\`);
    return true;
  }
  return false;
}`,
    bg: "#1c1917",
    theme: "one-dark"
  },
  {
    title: "Python Scripting",
    language: "python",
    code: `# A sleek Python example
import math

def calculate_hypotenuse(a: float, b: float) -> float:
    """Calculate the longest side of a right triangle."""
    squared_sum = (a ** 2) + (b ** 2)
    return math.sqrt(squared_sum)

print(calculate_hypotenuse(3.0, 4.0)) # Returns 5.0`,
    bg: "#e7e5e4",
    theme: "github-light"
  }
];

export const FAQS = [
  {
    question: "What is PixelCode?",
    answer: "PixelCode is an ultra-minimalist, premium tool designed for developers to convert code snippets into beautiful, high-resolution screenshots. Perfect for sharing on social platforms or in blog posts."
  },
  {
    question: "Is my code secure?",
    answer: "Yes, 100%. PixelCode runs entirely locally inside your browser. No code or images are ever uploaded to our servers, keeping your proprietary code safe."
  },
  {
    question: "How do I export my image?",
    answer: "You can click 'Download PNG' to save a razor-sharp Retina quality image, export as vector 'SVG', or click 'Copy to Clipboard' to instantly paste your styled code into any external app."
  }
];
