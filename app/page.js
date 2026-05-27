"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { toPng, toSvg, toBlob } from "html-to-image";
import { 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  FileCode, 
  ChevronDown,
  ArrowRight,
  Monitor,
  Code2,
  Layers,
  Info
} from "lucide-react";

import EditorCanvas from "./components/EditorCanvas";
import Footer from "./components/Footer";
import {
  BACKGROUNDS,
  THEMES,
  LANGUAGES,
  RATIOS,
  EXAMPLE_SNIPPETS,
  FAQS
} from "./components/constants";

export default function HomePage() {
  const canvasRef = useRef(null);

  // --- Code & Editor States ---
  const [code, setCode] = useState(`// Paste your code here to generate screenshots!
function calculateSquare(num) {
  const result = num * num;
  console.log("The square is:", result);
  return result;
}

// Solid colors, no gradients.
calculateSquare(5);`);
  
  const [language, setLanguage] = useState("javascript");
  const [fileName, setFileName] = useState("script.js");

  // --- Simplified Style States ---
  const [bgHex, setBgHex] = useState("#fafaf9"); // Default to clean Warm Sand
  const [themeId, setThemeId] = useState("github-light"); // Default to clean Light Theme
  const [ratioId, setRatioId] = useState("free");
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // --- Export States ---
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // --- FAQ State ---
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- Export Actions ---
  const handleExportPng = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 80));

      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2, // Hardcoded standard 2x Retina quality for crisp image
        cacheBust: true,
      });

      const link = document.createElement("a");
      const name = fileName.split(".")[0] || "code";
      link.download = `pixelcode-${name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("PNG export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSvg = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 80));

      const dataUrl = await toSvg(canvasRef.current, {
        cacheBust: true,
      });

      const link = document.createElement("a");
      const name = fileName.split(".")[0] || "code";
      link.download = `pixelcode-${name}.svg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("SVG export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return;
    setIsCopying(true);
    setCopySuccess(false);
    try {
      await new Promise(r => setTimeout(r, 80));

      const blob = await toBlob(canvasRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error("Clipboard copy error:", err);
      alert("Copy failed. Try downloading PNG instead!");
    } finally {
      setIsCopying(false);
    }
  };

  // Keyboard Shortcuts (Ctrl+S -> PNG, Ctrl+Shift+C -> Clipboard)
  useEffect(() => {
    const handleShortcuts = (e) => {
      if (
        document.activeElement.tagName === "INPUT" || 
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleExportPng();
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        handleCopyToClipboard();
      }
    };

    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, [code, fileName, bgHex, themeId, ratioId, showLineNumbers]);

  const handleLoadExample = (e, example) => {
    e.preventDefault();
    setCode(example.code);
    setLanguage(example.language);
    setFileName(`example.${example.language === "javascript" ? "js" : "py"}`);
    setBgHex(example.bg);
    setThemeId(example.theme);
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="flex-grow flex flex-col bg-zinc-50 text-zinc-900 select-none">
      
      {/* 1. Page Header */}
      <section className="pt-10 pb-6 px-6 sm:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 max-w-xl mx-auto mb-2 leading-tight">
          Turn Your Code Into Shareable Snippets
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          Create elegant, simple screenshots for blogs, social channels, and portfolios instantly. Zero gradients, solid premium backdrops only.
        </p>
      </section>

      {/* 2. Simplified side-by-side workspace */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full pb-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input and Controls */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-xl p-5 shadow-xs flex flex-col gap-5 select-text">
            
            {/* Input Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <FileCode className="h-3.5 w-3.5 text-zinc-900" />
                Code Snippet
              </h2>
              <div className="flex items-center gap-1 font-mono text-xs text-zinc-500">
                <span>File:</span>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="bg-transparent border-none outline-none font-semibold text-zinc-700 w-24 text-right"
                  placeholder="untitled.js"
                />
              </div>
            </div>

            {/* Input textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your source code here..."
              rows={8}
              className="w-full p-3 font-mono text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:border-zinc-400 outline-none text-zinc-800 resize-y"
              spellCheck="false"
            />

            <hr className="border-zinc-100" />

            {/* Curated Background solid colors */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span>Background Color</span>
                <span className="text-[9px] text-zinc-400 font-normal">Solid Colors Only</span>
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setBgHex(bg.hex)}
                      style={{ backgroundColor: bg.hex }}
                      className={`h-6.5 w-6.5 rounded-full border transition-all ${
                        bgHex.toLowerCase() === bg.hex.toLowerCase() 
                          ? "border-zinc-900 scale-110 shadow-xs ring-1 ring-zinc-300" 
                          : "border-zinc-200 hover:scale-105"
                      }`}
                      title={bg.name}
                    />
                  ))}
                </div>
                
                {/* Custom Color Selector */}
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 ml-auto border-l border-zinc-100 pl-3">
                  <span>Custom:</span>
                  <input
                    type="text"
                    value={bgHex}
                    onChange={(e) => setBgHex(e.target.value)}
                    className="h-6.5 px-1.5 bg-zinc-50 border border-zinc-200 rounded text-[11px] font-mono text-zinc-700 w-16 focus:border-zinc-400 outline-none"
                  />
                  <input
                    type="color"
                    value={bgHex.startsWith("#") && bgHex.length === 7 ? bgHex : "#fafaf9"}
                    onChange={(e) => setBgHex(e.target.value)}
                    className="h-6.5 w-6.5 bg-transparent border border-zinc-200 rounded cursor-pointer p-0 shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Customization controls */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Theme option */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  Code Theme
                </label>
                <select
                  value={themeId}
                  onChange={(e) => setThemeId(e.target.value)}
                  className="h-8 px-2 bg-zinc-50 border border-zinc-200 rounded-md text-[11px] font-semibold text-zinc-700 outline-none focus:border-zinc-400"
                >
                  {THEMES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language option */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  Language Highlight
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-8 px-2 bg-zinc-50 border border-zinc-200 rounded-md text-[11px] font-semibold text-zinc-700 outline-none focus:border-zinc-400"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Aspect Ratio option */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  Aspect Ratio
                </label>
                <select
                  value={ratioId}
                  onChange={(e) => setRatioId(e.target.value)}
                  className="h-8 px-2 bg-zinc-50 border border-zinc-200 rounded-md text-[11px] font-semibold text-zinc-700 outline-none focus:border-zinc-400"
                >
                  {RATIOS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Line numbers option toggle */}
              <div className="flex flex-col justify-end pb-1 gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500">
                  <span>Line Numbers</span>
                  <button
                    onClick={() => setShowLineNumbers(!showLineNumbers)}
                    className={`h-5 w-9 rounded-full p-0.5 transition-all ${
                      showLineNumbers ? "bg-zinc-900" : "bg-zinc-200"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full transition-all ${
                        showLineNumbers ? "bg-white translate-x-4" : "bg-zinc-400 translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>

            <hr className="border-zinc-100" />

            {/* Exporter triggers */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCopyToClipboard}
                disabled={isCopying}
                className="h-9 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white transition-colors flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer"
              >
                {isCopying ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-zinc-300" />
                ) : copySuccess ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {isCopying ? "Generating..." : copySuccess ? "Copied!" : "Copy to Clipboard"}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExportPng}
                  disabled={isExporting}
                  className="h-9 rounded-md bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer"
                >
                  {isExporting ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Download className="h-3.5 w-3.5" />
                  )}
                  Download PNG
                </button>

                <button
                  onClick={handleExportSvg}
                  disabled={isExporting}
                  className="h-9 rounded-md bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer"
                >
                  {isExporting ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Download className="h-3.5 w-3.5" />
                  )}
                  Download SVG
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Translucent Centered Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center border border-zinc-200 rounded-xl p-5 bg-zinc-100/50 shadow-xs relative min-h-[480px] overflow-hidden">
            <div className="w-full flex items-center justify-center select-none">
              <EditorCanvas
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                bgHex={bgHex}
                themeId={themeId}
                ratioId={ratioId}
                showLineNumbers={showLineNumbers}
                fileName={fileName}
                setFileName={setFileName}
                canvasRef={canvasRef}
              />
            </div>

            <div className="flex items-center gap-1 text-[9px] text-zinc-400 absolute bottom-3 mt-3">
              <Info className="h-3 w-3" />
              <span>100% Client-Side. Exports render locally at crisp 2x Retina.</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-12 sm:py-16 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-10">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Core Features
            </span>
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              A premium, ultra-minimal code sharing utility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5">
            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-lg flex flex-col gap-2.5">
              <div className="p-1.5 bg-white border border-zinc-200 rounded-md w-fit">
                <Monitor className="h-4 w-4 text-zinc-900" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900">5 Curated Solids</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Curated set of 5 flat backgrounds (Charcoal, Sand, Zinc, Navy, Slate) to ensure high-contrast minimalist screenshot posts.
              </p>
            </div>

            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-lg flex flex-col gap-2.5">
              <div className="p-1.5 bg-white border border-zinc-200 rounded-md w-fit">
                <Code2 className="h-4 w-4 text-zinc-900" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900">3 Core Syntax Themes</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Pruned styling themes down to 3 absolute industry classics: One Dark, Dracula, and clean GitHub Light syntax highlighting.
              </p>
            </div>

            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-lg flex flex-col gap-2.5">
              <div className="p-1.5 bg-white border border-zinc-200 rounded-md w-fit">
                <Layers className="h-4 w-4 text-zinc-900" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900">Retina HD Render</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Automatically renders at crisp 2x Retina resolution for razor-sharp borders and text layers on all social platform feeds.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Click-to-Load Snippets Gallery */}
      <section id="examples" className="py-12 sm:py-16 border-t border-zinc-200 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-10">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Example Snippets
            </span>
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Pre-rendered templates ready to click and customize
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXAMPLE_SNIPPETS.map((snippet, idx) => (
              <div 
                key={idx}
                className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-lg p-5 flex flex-col justify-between h-[250px] transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded">
                      {snippet.language}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-semibold">{snippet.title}</span>
                  </div>
                  
                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded font-mono text-[10px] leading-relaxed text-zinc-400 line-clamp-4 overflow-hidden select-none select-all">
                    {snippet.code}
                  </div>
                </div>

                <button
                  onClick={(e) => handleLoadExample(e, snippet)}
                  className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded h-8 transition-colors w-full cursor-pointer"
                >
                  Load Example Into Canvas
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Simplified Accordion FAQ */}
      <section id="faq" className="py-12 sm:py-16 border-t border-zinc-200 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          
          <div className="text-center mb-10">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Support
            </span>
            <h2 className="text-2xl font-extrabold text-zinc-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col border-t border-zinc-200">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-zinc-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4.5 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <span className="text-[11px] sm:text-xs font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4.5 w-4.5 text-zinc-400 group-hover:text-zinc-600 transition-transform duration-200 ${
                      openFaqIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    openFaqIndex === idx ? "max-h-40 opacity-100 pb-4.5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Footer Integration */}
      <Footer />

    </div>
  );
}
