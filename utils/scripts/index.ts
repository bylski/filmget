export function hideOverflowIf(condition: boolean) {
  if (typeof window !== "undefined") {
    const body: HTMLBodyElement = document.querySelector("body")!;
    if (condition && body.clientWidth > 500) {
      body.style.overflowY = "hidden";
      body.style.width = "calc(100% - 10px)";
    } else {
      body.style.overflowY = "auto";
      body.style.width = "calc(100%)";
    }
  }
}


export const limitStr = (str: string, limit: number) => {

  if (typeof str !== "string") {
    return "";
  }

    let chars;
    let limitedCharArr: string[] = [];
    chars = str.split('');
    let charsLength = chars.length;

    for (let i = 0; i < charsLength - 1; i++) {
      limitedCharArr.push(chars[i]);

      if (charsLength <= limit) {
        charsLength = limit;
        return chars.join('');
      }

      if (limit <= i && chars[i] === " ") {

        if (chars[i-1] === "," || chars[i-1] === ".") {
          limitedCharArr.length = limitedCharArr.length - 2;
          limitedCharArr.push(" ")
        }
        break;
      }
    }

    const limitedString = `${limitedCharArr.join('')}(...)`;
    return limitedString;
}