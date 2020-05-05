﻿const allDeleteButtons = document.querySelectorAll(".deleteButton");

allDeleteButtons.forEach(db => {
    db.addEventListener("click", async e => {

        e.preventDefault();
        const [d, id] = e.target.id.split("--");
        await fetch(`/Posts/Delete/${id}`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const post = document.getElementById(`Post--${id}`);
        post.remove();
    })
})

//const submitButton = document.getElementById("Submit");

//submitButton.addEventListener("click", async e => {
//    var postView = jQuery.data('@(Model.PostViewModel)')


//    console.log(postView)
//    console.log("buttonClicked")
//    e.preventDefault();
//    fetch("/Posts/Create", {
//        method: "Post",
//        headers: {
//            "Content-Type": "application/json"
//        },
//        body: JSON.stringify(postView)
//    })

//    fetch(`/Workspaces/Details/@(Model.Id)`)
//    })