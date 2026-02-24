import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++", "Java"] },
  { category: "Frontend", items: ["React", "Next.js", "HTML & CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js",  "MySQL"] },
  { category: "Tools", items: ["Git", "Docker", "Figma"] },
];

const PROJECTS = [
  {
    title: "Sammie's Apt",
    desc: "An apartment management system designed to streamline tenant records, unit tracking, and rental payment monitoring for small-scale property management.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    year: "2024",
    color: "#9333ea",
    repo: "https://github.com/jorenmontejo/SammiesApt",
  },
  {
    title: "Water Refilling System",
    desc: "A point-of-sale and inventory management system for a water refilling station, handling customer orders, stock levels, and transaction records.",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    year: "2024",
    color: "#7c3aed",
    repo: "https://github.com/joreenn/WaterRefillingSystem",
  },
  {
    title: "School Bell System",
    desc: "An automated school bell scheduler that triggers bell rings based on a configurable timetable, replacing manual bell ringing with a reliable digital solution.",
    tags: ["Python", "Tkinter", "Automation"],
    year: "2024",
    color: "#a855f7",
    repo: "https://github.com/joreenn/School-bell",
  },
];



// ── Shooting Stars Canvas ──────────────────────────────────────────────────
function ShootingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let comets = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Static star field
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    function spawnComet() {
      const startX = Math.random() * canvas.width * 0.9 + canvas.width * 0.1;
      const startY = Math.random() * canvas.height * 0.4;
      const angle = (Math.PI / 180) * (195 + Math.random() * 30);
      const speed = 3.5 + Math.random() * 3;
      comets.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 90 + Math.random() * 80,
        alpha: 0,
        life: 0,
        maxLife: 90 + Math.random() * 60,
      });
    }

    let frameCount = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });

      frameCount++;
      if (frameCount % 140 === 0 && comets.length < 4) spawnComet();

      comets = comets.filter((c) => c.life < c.maxLife);
      comets.forEach((c) => {
        c.life++;
        if (c.life < 20) c.alpha = c.life / 20;
        else if (c.life > c.maxLife - 20) c.alpha = (c.maxLife - c.life) / 20;
        else c.alpha = 1;

        c.x += c.vx;
        c.y += c.vy;

        const tailX = c.x - c.vx * (c.len / Math.hypot(c.vx, c.vy));
        const tailY = c.y - c.vy * (c.len / Math.hypot(c.vx, c.vy));

        const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(216,180,254,${c.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,${c.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(168,85,247,0.8)";
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${c.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    setTimeout(spawnComet, 600);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(145deg, #0f0420 0%, #1a0638 20%, #2e1065 42%, #1a0638 65%, #0d0222 100%)",
        color: "#ede9fe",
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>

      <ShootingStars />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div style={{ position: "absolute", top: "-5%", right: "5%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.16) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "-10%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "20%", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 65%)" }} />
      </div>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(15,4,32,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(168,85,247,0.2)" : "1px solid transparent",
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold tracking-widest uppercase text-sm"
            style={{
              background: "linear-gradient(90deg, #d8b4fe, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
            Joren Montejo
          </span>
          <div className="hidden md:flex gap-10">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)}
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "rgba(216,180,254,0.45)" }}
                onMouseEnter={(e) => (e.target.style.color = "#d8b4fe")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(216,180,254,0.45)")}>
                {l}
              </button>
            ))}
          </div>
          {/* CTA pill */}
          <a href="mailto:alex@mit.edu"
            className="hidden md:inline-block px-5 py-2 text-xs tracking-widest uppercase font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(90deg, #9333ea, #7c3aed)",
              color: "#fff", borderRadius: "999px",
              boxShadow: "0 0 18px rgba(147,51,234,0.4)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(147,51,234,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 18px rgba(147,51,234,0.4)"; }}>
            Let's Connect
          </a>
          <button className="md:hidden" style={{ color: "#d8b4fe" }} onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-30 pt-20 px-8 flex flex-col gap-8"
          style={{ background: "rgba(10,2,22,0.97)", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)}
              className="text-left text-2xl tracking-widest uppercase border-b pb-4"
              style={{ color: "#c4b5fd", borderColor: "rgba(168,85,247,0.15)" }}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" className="relative z-10 min-h-screen flex items-center pt-24">
        <div className="max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

            {/* ── Text ── */}
            <div className="flex-1 max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs tracking-widest uppercase"
                style={{
                  background: "rgba(147,51,234,0.18)",
                  border: "1px solid rgba(168,85,247,0.35)",
                  borderRadius: "999px",
                  color: "#c4b5fd",
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                }}>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" style={{ boxShadow: "0 0 6px #a855f7" }} />
                Welcome to my Portfolio
              </div>

              <h1 className="leading-tight mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.8rem)", letterSpacing: "-0.025em" }}>
                <span style={{ color: "#f3e8ff" }}>Hi, I'm</span>
                <br />
                <span style={{
                  background: "linear-gradient(90deg, #e879f9 0%, #c084fc 40%, #a855f7 80%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Joren Montejo
                </span>
                <br />
                <span style={{ color: "rgba(237,233,254,0.7)", fontSize: "0.6em" }}>CS Student & Developer</span>
              </h1>

              <div className="w-16 h-px mb-6"
                style={{ background: "linear-gradient(90deg, #a855f7, transparent)" }} />

              <p className="text-base leading-relaxed mb-10 max-w-md"
                style={{ color: "rgba(237,233,254,0.55)", lineHeight: "1.9" }}>
                A computer science student focused on distributed systems and applied machine learning. I build software that is technically rigorous and genuinely useful.
              </p>

              <div className="flex flex-wrap gap-4" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
                <button onClick={() => scrollTo("Projects")}
                  className="px-7 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-200"
                  style={{
                    background: "linear-gradient(90deg, #9333ea, #7c3aed)",
                    color: "#fff", borderRadius: "4px",
                    boxShadow: "0 0 24px rgba(147,51,234,0.4)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 40px rgba(147,51,234,0.65)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 24px rgba(147,51,234,0.4)"; }}>
                  View Projects
                </button>
                <button onClick={() => scrollTo("Contact")}
                  className="px-7 py-3 text-xs tracking-widest uppercase transition-all duration-200"
                  style={{ border: "1px solid rgba(168,85,247,0.4)", color: "rgba(216,180,254,0.75)", background: "transparent", borderRadius: "4px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.color = "#d8b4fe"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; e.currentTarget.style.color = "rgba(216,180,254,0.75)"; }}>
                  Contact Me
                </button>
              </div>
            </div>

            {/* ── Photo ── */}
            <div className="flex-shrink-0 flex justify-center items-center relative" style={{ width: "340px" }}>
              {/* Outer glow ring */}
              <div style={{
                position: "absolute",
                inset: "-30px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(147,51,234,0.32) 0%, rgba(168,85,247,0.12) 50%, transparent 72%)",
                filter: "blur(18px)",
                pointerEvents: "none",
              }} />
              {/* Inner accent ring */}
              <div style={{
                position: "absolute",
                inset: "0",
                borderRadius: "50%",
                border: "1px solid rgba(168,85,247,0.25)",
                pointerEvents: "none",
              }} />
              <img
                src="/photo.jpg"
                alt="Joren Montejo"
                style={{
                  width: "320px",
                  height: "320px",
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: "50%",
                  display: "block",
                  position: "relative",
                  filter: "brightness(0.88) contrast(1.08) saturate(0.9)",
                  maskImage: "radial-gradient(circle 148px at 50% 50%, black 55%, rgba(0,0,0,0.85) 68%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(circle 148px at 50% 50%, black 55%, rgba(0,0,0,0.85) 68%, transparent 100%)",
                  boxShadow: "0 0 0 1px rgba(168,85,247,0.2), 0 8px 48px rgba(147,51,234,0.3)",
                }}
              />
              {/* Purple tint overlay */}
              <div style={{
                position: "absolute",
                inset: "0",
                borderRadius: "50%",
                background: "radial-gradient(circle at 70% 30%, rgba(192,132,252,0.08) 0%, transparent 60%)",
                pointerEvents: "none",
              }} />
            </div>

          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── SKILLS ── */}
      <section id="skills" className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "rgba(192,132,252,0.5)", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
              What I Know
            </p>
            <h2 className="text-4xl md:text-5xl" style={{ letterSpacing: "-0.02em", color: "#f3e8ff" }}>
              My <GradSpan>Skills</GradSpan>
            </h2>
            <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: "rgba(237,233,254,0.45)", lineHeight: "1.8" }}>
              A focused set of tools I rely on to build reliable, scalable software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {SKILLS.map((group) => (
              <div key={group.category} className="p-6 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, rgba(91,33,182,0.12), rgba(46,16,101,0.06))",
                  border: "1px solid rgba(168,85,247,0.18)",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(147,51,234,0.2), rgba(91,33,182,0.12))"; e.currentTarget.style.borderColor = "rgba(192,132,252,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(91,33,182,0.12), rgba(46,16,101,0.06))"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.18)"; }}>
                <p className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: "#a855f7", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((sk) => (
                    <span key={sk} className="px-2 py-1 text-xs"
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        color: "rgba(216,180,254,0.75)",
                        border: "1px solid rgba(124,58,237,0.25)",
                        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                      }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "rgba(192,132,252,0.5)", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
              My Work
            </p>
            <h2 className="text-4xl md:text-5xl" style={{ letterSpacing: "-0.02em", color: "#f3e8ff" }}>
              Selected <GradSpan>Projects</GradSpan>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <a key={p.title} href={p.repo} target="_blank" rel="noopener noreferrer"
                className="p-8 group relative overflow-hidden transition-all duration-300 cursor-pointer block"
                style={{
                  background: "linear-gradient(135deg, rgba(91,33,182,0.14), rgba(46,16,101,0.08))",
                  border: "1px solid rgba(168,85,247,0.18)",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(147,51,234,0.22), rgba(91,33,182,0.12))"; e.currentTarget.style.borderColor = "rgba(192,132,252,0.4)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(147,51,234,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(91,33,182,0.14), rgba(46,16,101,0.08))"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.18)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <div className="flex items-center justify-between mb-5"
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
                  <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(192,132,252,0.5)" }}>{p.year}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "rgba(192,132,252,0.5)", fontSize: "1.1rem" }}>↗</span>
                </div>
                <h3 className="text-xl font-normal mb-3" style={{ color: "#f3e8ff" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(237,233,254,0.5)", lineHeight: "1.8" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs tracking-wide uppercase"
                      style={{ background: "rgba(147,51,234,0.18)", color: "rgba(216,180,254,0.75)", border: "1px solid rgba(147,51,234,0.28)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#a855f7" }}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span className="text-xs tracking-widest uppercase" style={{ color: "#a855f7" }}>View on GitHub</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: "70vw", height: "40vh", background: "radial-gradient(ellipse, rgba(147,51,234,0.2) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto px-6 py-24 relative">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "rgba(192,132,252,0.5)", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-normal mb-4" style={{ letterSpacing: "-0.02em", color: "#f3e8ff" }}>
              Let's Start a <GradSpan>Conversation</GradSpan>
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: "rgba(237,233,254,0.5)", lineHeight: "1.9" }}>
              Actively seeking internship and full-time opportunities from Summer 2025. Open to collaborations and interesting projects.
            </p>
          </div>

          <div className="max-w-xl mx-auto p-10 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(91,33,182,0.2), rgba(46,16,101,0.12))",
              border: "1px solid rgba(168,85,247,0.25)",
              borderRadius: "8px",
              boxShadow: "0 0 60px rgba(147,51,234,0.1)",
            }}>
            <a href="mailto:alex@mit.edu"
              className="inline-block px-10 py-4 mb-8 text-sm tracking-widest uppercase font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(90deg, #9333ea, #7c3aed)",
                color: "#fff", borderRadius: "4px",
                boxShadow: "0 0 28px rgba(147,51,234,0.45)",
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 48px rgba(147,51,234,0.7)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 28px rgba(147,51,234,0.45)"; }}>
              Say Hello →
            </a>
            <p className="text-xs mb-6" style={{ color: "rgba(196,181,253,0.4)", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
              or find me on
            </p>
            <div className="flex justify-center flex-wrap gap-4" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
              {["GitHub", "LinkedIn", "Twitter", "Resume"].map((link) => (
                <a key={link} href="#"
                  className="px-5 py-2.5 text-xs tracking-widest uppercase transition-all duration-200"
                  style={{ border: "1px solid rgba(168,85,247,0.28)", color: "rgba(196,181,253,0.55)", borderRadius: "4px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.color = "#d8b4fe"; e.currentTarget.style.background = "rgba(147,51,234,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.28)"; e.currentTarget.style.color = "rgba(196,181,253,0.55)"; e.currentTarget.style.background = "transparent"; }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6"
        style={{ borderTop: "1px solid rgba(168,85,247,0.12)", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-xs tracking-widest" style={{ color: "rgba(192,132,252,0.3)" }}>© 2024 Joren Montejo</span>
          <span className="text-xs tracking-widest" style={{ color: "rgba(192,132,252,0.3)" }}>Cambridge, Massachusetts</span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}

function GradSpan({ children }) {
  return (
    <span style={{
      background: "linear-gradient(90deg, #e879f9 0%, #c084fc 50%, #a855f7 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {children}
    </span>
  );
}

function GradientDivider() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(232,121,249,0.25), transparent)" }} />
    </div>
  );
}
