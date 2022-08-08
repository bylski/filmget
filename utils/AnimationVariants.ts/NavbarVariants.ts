export const navVariants = {
  initial: {
    top: "0",
    backgroundColor: "rgba(15, 15, 15, 0.7)",
    transition: { duration: 0.5 },
  },

  hidden: {
    top: "-11vh",
    transition: { duration: 0.5 },
    backgroundColor: "rgba(15, 15, 15, 1)",
  },
  show: {
    top: "0",
    backgroundColor: "rgba(15, 15, 15, 1)",
    transition: { type: "spring", damping: 20 },
  },
  full: {
    backgroundColor: "rgba(15, 15, 15, 1)",
    transition: { duration: 0.5 },
  },
};
