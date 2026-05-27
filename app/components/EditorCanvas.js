"use client";

import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";

// Import core and 3 languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";

import { LANGUAGES } from "./constants";

export default function EditorCanvas({
  code,
  setCode,
  language,
  setLanguage,
  bgHex,
  themeId,
  ratioId,
  showLineNumbers,
  fileName,
  setFileName,
  canvasRef,
}) {
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Sync scrolling between textarea overlay and highlight pre block
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Trigger Prism highlighting on content update
  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current.querySelector("code"));
    }
  }, [code, language]);

  // Adjust preview scaling responsively to fit the width of its parent block
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const canvasWidth = containerRef.current.clientWidth || 700;

      if (parentWidth < canvasWidth) {
        setScale(parentWidth / canvasWidth - 0.05);
      } else {
        setScale(1);
      }
    };

    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [ratioId]);

  // Handle Tab key insertion
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      setCode(newValue);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Drag & Drop
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const text = event.target.result;
        setCode(text);
        setFileName(file.name);
        
        const ext = file.name.split(".").pop().toLowerCase();
        const detected = LANGUAGES.find(l => l.extension === ext);
        if (detected) {
          setLanguage(detected.id);
        }
      };
      
      reader.readAsText(file);
    }
  };

  const getAspectStyle = () => {
    switch (ratioId) {
      case "1-1": return "aspect-square w-[700px] h-[700px]";
      case "16-9": return "aspect-video w-[950px] h-[534px]";
      default: return "w-full min-w-[500px] max-w-[800px]";
    }
  };

  const getPrismLang = () => {
    const selected = LANGUAGES.find((l) => l.id === language);
    return selected ? selected.prismId : "javascript";
  };

  const lines = code.split("\n");

  return (
    <div className="w-full flex items-center justify-center overflow-visible py-2">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="flex items-center justify-center shrink-0"
      >
        <div
          ref={canvasRef}
          id="pixelcode-export-canvas"
          style={{
            backgroundColor: bgHex,
            transition: "background-color 0.25s ease",
          }}
          className={`p-12 ${getAspectStyle()} flex items-center justify-center relative overflow-hidden transition-all duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Drag file cover */}
          {isDragOver && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-20 border-2 border-dashed border-zinc-300 m-4 rounded-xl">
              <span className="text-white text-sm font-bold tracking-wide">
                Drop code file to import
              </span>
            </div>
          )}

          {/* Styled Editor Window Box */}
          <div
            ref={containerRef}
            style={{
              borderRadius: "12px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.25s ease",
            }}
            data-theme={themeId}
            className="w-full flex flex-col border border-zinc-200/10 overflow-hidden relative"
          >
            {/* macOS Buttons Title bar */}
            <div className="h-11 border-b border-zinc-700/10 px-4 flex items-center justify-between shrink-0 select-none bg-black/5">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>

              <div className="absolute left-1/2 -translate-x-1/2">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="bg-transparent border-none text-center outline-none text-xs font-semibold focus:ring-0 w-36 text-zinc-400/80 hover:text-zinc-600 focus:text-zinc-900 transition-colors"
                  placeholder="untitled.js"
                />
              </div>

              <div className="w-10" />
            </div>

            {/* Code Highlighter Frame */}
            <div className="flex flex-1 relative min-h-[140px] overflow-hidden code-container">
              
              {/* Optional Line Numbers Column */}
              {showLineNumbers && (
                <div className="py-5 pl-4 pr-2 text-right select-none font-mono text-[10px] leading-[20px] border-r border-zinc-500/10 shrink-0 text-zinc-400/40">
                  {lines.map((_, i) => (
                    <div key={i} className="h-[20px]">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Editable Text Area overlapping highlighted layout */}
              <div className="flex-1 relative overflow-hidden py-5 px-5">
                <div className="code-editor-wrapper w-full h-full">
                  <pre
                    ref={preRef}
                    className="code-editor-pre text-xs leading-[20px] m-0 p-0 overflow-auto w-full h-full bg-transparent border-none"
                  >
                    <code className={`language-${getPrismLang()} font-mono`}>
                      {code}
                    </code>
                  </pre>

                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    className="code-editor-textarea text-xs leading-[20px] p-0 m-0 font-mono"
                    spellCheck="false"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
