
export function hideOverflowIf(condition: boolean) {
  if (typeof window !== "undefined") {
    const body: HTMLBodyElement = document.querySelector("body")!;
    if (condition && body.clientWidth > 500) {
      body.style.overflowY = "hidden";
      body.style.width = "calc(100% - 10px)"
    } else {
      body.style.overflowY = "auto";
      body.style.width = "calc(100%)"
    }
  }
}