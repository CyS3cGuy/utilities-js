const tds = document.querySelectorAll("#learn-hover td");
const ths = document.querySelectorAll("#learn-hover th");
const colLen = ths.length;

ths.forEach((th, thInd) => {
    th.addEventListener("mouseover", () => {
        th.classList.add("hover");

        const tdsArr = Array.from(tds).filter((curr, ind) => ind % colLen === thInd);
        tdsArr.forEach(each => each.classList.add("hover"));
    });

    th.addEventListener("mouseout", () => {
        th.classList.remove("hover");

        const tdsArr = Array.from(tds).filter((curr, ind) => ind % colLen === thInd);
        tdsArr.forEach(each => each.classList.remove("hover"));
    });
})

tds.forEach((td, tdInd) => {
    td.addEventListener("mouseover", ()=>{
        const tdsArr = Array.from(tds).filter((curr, ind) => ind % colLen === tdInd % colLen);
        tdsArr.forEach(each => each.classList.add("hover"));

        Array.from(ths).find((th, ind) => ind === tdInd % colLen).classList.add("hover");
    });

    td.addEventListener("mouseout", ()=>{
        const tdsArr = Array.from(tds).filter((curr, ind) => ind % colLen === tdInd % colLen);
        tdsArr.forEach(each => each.classList.remove("hover"));

        Array.from(ths).find((th, ind) => ind === tdInd % colLen).classList.remove("hover");
    });
}) 

