

export const modalVariants = {
    backdropEnter: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    backdropFade: {
      opacity: 0,
    },
    modalHidden: (position: { x: number; y: number }) => ({
      scale: 0.1,
      top: `calc((-50vh) + ${position.y}px)`,
      left: `calc((-50vw) + ${position.x}px)`,
      opacity: 0,
      transition: {
        duration: 0.45,
      },
    }),
    modalEnter: {
      opacity: 1,
      top: 0,
      left: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };
  