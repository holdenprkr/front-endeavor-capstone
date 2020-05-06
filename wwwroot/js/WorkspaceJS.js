const allDeleteButtons = document.querySelectorAll(".deleteButton");

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

const searchButton = document.getElementById("userSearchButton")

const findListOfUsers = () => {
    
    const allAddUserButtons = document.querySelectorAll(".addUserButton");
    console.log(allAddUserButtons)
    allAddUserButtons.forEach(aub => {
        aub.addEventListener("click", async e => {
    var userObj;
            console.log("add button clicked")
            const [a, spaceId, userId] = e.target.id.split("--");
            await fetch(`/UserWorkspaces/CreateTeam/?workspaceId=${spaceId}&userId=${userId}`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
                .then(data => userObj = data)
                .then(() => console.log(userObj));

            const addedUser = document.getElementById(`user--${userId}`);
            addedUser.remove();

            const contentTarget = document.getElementById("teamList")
            contentTarget.innerHTML += 
            `
            <li class="mb-2"><h5 class="font-weight-normal">${userObj.firstName} ${userObj.lastName}</h5></li>
            `
        })
    });
}

findListOfUsers();


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