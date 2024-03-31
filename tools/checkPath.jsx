export default function checkPath(pathname, setEnableScroll) {
  if (/^\/dashboard\/websites\//.test(pathname)) {
    setEnableScroll(true);
  } else {
    setEnableScroll(false);
  }
}
