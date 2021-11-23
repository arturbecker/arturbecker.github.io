function openCard(event) {
    //const tileId = event.target.id;
    //const card = document.getElementById(tileId + "Card");
    //const tile = document.getElementById("testCard");
    const tile = document.getElementById(event.target.id);
    //console.log(tile)
    const rect = tile.getBoundingClientRect();
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    const availableHorizontalSpace = vw - rect.left
    const availableVerticalSpace = vh - rect.top
    console.log(vw, vh, availableHorizontalSpace, availableVerticalSpace)

    const clamp_css_w = [320, 0.64, 400] // Replace this number with the .css value for --card-width and --card-height
    const clamp_css_h = [405, 0.8, 510]

    //if (clamp_css[1]*vw < clamp_css[0] || clamp_css[1]*vw > clamp_css[2]) {
    //    console.log(clamp_css[1]*vw, "is outside the clamping bounds")
    //}

    var card_width = clamp_css_w[1] * vw

    if (clamp_css_w[1] * vw < clamp_css_w[0]) {
        //console.log(clamp_css_w[1]*vw, "is lower than the clamping bounds")
        card_width = clamp_css_w[0]
    } else if (clamp_css_w[1] * vw > clamp_css_w[2]) {
        //console.log(clamp_css_w[1]*vw, "is higher than the clamping bounds")
        card_width = clamp_css_w[2]
    }

    var card_height = clamp_css_h[1] * vw

    if (clamp_css_h[1] * vw < clamp_css_h[0]) {
        //console.log(clamp_css_h[1]*vw, "is lower than the clamping bounds")
        card_height = clamp_css_h[0]
    } else if (clamp_css_h[1] * vw > clamp_css_h[2]) {
        //console.log(clamp_css_h[1]*vw, "is higher than the clamping bounds")
        card_height = clamp_css_h[2]
    }

    console.log("card_width:", card_width, "card_height:", card_height)

    cardLeft = Math.min(0, availableHorizontalSpace - card_width - 1); // Note that we subtract one extra pixel to account for (I think) rounding errors
    cardTop = Math.min(0, availableVerticalSpace - card_height - 1);

    console.log("av. w:", availableHorizontalSpace, "av. h:", availableVerticalSpace, cardLeft, cardTop)

    tile.classList.add("card");
    tile.style.zIndex = "1000"
    tile.style.transform = "translateX(" + cardLeft + "px) translateY(" + cardTop + "px)"
    //tile.style.transform = ;

    // Make the tile clickable when it's in card form:
    // We use a small delay so that it doesn't open instantly
    setTimeout(function () {
        tile.setAttribute("onClick", "goToProject(event)");;
    }, 1);

}

function closeCard(event) {
    //const tile = document.getElementById("testCard");
    const tile = document.getElementById(event.target.id);
    //console.log(tile)
    if (tile.classList.contains("hero")) {
        //console.log("Hero class is applied")
        return
    }
    tile.classList.remove("card");
    tile.style.zIndex = "0"
    tile.style.transform = "translateX(0px) translateY(0px)"

    // Remove the onClick event when the card closes:
    tile.removeAttribute("onClick");
}

function goToProject(event) {
    //var tile = ''

    //if (event.path[0].localName == 'img') {
    //console.log("Clicked on the image")
    //    tile = document.getElementById(event.path[1].id);
    //} else {
    //console.log("Clicked on the div")
    //    tile = document.getElementById(event.target.id);
    //}

    const tile = document.getElementById(event.currentTarget.id);

    tile.classList.add("hero");
    tile.style.transform = "translateX(0px) translateY(0px)";
    tile.style.zIndex = "1000"

    // We scroll up for mobile reasons
    window.scrollTo(0, 0);

    // We need to unset the position of the graph
    // We will also reduce it's opacity so that the effect
    // is less jarring
    const graph = document.getElementById("graph");

    const chart = document.getElementsByClassName("chart")
    //console.log(chart)
    for (var i = 0; i < chart.length; i++) {
        chart[i].style.opacity = "0";
    }

    //graph.style.position = "unset"

    const aside = document.getElementsByTagName("aside")[0];
    //console.log(aside);
    //aside.style.opacity = "0";
    //aside.style.width = "0px";
    //aside.style.padding = "0px";
    aside.classList.add("hidden")
    //setTimeout(function() {
    //    aside.style.display = "none";
    //}, 300);
    //history.pushState("inova.html");
    //history.go(1);
    //console.log(history)

    setTimeout(function () {
        window.location.href = tile.id + ".html";
    }, 350);
    //clearProjects()
}

function clearProjects() {
    // Closes the hero and undo everything goToProject does
    const opened = document.getElementsByClassName("hero")[0];
    console.log(opened);
    //opened.classList.remove("hero")
    //setTimeout(function () {
    opened.classList.remove("hero");
    opened.classList.remove("card");

    const chart = document.getElementsByClassName("chart");

    for (var i = 0; i < chart.length; i++) {
        chart[i].style.opacity = "1";
    }

    const aside = document.getElementsByTagName("aside")[0];

    aside.classList.remove("hidden")
    //}, 350);
    //tiles.forEach(element => console.log(element));
}

window.addEventListener("unload", function (event) {
    clearProjects()
    console.log("unloaded page")
});