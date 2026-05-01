import { onMount, onCleanup, createSignal, For, Show } from 'solid-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const DinoBackground = (props: { isDarkMode: boolean }) => {
  const [pterodactylFrame, setPterodactylFrame] = createSignal(1);
  let pteroRef: HTMLImageElement | undefined;
  
  // Flapping animation
  let pteroInterval: any;
  onMount(() => {
    pteroInterval = setInterval(() => {
      setPterodactylFrame(f => f === 1 ? 2 : 1);
    }, 200);
    
    // Animate Pterodactyl across screen periodically
    if (pteroRef) {
      const fly = () => {
        gsap.fromTo(pteroRef!, {
          x: '110vw',
          y: () => 100 + Math.random() * 200,
        }, {
          x: '-20vw',
          duration: 12 + Math.random() * 8,
          ease: 'none',
          delay: 5 + Math.random() * 15,
          onComplete: fly
        });
      };
      fly();
    }
  });
  
  onCleanup(() => {
    clearInterval(pteroInterval);
    gsap.killTweensOf(pteroRef!);
  });

  const clouds = Array.from({ length: 5 }).map(() => ({
    top: `${5 + Math.random() * 40}%`,
    duration: 30 + Math.random() * 40,
    delay: -Math.random() * 40,
    scale: 0.6 + Math.random() * 0.6,
  }));

  const stars = Array.from({ length: 30 }).map(() => ({
    top: `${Math.random() * 70}%`,
    left: `${Math.random() * 100}%`,
    duration: 1 + Math.random() * 2,
    delay: Math.random() * 2,
    scale: 0.5 + Math.random() * 1,
  }));

  // Calculate real-life moon phase (0-6)
  const getMoonPhaseIndex = () => {
    const LUNAR_MONTH = 29.53058867;
    // Known new moon: Jan 6, 2000 18:14 UTC
    const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
    const diffDays = (Date.now() - knownNewMoon) / (1000 * 60 * 60 * 24);
    const currentPhase = diffDays % LUNAR_MONTH;
    // Map 0-29.53 days to 0-6 index
    return Math.floor((currentPhase / LUNAR_MONTH) * 7);
  };

  const currentMoonPhase = getMoonPhaseIndex();

  return (
    <div class="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Stars */}
      <Show when={props.isDarkMode}>
        <For each={stars}>
          {(star) => (
            <img 
              src="/dino-sprites/star.png" 
              class="absolute dino-sprite opacity-0"
              style={{
                top: star.top,
                left: star.left,
                transform: `scale(${star.scale})`,
                animation: `pulseStar ${star.duration}s infinite alternate ${star.delay}s ease-in-out`
              }}
              alt=""
            />
          )}
        </For>
        {/* Moon */}
        <img 
          src={`/dino-sprites/moon_phase_${currentMoonPhase}.png`} 
          class="absolute dino-sprite opacity-80"
          style={{ top: '15%', right: '10%', transform: 'scale(1.5)' }}
          alt="Moon"
        />
      </Show>

      {/* Clouds */}
      <For each={clouds}>
        {(cloud) => (
          <div 
            class="absolute"
            style={{
              top: cloud.top,
              animation: `cloudMove ${cloud.duration}s infinite linear ${cloud.delay}s`
            }}
          >
            <img 
              src="/dino-sprites/cloud.png" 
              class="dino-sprite dino-cloud"
              style={{ transform: `scale(${cloud.scale})`, "transform-origin": "left top" }}
              alt="Cloud"
            />
          </div>
        )}
      </For>

      {/* Pterodactyl */}
      <img 
        ref={pteroRef!}
        src={`/dino-sprites/pterodactyl_${pterodactylFrame()}.png`} 
        class="absolute dino-sprite opacity-90"
        style={{ left: 0, top: '100px', transform: 'translateX(110vw)' }}
        alt="Pterodactyl"
      />
    </div>
  );
};

export const DinoFooter = () => {
  let dinoRef: HTMLImageElement | undefined;
  let cactusRef: HTMLImageElement | undefined;
  let groundRef: HTMLDivElement | undefined;
  
  const [dinoState, setDinoState] = createSignal<'running_1' | 'running_2' | 'jumping'>('running_1');
  let runInterval: any;
  let isJumping = false;

  onMount(() => {
    // Ground Parallax/Movement
    gsap.to(groundRef!, {
      backgroundPositionX: '-1200px',
      ease: 'none',
      repeat: -1,
      duration: 3
    });

    // Dino Running Animation
    runInterval = setInterval(() => {
      if (!isJumping) {
        setDinoState(s => s === 'running_1' ? 'running_2' : 'running_1');
      }
    }, 120);

    // Cactus Loop
    if (cactusRef && dinoRef) {
      const spawnCactus = () => {
        gsap.fromTo(cactusRef!, 
          { x: window.innerWidth }, 
          { 
            x: -50, 
            duration: 2.5, 
            ease: 'none',
            onUpdate: function() {
              // Jump logic
              const progress = this.progress();
              // When cactus is near the dino (dino is at x=40)
              // This is a rough estimation of collision avoidance
              if (progress > 0.75 && progress < 0.8 && !isJumping) {
                isJumping = true;
                setDinoState('jumping');
                gsap.to(dinoRef!, {
                  y: -65,
                  duration: 0.35,
                  yoyo: true,
                  repeat: 1,
                  ease: 'power1.out',
                  onComplete: () => {
                    isJumping = false;
                    setDinoState('running_1');
                  }
                });
              }
            },
            onComplete: () => {
              setTimeout(spawnCactus, Math.random() * 2000 + 500);
            }
          }
        );
      };
      
      // Start the game loop when user scrolls near the bottom
      ScrollTrigger.create({
        trigger: groundRef,
        start: 'top 120%', 
        onEnter: () => spawnCactus(),
        once: true
      });
    }
  });

  onCleanup(() => {
    clearInterval(runInterval);
    gsap.killTweensOf(groundRef!);
    gsap.killTweensOf(cactusRef!);
    gsap.killTweensOf(dinoRef!);
  });

  return (
    <div class="relative w-full h-24 overflow-x-clip overflow-y-visible mt-8 border-t border-[var(--border)]">
      {/* Ground */}
      <div 
        ref={groundRef!}
        class="absolute bottom-0 w-full h-[14px] dino-sprite-bg"
        style={{
          "background-image": "url('/dino-sprites/horizon.png')",
          "background-repeat": "repeat-x",
          "background-position": "0 0"
        }}
      />
      
      {/* T-Rex */}
      <img 
        ref={dinoRef!}
        src={`/dino-sprites/trex_${dinoState()}.png`} 
        class="absolute bottom-[2px] left-10 dino-sprite"
        style={{ "z-index": 10 }}
        alt="T-Rex"
      />
      
      {/* Cactus */}
      <img 
        ref={cactusRef!}
        src="/dino-sprites/cactus_large_1.png" 
        class="absolute bottom-[2px] dino-sprite"
        style={{ left: 0, transform: 'translateX(100vw)', "z-index": 5 }}
        alt="Cactus"
      />
    </div>
  );
};
