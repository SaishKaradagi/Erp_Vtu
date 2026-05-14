let sel = document.querySelector("select");

let dev = document.querySelector("#Device");

sel.addEventListener("change", (dets) => {
  dev.textContent = `Selected Device: ${dets.target.value}`;
});
