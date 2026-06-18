'use client';

import Marquee from './Marquee';
import ToolList from './ToolList';

const TOOLS = [
  { name: 'AWS', src: 'https://skillicons.dev/icons?i=aws' },
  { name: 'Docker', src: 'https://skillicons.dev/icons?i=docker' },
  { name: 'Nginx', src: 'https://skillicons.dev/icons?i=nginx' },
  { name: 'Linux', src: 'https://skillicons.dev/icons?i=linux' },
  { name: 'Git', src: 'https://skillicons.dev/icons?i=git' },
  { name: 'Python', src: 'https://skillicons.dev/icons?i=python' },
  { name: 'PyTorch', src: 'https://skillicons.dev/icons?i=pytorch' },
  { name: 'TensorFlow', src: 'https://skillicons.dev/icons?i=tensorflow' },
  { name: 'React', src: 'https://skillicons.dev/icons?i=react' },
  { name: 'Next.js', src: 'https://skillicons.dev/icons?i=nextjs' },
  { name: 'TypeScript', src: 'https://skillicons.dev/icons?i=ts' },
  { name: 'Node.js', src: 'https://skillicons.dev/icons?i=nodejs' },
  { name: 'Express', src: 'https://skillicons.dev/icons?i=express' },
  { name: 'PostgreSQL', src: 'https://skillicons.dev/icons?i=postgresql' },
  { name: 'MongoDB', src: 'https://skillicons.dev/icons?i=mongodb' },
  { name: 'RabbitMQ', src: 'https://skillicons.dev/icons?i=rabbitmq' },
  { name: 'GitHub Actions', src: 'https://skillicons.dev/icons?i=githubactions' },
];

export default function ToolkitSection() {
  return (
    <div
      id="toolkit"
      aria-label="Toolkit"
      className="main-toolkit-section"
    >
      <div
        className="toolkit-section-top toolkit-top-grid"
      >
        <div className="toolkit-section toolkit-heading-cell">
          <div className="heading-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div
              className="my-text font-italic"
              style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'left', width: '100%', color: '#b22222', marginBottom: '12px' }}
            >
              My
            </div>
            <div
              className="tool-text font-hero"
              style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase', textAlign: 'left', width: '100%' }}
            >
              TOOLKIT
            </div>
          </div>
          <div className="description-container toolkit-desc">
            A specialized stack focused on Artificial Intelligence, Cloud Infrastructure, and Scalable Backend Systems.
          </div>
        </div>
      </div>

      <Marquee items={TOOLS} speed={20} direction="right" />

      <div
        className="toolkit-section-top toolkit-bottom-grid"
      >
        <div className="toolkit-section toolkit-list-cell">
          <ToolList />
        </div>
      </div>
    </div>
  );
}