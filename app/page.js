"use client";
import { useEffect, useRef, useState } from "react";

const PHOTOS = [
  { src: "/photos/g1.jpg", cap: "Mirror selfie squad", tilt: -3 },
  { src: "/photos/g3.jpg", cap: "Festival glow", tilt: 2 },
  { src: "/photos/g2.jpg", cap: "Gravity is optional", tilt: -2 },
  { src: "/photos/g4.jpg", cap: "The big outing", tilt: 3 },
  { src: "/photos/g5.jpg", cap: "Blue-hour glow", tilt: -3 },
  { src: "/photos/g6.jpg", cap: "One puff in , One soul out", tilt: 2 },
  { src: "/photos/g7.jpeg", cap: "Campus-side trekking", tilt: -2 },
  { src: "/photos/g8.jpeg", cap: "hehehe", tilt: 2 },
];

const MESSAGE = [
  "First of all, many, many happy returns of the day! And bro, now you're an adult. LFG! It's your special day and I want you to enjoy every bit of it.",
  "I still remember the first day we met. Not a very good day to remember, honestly. We were sitting in front of Bharti Cafe, and what started as a normal bitching session turned into a crying session. I just sat there listening to you. What could I even do? I felt like a stranger and didn't want to interfere or start a conversation. But I listened to your every sentence and analysed it, and what I saw was exactly how someone who truly cares would think. I had an enormous amount of respect and gratitude for your thinking and your efforts. I believe you are still the same Anagha who keeps me inspired and motivated toward my goals. I would love to see you take on your life's challenges head-on as they come.",
  "I   might never reach the level of thinking where your thoughts reside, but I think I understand them quite well. You are a real god and one of the realest people I have met in my entire life so far. Take the non-veg thing and all your nuanced, intrusive thoughts, for instance. Keeping the ball knowledge at a certain level alongside all that academic knowledge can only be managed by someone like you. Keep that spark in you always. I have lived some moments with you that I will cherish. I love our tea-spilling sessions, and I pray to God we never run out of tea. I've spent some of my best moments with you and the group, and I'm sure you'll do great in your future.",
  "Finally, Anagha, I want to tell you this: keep the spark in you, and keep your curiosity alive. We have many more memories to make, many more hangouts to do, and many more plans to cancel. Here, I, Dayanand Anil Ghugal, end my 2 shabd. I'm sorry if this website lacks something. I don't have many pictures of you, so I used every image in my domain. I just want you to be happy. ☀️🌈",
];

const BITS = ["🎉", "🎂", "✨", "🎈", "💛", "🍵", "🌈", "🎊"];

function Reveal({ children, className = "", style }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={style} className={`reveal ${on ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(null);
  const [bits, setBits] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
      document.documentElement.style.setProperty("--p", p.toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(boom, 700);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function boom() {
    const base = Date.now();
    setBits(
      Array.from({ length: 48 }, (_, i) => ({
        id: base + i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        dur: 3 + Math.random() * 2.5,
        size: 18 + Math.random() * 18,
        e: BITS[i % BITS.length],
      }))
    );
    setTimeout(() => setBits([]), 7000);
  }

  function playVideo() {
    const v = videoRef.current;
    if (!v) return;
    setEnded(false);
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  }

  return (
    <>
      <div className="bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg-fill" src="/photos/bg.jpg" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg-sharp" src="/photos/bg.jpg" alt="" />
        <div className="bg-shade" />
      </div>

      <div className="confetti" aria-hidden="true">
        {bits.map((b) => (
          <span
            key={b.id}
            style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`, fontSize: b.size }}
          >
            {b.e}
          </span>
        ))}
      </div>

      <main>
        <section className="hero">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-text">
            <h1>Happy Birthday!</h1>
            <p className="hero-for">Anagha</p>
            <p className="hero-sub">Scroll down. I wrote you something.</p>
            <span className="hint" aria-hidden="true">↓</span>
          </div>
        </section>

        <section className="wrap message-wrap">
          <Reveal className="glass">
            <h2>YO TWINGA,</h2>
            {MESSAGE.map((m, i) => (
              <p key={i}>{m}</p>
            ))}
          </Reveal>
        </section>

        <section className="wrap">
          <Reveal>
            <h2 className="center">A few of our moments</h2>
          </Reveal>
          <div className="gallery">
            {PHOTOS.map((p, i) => (
              <Reveal key={p.src} className="polaroid-wrap">
                <button
                  className="polaroid"
                  style={{ "--tilt": `${p.tilt}deg` }}
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo: ${p.cap}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.cap} loading="lazy" />
                  <span>{p.cap}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wrap">
          <Reveal className="glass center">
            <h2>One more memory</h2>
            <p>Press play. It's only 3 seconds.</p>
            <div className="video-box">
              <video
                ref={videoRef}
                src="/video/memory.mp4#t=0.1"
                preload="metadata"
                playsInline
                onEnded={() => {
                  setPlaying(false);
                  setEnded(true);
                }}
              />
              {!playing && (
                <button className="play" onClick={playVideo} aria-label={ended ? "Replay video" : "Play video"}>
                  <span>{ended ? "↻" : "▶"}</span>
                </button>
              )}
            </div>
          </Reveal>
        </section>

        <section className="wrap finale">
          <Reveal className="glass center">
            <p>
              I would love to see you shine and grow. Keep that spark alive. We have many more memories to make.
            </p>
            <h2 className="big">HAPPY BIRTHDAY ANAGHA</h2>
            <p className="sign">With all the very best, from your Twinky friend, Dayanand</p>
            <button className="cta" onClick={boom}>Celebrate again 🎉</button>
          </Reveal>
        </section>
      </main>

      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTOS[open].src} alt={PHOTOS[open].cap} />
          <button className="close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
        </div>
      )}
    </>
  );
}
