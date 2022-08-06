

export const navVariants = {
  initial: {
    top: "0",
    backgroundColor: "rgba(15, 15, 15, 0.6)",
    transition: { duration: 0.5 },
  },

  hidden: {
    top: "-11vh",
    transition: { duration: 0.5 },
    backgroundColor: "rgba(15, 15, 15, 1)",
  },
  full: {
    top: "0",
    backgroundColor: "rgba(15, 15, 15, 1)",
    transition: { duration: 0.1, type: "spring", damping: 20},
  },
};