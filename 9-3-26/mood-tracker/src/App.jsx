import React, { useState, useEffect, useRef } from 'react';

const moods = [
  {
    id: 1, emoji: '😊', label: 'Happy',
    bg: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    orb1: '#a8edea', orb2: '#fed6e3', orb3: '#f9ca74',
    accent: '#2dd4bf', textDark: '#0f4c42',
    message: "You're radiating pure magic today ✨",
    sub: "Keep that beautiful energy alive"
  },
  {
    id: 2, emoji: '😃', label: 'Excited',
    bg: 'linear-gradient(135deg, #f6d365, #fda085)',
    orb1: '#fda085', orb2: '#f6d365', orb3: '#f093fb',
    accent: '#f97316', textDark: '#7c2d12',
    message: "The world can't contain your energy ⚡",
    sub: "Channel it into something amazing"
  },
  {
    id: 3, emoji: '😌', label: 'Calm',
    bg: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
    orb1: '#a1c4fd', orb2: '#c2e9fb', orb3: '#d4fc79',
    accent: '#60a5fa', textDark: '#1e3a5f',
    message: "Peace lives in the quiet of your breath 🌊",
    sub: "Stillness is the deepest kind of strength"
  },
  {
    id: 4, emoji: '😢', label: 'Sad',
    bg: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
    orb1: '#66a6ff', orb2: '#89f7fe', orb3: '#a78bfa',
    accent: '#818cf8', textDark: '#1e1b4b',
    message: "Tears water the seeds of tomorrow 💙",
    sub: "You are so much stronger than you know"
  },
  {
    id: 5, emoji: '😠', label: 'Angry',
    bg: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
    orb1: '#ff6b6b', orb2: '#ffa500', orb3: '#ff4757',
    accent: '#ef4444', textDark: '#7f1d1d',
    message: "Feel it fully — then let it go 🔥",
    sub: "This fire can forge something new"
  },
  {
    id: 6, emoji: '😟', label: 'Anxious',
    bg: 'linear-gradient(135deg, #c471ed, #f64f59)',
    orb1: '#c471ed', orb2: '#f64f59', orb3: '#a855f7',
    accent: '#d946ef', textDark: '#4a044e',
    message: "You are safe. Right here. Right now ✨",
    sub: "One breath at a time, you've got this"
  },
  {
    id: 7, emoji: '😴', label: 'Tired',
    bg: 'linear-gradient(135deg, #4a4a6a, #6b7db3)',
    orb1: '#6b7db3', orb2: '#4a4a6a', orb3: '#94a3b8',
    accent: '#94a3b8', textDark: '#0f172a',
    message: "Rest is sacred. Honor it. 💤",
    sub: "The world can wait while you restore"
  },
];

const FloatingOrb = ({ color, style }) => (
  <div style={{
    position: 'absolute',
    borderRadius: '50%',
    background: color,
    filter: 'blur(60px)',
    opacity: 0.45,
    transition: 'all 1.2s cubic-bezier(0.4,0,0.2,1)',
    ...style
  }} />
);

const MoodParticle = ({ x, y, emoji }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', left: x, top: y, pointerEvents: 'none',
      fontSize: '2rem', zIndex: 9999,
      animation: 'floatUp 1.2s ease-out forwards',
    }}>{emoji}</div>
  );
};

