'use client';

import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 20;

export default function SnakeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 20, y: 20 }, { x: 19, y: 20 }, { x: 18, y: 20 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const directionRef = useRef({ x: 1, y: 0 });

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { x, y } = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
          if (y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
          if (x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
          if (x === 0) directionRef.current = { x: 1, y: 0 };
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };
        head.x += directionRef.current.x;
        head.y += directionRef.current.y;

        const canvas = canvasRef.current;
        const columns = canvas ? Math.floor(canvas.width / GRID_SIZE) : 50;
        const rows = canvas ? Math.floor(canvas.height / GRID_SIZE) : 50;

        // Wrap around screen seamlessly
        if (head.x >= columns) head.x = 0;
        if (head.x < 0) head.x = columns - 1;
        if (head.y >= rows) head.y = 0;
        if (head.y < 0) head.y = rows - 1;

        // Check self collision (restart silently)
        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          directionRef.current = { x: 1, y: 0 };
          return [{ x: 20, y: 20 }, { x: 19, y: 20 }, { x: 18, y: 20 }];
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * (columns - 2)) + 1,
            y: Math.floor(Math.random() * (rows - 2)) + 1,
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 100);
    return () => clearInterval(intervalId);
  }, [food]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;
    const draw = () => {
      // Check theme variables for color changes
      const isDark = document.documentElement.classList.contains('dark');
      const baseColor = isDark ? '245, 245, 247' : '29, 29, 31';

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw food
      ctx.fillStyle = `rgba(${baseColor}, 0.3)`;
      ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);

      // Draw snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 
            ? `rgba(${baseColor}, 0.2)`   // Head is slightly darker
            : `rgba(${baseColor}, 0.08)`; // Tail is subtle fading
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [snake, food]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-0"
    />
  );
}