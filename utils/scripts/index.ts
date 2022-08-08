
export function hideOverflowIf(condition: boolean) {
  if (typeof window !== "undefined") {
    const body: HTMLBodyElement = document.querySelector("body")!;
    if (condition) {
      body.style.overflowY = "hidden";
      body.style.marginRight = "10px"
    } else {
      body.style.overflowY = "auto";
      body.style.marginRight = "0px"
    }
  }
}