export default function VibeFlow() {
  const [currentMood, setCurrentMood] = useState(null);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(5);
  const [particles, setParticles] = useState([]);
  const [selected, setSelected] = useState(false);
  const [hoveredMood, setHoveredMood] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vf_mood');
      const savedHistory = JSON.parse(localStorage.getItem('vf_history') || '[]');
      if (saved) { setCurrentMood(JSON.parse(saved)); setSelected(true); }
      setHistory(savedHistory);
    } catch (e) {}
  }, []);

  const selectMood = (mood, e) => {
    setCurrentMood(mood);
    setSelected(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
      y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 80,
      emoji: mood.emoji
    }));
    setParticles(p => [...p, ...newParticles]);
    setTimeout(() => setParticles(p => p.filter(pt => !newParticles.find(n => n.id === pt.id))), 1400);
    try {
      localStorage.setItem('vf_mood', JSON.stringify(mood));
      const entry = { ...mood, date: new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) };
      const updated = [entry, ...history].slice(0, 7);
      setHistory(updated);
      localStorage.setItem('vf_history', JSON.stringify(updated));
    } catch (e) {}
  };

  const activeMood = hoveredMood || currentMood;
  const bg = activeMood ? activeMood.bg : 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';

  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      transition: 'background 0.9s cubic-bezier(0.4,0,0.2,1)',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(1.6); opacity: 0; }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-20px) scale(1.05); }
          66% { transform: translate(-20px,15px) scale(0.97); }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
          70% { box-shadow: 0 0 0 18px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .mood-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
          cursor: pointer;
          border: none;
          outline: none;
          background: none;
          padding: 0;
        }
        .mood-card:hover { transform: translateY(-8px) scale(1.07); }
        .mood-card.active { animation: pulse-ring 2s infinite; transform: scale(1.1); }
        .mood-card:active { transform: scale(0.95); }

        .glass {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .glass-dark {
          background: rgba(0,0,0,0.15);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .main-card {
          animation: fadeIn 0.6s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        .history-item {
          transition: transform 0.25s ease, background 0.25s ease;
          cursor: default;
        }
        .history-item:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.2) !important;
        }

        .shimmer-text {
          background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.5) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .emoji-bounce {
          display: inline-block;
          animation: breathe 3s ease-in-out infinite;
        }

        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 4px; }
      `}</style>

      {/* Animated background orbs */}
      {activeMood && <>
        <FloatingOrb color={activeMood.orb1} style={{ width: 500, height: 500, top: -100, left: -100, animation: 'orbFloat 8s ease-in-out infinite' }} />
        <FloatingOrb color={activeMood.orb2} style={{ width: 400, height: 400, bottom: -80, right: -80, animation: 'orbFloat 10s ease-in-out infinite reverse' }} />
        <FloatingOrb color={activeMood.orb3} style={{ width: 300, height: 300, top: '40%', left: '50%', animation: 'orbFloat 12s ease-in-out infinite 2s' }} />
      </>}
      {!activeMood && <>
        <FloatingOrb color="#6366f1" style={{ width: 500, height: 500, top: -150, left: -100, animation: 'orbFloat 9s ease-in-out infinite' }} />
        <FloatingOrb color="#ec4899" style={{ width: 350, height: 350, bottom: -100, right: -80, animation: 'orbFloat 11s ease-in-out infinite reverse' }} />
      </>}

      {/* Floating particles */}
      {particles.map(p => <MoodParticle key={p.id} x={p.x} y={p.y} emoji={p.emoji} />)}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 0 24px', animation: 'slideUp 0.6s ease forwards' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 42, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))', animation: 'spin-slow 20s linear infinite' }}>🌈</div>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}>VibeFlow</h1>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 400, letterSpacing: 2, textTransform: 'uppercase', marginTop: 2 }}>Mood Journal</p>
            </div>
          </div>

          <div className="glass" style={{ padding: '12px 22px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 28 }}>🔥</div>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 500 }}>Streak</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>{streak} days</p>
            </div>
          </div>
        </header>

        {/* Hero text */}
        <div style={{ textAlign: 'center', marginBottom: 48, animation: 'slideUp 0.7s 0.1s ease both' }}>
          {!selected ? (
            <>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 14 }}>
                How's your <span className="shimmer-text">vibe</span> today?
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', fontWeight: 300, maxWidth: 440, margin: '0 auto' }}>
                Every feeling deserves to be seen. Tap your mood and let the world reflect it.
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 10 }}>
                You're feeling <span style={{ fontStyle: 'italic', opacity: 0.9 }}>{currentMood?.label}</span>
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                {currentMood?.sub}
              </p>
            </>
          )}
        </div>

        {/* Mood Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 14,
          marginBottom: 40,
          animation: 'slideUp 0.7s 0.2s ease both',
        }}>
          {moods.map((mood) => (
            <button
              key={mood.id}
              className={`mood-card${currentMood?.id === mood.id ? ' active' : ''}`}
              onClick={(e) => selectMood(mood, e)}
              onMouseEnter={() => setHoveredMood(mood)}
              onMouseLeave={() => setHoveredMood(null)}
              style={{
                height: 130,
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: currentMood?.id === mood.id
                  ? `0 12px 40px ${mood.orb1}80, 0 0 0 3px rgba(255,255,255,0.5)`
                  : '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: mood.bg, opacity: 0.9 }} />
              <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 44, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}>{mood.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: 0.5, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{mood.label}</span>
                {currentMood?.id === mood.id && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.8 }} />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Main Mood Display */}
        {currentMood && (
          <div className="main-card glass-dark" style={{
            borderRadius: 32,
            padding: '40px 48px',
            display: 'flex',
            alignItems: 'center',
            gap: 48,
            marginBottom: 40,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background accent */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 20% 50%, ${currentMood.orb1}30, transparent 60%)`,
              pointerEvents: 'none',
            }} />

            {/* Emoji */}
            <div style={{ flexShrink: 0 }}>
              <div className="emoji-bounce" style={{
                fontSize: 110,
                filter: `drop-shadow(0 8px 32px ${currentMood.orb1}80)`,
                display: 'block',
              }}>
                {currentMood.emoji}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  background: currentMood.accent,
                  color: currentMood.textDark,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  padding: '5px 14px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                }}>
                  Current Vibe
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Just now</span>
              </div>

              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-1.5px',
                lineHeight: 1,
                marginBottom: 14,
              }}>
                {currentMood.label}
              </h3>

              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontWeight: 300, maxWidth: 460 }}>
                {currentMood.message}
              </p>
            </div>

            {/* Right side decoration */}
            <div style={{ flexShrink: 0, textAlign: 'center' }}>
              <div className="glass" style={{ borderRadius: 20, padding: '20px 24px', minWidth: 120 }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, fontWeight: 500 }}>Mood Score</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{currentMood.id}/7</p>
                <div style={{ display: 'flex', gap: 4, marginTop: 10, justifyContent: 'center' }}>
                  {moods.map(m => (
                    <div key={m.id} style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: m.id === currentMood.id ? '#fff' : 'rgba(255,255,255,0.2)',
                      transition: 'background 0.3s ease',
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mood History */}
        <div style={{ marginTop: 'auto', paddingBottom: 40, animation: 'slideUp 0.7s 0.4s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, textTransform: 'uppercase' }}>
              Recent Vibes
            </h3>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{history.length} entries</span>
          </div>

          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
            {history.length > 0 ? history.map((entry, i) => (
              <div key={i} className="history-item glass" style={{
                minWidth: 120, borderRadius: 22, padding: '18px 16px',
                textAlign: 'center', flexShrink: 0,
              }}>
                <div style={{ fontSize: 40, marginBottom: 8, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))' }}>{entry.emoji}</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{entry.label}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 500, letterSpacing: 0.5 }}>{entry.date}</p>
              </div>
            )) : (
              <div style={{ width: '100%', textAlign: 'center', padding: '32px 0' }}>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Your mood history will appear here ✨</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}