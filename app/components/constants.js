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
  { id: "vscode-dark", name: "VS Code Dark+", isDark: true },
  { id: "nord", name: "Nord (Arctic Ice)", isDark: true },
  { id: "github-light", name: "GitHub Light (Clean Light)", isDark: false },
];

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript / TypeScript", extension: "js", prismId: "javascript" },
  { id: "python", name: "Python", extension: "py", prismId: "python" },
  { id: "rust", name: "Rust", extension: "rs", prismId: "rust" },
  { id: "java", name: "Java", extension: "java", prismId: "java" },
  { id: "c", name: "C", extension: "c", prismId: "c" },
  { id: "cpp", name: "C++", extension: "cpp", prismId: "cpp" },
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
  },
  {
    title: "Rust Systems Code",
    language: "rust",
    code: `// Rust custom enum matching pattern
#[derive(Debug)]
enum TaskState {
    Pending,
    Running(u32),
    Finished,
}

fn inspect_task(state: TaskState) {
    match state {
        TaskState::Pending => println!("Task is queued"),
        TaskState::Running(progress) => {
            println!("Progress: {}%", progress);
        }
        TaskState::Finished => println!("Task complete!"),
    }
}`,
    bg: "#334155",
    theme: "nord"
  },
  {
    title: "Java OOP Class",
    language: "java",
    code: `// Elegant Java Singleton Pattern
public class DatabaseConnector {
    private static DatabaseConnector instance;
    private String connectionUrl;

    private DatabaseConnector() {
        this.connectionUrl = "jdbc:postgresql://localhost:5432/main";
    }

    public static synchronized DatabaseConnector getInstance() {
        if (instance == null) {
            instance = new DatabaseConnector();
        }
        return instance;
    }
}`,
    bg: "#09090b",
    theme: "dracula"
  },
  {
    title: "C Language Struct",
    language: "c",
    code: `// Classic C struct and pointer usage
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char* name;
} User;

void print_user(User* u) {
    if (u != NULL) {
        printf("User [%d]: %s\\n", u->id, u->name);
    }
}`,
    bg: "#334155",
    theme: "nord"
  },
  {
    title: "C++ Modern Vector",
    language: "cpp",
    code: `// C++ modern range loop and sorting
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "Sorted: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    return 0;
}`,
    bg: "#1c1917",
    theme: "vscode-dark"
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
  },
  {
    question: "Does PixelCode support high-resolution displays?",
    answer: "Absolutely. Images are exported at standard 2x Retina resolution. This guarantees your code text, borders, and margins look razor-sharp on Retina screens and when printed."
  },
  {
    question: "Can I use the screenshots in commercial portfolios or blogs?",
    answer: "Yes! All screenshots generated through PixelCode are completely royalty-free and owned exclusively by you. No attribution is required."
  },
  {
    question: "How does drag-and-drop file support work?",
    answer: "Simply drag any source code file from your local explorer (e.g. app.js, script.py) and drop it directly onto the right-side canvas. PixelCode will instantly load the code content and auto-configure the correct language."
  }
];
