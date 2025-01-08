import React, { useState, useRef, useEffect } from "react";

export default function TShirtCustomizer() {
  const [logo, setLogo] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Function to draw the current state on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw t-shirt
    const tshirtImage = new Image();
    tshirtImage.crossOrigin = "anonymous";
    tshirtImage.src = "/placeholder.svg?height=400&width=400";

    tshirtImage.onload = () => {
      ctx.drawImage(tshirtImage, 0, 0, canvas.width, canvas.height);

      // Draw logo if exists
      if (logoRef.current) {
        const logoWidth = 100;
        const logoHeight =
          (logoRef.current.height / logoRef.current.width) * logoWidth;
        ctx.drawImage(
          logoRef.current,
          logoPosition.x - logoWidth / 2,
          logoPosition.y - logoHeight / 2,
          logoWidth,
          logoHeight
        );
      }
    };
  };

  // Initial canvas setup
  useEffect(() => {
    drawCanvas();
  }, []);

  // Redraw when logo or position changes
  useEffect(() => {
    if (logo) {
      drawCanvas();
    }
  }, [logo, logoPosition]);

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null); // Clear any previous errors

    const reader = new FileReader();

    reader.onerror = () => {
      setError("Error reading file");
    };

    reader.onload = (e) => {
      const logoImage = new Image();

      logoImage.onerror = () => {
        setError("Error loading image");
      };

      logoImage.onload = () => {
        logoRef.current = logoImage;
        setLogo(e.target.result);
        // Force a redraw after logo is loaded
        drawCanvas();
      };

      logoImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    if (!logo) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const logoWidth = 100;
    const logoHeight = logoRef.current
      ? (logoRef.current.height / logoRef.current.width) * logoWidth
      : 100;

    if (
      x >= logoPosition.x - logoWidth / 2 &&
      x <= logoPosition.x + logoWidth / 2 &&
      y >= logoPosition.y - logoHeight / 2 &&
      y <= logoPosition.y + logoHeight / 2
    ) {
      setIsDragging(true);
      setDragOffset({
        x: x - logoPosition.x,
        y: y - logoPosition.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLogoPosition({
      x: x - dragOffset.x,
      y: y - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "customized-tshirt.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex justify-around flex-col md:flex-row gap-8 p-4">
      <div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-200 rounded-lg cursor-move bg-white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <div className="w-full md:w-64 space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="logo-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Logo
          </label>
          <input
            ref={fileInputRef}
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Choose Logo File
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {logo && !error && (
            <p className="text-sm text-gray-500">Logo uploaded successfully</p>
          )}
        </div>
        <button
          onClick={handleDownload}
          disabled={!logo || error}
          className="w-full flex items-center justify-center px-4 py-2 
            border border-transparent rounded-md shadow-sm text-sm font-medium 
            text-white bg-blue-600 hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Download Design
        </button>
      </div>
    </div>
  );
}
