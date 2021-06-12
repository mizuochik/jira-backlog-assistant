const LOADING_INTERVAL_MS = 1000;

let loadSortingButton = function () {
        let backlogHeaders = document.querySelectorAll(".ghx-backlog-header");
        if (backlogHeaders.length <= 0) {
                setTimeout(loadSortingButton, LOADING_INTERVAL_MS);
                return
        }
        backlogHeaders.forEach(function (backlogHeader) {
                let sortButton = document.createElement("button");
                sortButton.setAttribute("class", "jba-sorting-button");
                sortButton.appendChild(document.createTextNode("Sort by Epic"));
                backlogHeader.appendChild(sortButton);
        });
};
loadSortingButton();
