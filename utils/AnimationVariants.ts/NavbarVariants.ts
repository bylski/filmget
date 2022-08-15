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

export const navMenuVariants = {
  hidden: {
    transition: { type: "linear" },
    borderBottom: "none",
    top: "4.6rem",
    height: "0px",
  },
  show: {
    transition: { type: "linear", staggerChildren: 0.1, delayChildren: 0.1 },
    top: "4.6rem",
    height: "fit-content",
    display: "flex",
    borderBottom: "1px solid #ff006e",
  },
};

export const navLinksVariants = {
  hidden: { opacity: 0, transition: { duration: 0.25, type: "linear" } },
  show: { opacity: 1 },
};

