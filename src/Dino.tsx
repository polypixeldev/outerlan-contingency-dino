import { useEffect, useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";

function Dino() {
  const wrapperRef = useRef();
  const dinoRef = useRef();
  const obsRef = useRef();
  const explosionRef = useRef();
  const [uptime, setUptime] = useState(0);

  const obs = [
    "./images/opnsense.png",
    "./images/authentik.png",
    "./images/openwrt.png",
    "./images/dell.png",
    "./images/linksys.png",
    "./images/proxmox.png",
    "./images/ruckus.png",
  ];

  const [opnSenseProps, opnSenseApi] = useSpring(
    () => ({
      from: {
        marginRight: "0%",
      },
      to: {
        marginRight: "100%",
      },
      onRest: (r, api) => {
        if (obsRef.current) {
          obsRef.current.src = obs[Math.floor(Math.random() * obs.length)];
        }

        api.start({
          from: {
            marginRight: "0%",
          },
          to: {
            marginRight: "100%",
          },
        });
      },
      config: {
        duration: 2000,
      },
    }),
    []
  );

  const [dinoProps, dinoApi] = useSpring(() => ({
    from: {
      bottom: 0,
    },
    config: {
      duration: 200,
    },
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((u) => u + 1);
    }, 1000);

    const listener = (e) => {
      if (e.key === " ") {
        dinoApi.start({
          to: {
            bottom: 1,
          },
          config: {
            duration: 1,
          },
          onRest: () => {
            dinoApi.start({
              to: {
                bottom: 150,
              },
              config: {
                duration: 300,
              },
              onRest: () => {
                dinoApi.start({
                  to: {
                    bottom: 0,
                  },
                });
              },
            });
          },
        });
      }
    };

    document.addEventListener("keydown", listener);

    function elementsOverlap(el1, el2) {
      const domRect1 = el1.getBoundingClientRect();
      const domRect2 = el2.getBoundingClientRect();

      return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
      );
    }

    explosionRef.current.style.display = "none";

    const overInterval = setInterval(() => {
      const overlap = elementsOverlap(dinoRef.current, obsRef.current);

      if (overlap) {
        setUptime(0);
        explosionRef.current.style.display = "block";
        setTimeout(() => {
          explosionRef.current.style.display = "none";
        }, 500);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(overInterval);
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        background: "url('./images/server.jpg')",
      }}
    >
      <div className="h-screen flex flex-col justify-center items-start">
        <a.img
          ref={dinoRef}
          src="./images/dino.png"
          style={dinoProps}
          alt="Dino"
          className="relative ml-5 h-20 w-20"
        />
        <a.img
          src="./images/explosion.gif"
          ref={explosionRef}
          className="h-24 w-24 absolute"
        />
        <hr className="w-screen h-1 bg-black" />
      </div>
      <div className="fixed font-bold text-2xl left-0 top-0 m-2">
        <p>OuterLAN Contingency Dino</p>
      </div>
      <div className="fixed font-bold text-xl right-0 top-0 m-2">
        <p>Uptime (seconds): {uptime}</p>
      </div>
      <div className="fixed top-0 w-screen h-screen flex flex-col justify-center items-end">
        <a.img
          ref={obsRef}
          src="./images/opnsense.png"
          className="w-16 h-16"
          style={opnSenseProps}
        />
      </div>
    </div>
  );
}

export default Dino;
