let items = document.getElementsByClassName("tr")

for (const i of items) {
    i.addEventListener("click", () => {
        i.classList.toggle("show")
    })
}
let root = document.getElementById("root")

root.addEventListener("click", () => {
    for (const elem of items) {
        let array = elem.classList
        if(array.contains("show")){
           elem.classList.remove("show")
        }
    }
})
