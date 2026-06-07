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
  Info,
  Palette,
  Sparkles,
  Zap,
  Brain,
  Maximize2,
  UploadCloud
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
    <div className="flex-grow flex flex-col bg-white text-zinc-900 select-none">
      
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
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span className="text-[10px] font-bold text-zinc-400">File:</span>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="px-2 py-0.5 bg-zinc-50 border border-zinc-200 rounded font-mono font-semibold text-zinc-700 w-24 text-center focus:border-zinc-400 outline-none text-xs transition-all"
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
          <div className="lg:col-span-7 flex flex-col items-center justify-center border border-zinc-200 rounded-xl p-5 bg-white shadow-xs relative min-h-[480px] overflow-hidden">
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
      <section id="features" className="py-16 sm:py-24 border-t border-b border-zinc-200/80 bg-zinc-50/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-12 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Simple and useful tools to share your work
            </h2>
            <p className="text-xs text-zinc-500 mt-2">Everything you need to showcase clean code in seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">5 Premium Background Colors</h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                Choose from 5 solid background colors (slate, zinc, charcoal, navy blue, and warm sand) to make your code stand out. No busy patterns or gradients.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">5 Beautiful Code Styles</h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                Select from 5 classic styles (including Dracula, One Dark, Nord, VS Code, and GitHub Light) to style the text colors in your code instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">Ultra-Sharp High Definition</h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                Your screenshots will always export at double the normal resolution. This keeps your text and borders perfectly clear and sharp on any screen or device.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">Smart Code Recognition</h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                No need to manually choose what language your code is written in. The app automatically recognizes your code type and colors it correctly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">Social Media Sizes</h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                Instantly resize your canvas to match the perfect sizes for Instagram (1:1 square), X and blogs (16:9 landscape), or keep it freeform.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">Drag and Drop Import</h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                Drag any source code file directly from your computer and drop it onto the canvas to load it. Quick and simple with zero copying required.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* 4. Click-to-Load Snippets Gallery */}
      <section id="examples" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-12 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Pre-rendered templates ready to click and customize
            </h2>
            <p className="text-xs text-zinc-500 mt-2">Select a template to instantly load it into the editor canvas above.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXAMPLE_SNIPPETS.map((snippet, idx) => (
              <div 
                key={idx}
                className="bg-zinc-50/50 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5 rounded-2xl p-6 flex flex-col justify-between h-[270px] transition-all duration-300"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md">
                      {snippet.language}
                    </span>
                    <span className="text-[11px] sm:text-xs text-zinc-700 font-bold">{snippet.title}</span>
                  </div>
                  
                  <div className="p-3.5 bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl font-mono text-[10px] leading-relaxed line-clamp-4 overflow-hidden select-all">
                    {snippet.code}
                  </div>
                </div>

                <button
                  onClick={(e) => handleLoadExample(e, snippet)}
                  className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold text-zinc-700 hover:text-zinc-950 bg-white hover:bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 rounded-xl h-9.5 transition-all w-full cursor-pointer shadow-xs"
                >
                  Load Template into Canvas
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Simplified Accordion FAQ */}
      <section id="faq" className="py-16 sm:py-24 border-t border-zinc-200/80 bg-zinc-50/60">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-500 mt-2">Answers to common questions about PixelCode.</p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-zinc-100 last:border-0 pb-4 last:pb-0 pt-4 first:pt-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors">
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
                      openFaqIndex === idx ? "max-h-40 opacity-100 pt-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Footer Integration */}
      <Footer />

    </div>
  );
}
