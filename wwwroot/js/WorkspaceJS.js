import navbarDetector from "./Layout.js"

var options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.3s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: true, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true, // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();

const darkSwitch = document.querySelector(".darkmode-toggle");

var style = document.createElement('style');
style.innerHTML = `
  .darkmode-toggle {
    z-index: 1;
}`;
document.head.appendChild(style);

const submitButton = document.getElementById("Submit");
const searchUserLabel = document.getElementById("searchUserLabel");
const postFormLabels = Array.from(document.getElementsByClassName("postFormLabel"));
const messageBoard = document.getElementById("messageBoard");
const messageInputTexts = Array.from(document.getElementsByClassName("messageInputText"));
const jumboHeader = document.getElementById("jumboHeader");
const navbar = navbarDetector();
const teamMemberList = document.getElementById("teamMemberList");
const userSearchButton = document.getElementById("userSearchButton");
const projectLinkList = document.getElementById("projectLinkList");
const userSearchResults = Array.from(document.getElementsByClassName("userSearchResult"));
const addUserButtons = Array.from(document.getElementsByClassName("addUserButton"));
const tooManyResultsAlert = document.getElementById("tooManyResults");
const editWorkspaceButton = document.getElementById("editWorkspaceButton");

const isDark = () => {
    return darkSwitch.classList.contains("darkmode-toggle--white")
}

if (isDark()) {
    if (searchUserLabel) {
        searchUserLabel.classList.add("text-white");
    }
    postFormLabels.map(element => element.classList.add("text-white"));
    messageBoard.classList.remove("bg-light");
    messageBoard.classList.add("bg-dark");
    messageInputTexts.map(element => element.classList.add("text-white"))
    jumboHeader.classList.add("bg-dark");
    navbar.classList.remove("bg-primary");
    navbar.classList.add("bg-dark");
    teamMemberList.classList.remove("bg-primary");
    teamMemberList.classList.add("bg-dark");
    submitButton.classList.remove("btn-primary");
    submitButton.classList.add("btn-dark");
    if (userSearchButton) {
        userSearchButton.classList.remove("btn-primary");
        userSearchButton.classList.add("btn-dark");
    }
    if (projectLinkList) {
        projectLinkList.classList.remove("bg-light");
        projectLinkList.classList.add("text-white", "bg-transparent");
    }
    userSearchResults.map(element => element.classList.add("text-white"));
    addUserButtons.map(element => element.classList.remove("btn-outline-secondary"));
    addUserButtons.map(element => element.classList.add("btn-outline-info"));
    if (tooManyResultsAlert != null) {
        tooManyResultsAlert.classList.add("text-white");
    }
    if (editWorkspaceButton) {
        editWorkspaceButton.classList.remove("btn-success");
        editWorkspaceButton.classList.add("btn-outline-success");
    }
}

darkSwitch.addEventListener("click", e => {
    if (isDark()) {
        if (searchUserLabel) {
            searchUserLabel.classList.add("text-white");
        }
        postFormLabels.map(element => element.classList.add("text-white"));
        messageBoard.classList.remove("bg-light");
        messageBoard.classList.add("bg-dark");
        messageInputTexts.map(element => element.classList.add("text-white"))
        jumboHeader.classList.add("bg-dark");
        navbar.classList.remove("bg-primary");
        navbar.classList.add("bg-dark");
        teamMemberList.classList.remove("bg-primary");
        teamMemberList.classList.add("bg-dark");
        submitButton.classList.remove("btn-primary");
        submitButton.classList.add("btn-dark");
        if (userSearchButton) {
            userSearchButton.classList.remove("btn-primary");
            userSearchButton.classList.add("btn-dark");
        }
        if (projectLinkList) {
            projectLinkList.classList.remove("bg-light");
            projectLinkList.classList.add("text-white", "bg-transparent");
        }
        userSearchResults.map(element => element.classList.add("text-white"));
        addUserButtons.map(element => element.classList.remove("btn-outline-secondary"));
        addUserButtons.map(element => element.classList.add("btn-outline-info"));
        if (tooManyResultsAlert != null) {
            tooManyResultsAlert.classList.add("text-white");
        }
        if (editWorkspaceButton) {
            editWorkspaceButton.classList.remove("btn-success");
            editWorkspaceButton.classList.add("btn-outline-success");
        }
    } else {
        if (searchUserLabel) {
            searchUserLabel.classList.remove("text-white");
        }
        postFormLabels.map(element => element.classList.remove("text-white"));
        messageBoard.classList.remove("bg-dark");
        messageBoard.classList.add("bg-light");
        messageInputTexts.map(element => element.classList.remove("text-white"))
        jumboHeader.classList.remove("bg-dark");
        navbar.classList.remove("bg-dark");
        navbar.classList.add("bg-primary");
        teamMemberList.classList.remove("bg-dark");
        teamMemberList.classList.add("bg-primary");
        submitButton.classList.remove("btn-dark");
        submitButton.classList.add("btn-primary");
        if (userSearchButton) {
            userSearchButton.classList.remove("btn-dark");
            userSearchButton.classList.add("btn-primary");
        }
        if (projectLinkList) {
            projectLinkList.classList.remove("text-white", "bg-transparent");
            projectLinkList.classList.add("bg-light");
        }
        userSearchResults.map(element => element.classList.remove("text-white"));
        addUserButtons.map(element => element.classList.remove("btn-outline-info"));
        addUserButtons.map(element => element.classList.add("btn-outline-secondary"));
        if (tooManyResultsAlert != null) {
            tooManyResultsAlert.classList.remove("text-white");
        }
        if (editWorkspaceButton) {
            editWorkspaceButton.classList.remove("btn-outline-success");
            editWorkspaceButton.classList.add("btn-success");
        }
    }
})

let allDeleteButtons = document.querySelectorAll(".deleteButton");

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

let allDeleteCommentButtons = document.querySelectorAll(".deleteCommentButton");

allDeleteCommentButtons.forEach(db => {
    db.addEventListener("click", async e => {
        e.preventDefault();
        const [d, id] = e.target.id.split("--");
        await fetch(`/Comments/Delete/${id}`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const comment = document.getElementById(`Comment--${id}`);
        comment.remove();
    })
})

const postBoardForm = document.getElementById("postBoardForm")

let postEditButtons = document.querySelectorAll(".postEditButton")

postEditButtons.forEach(eb => {
    eb.addEventListener("click", async e => {
        e.preventDefault();

        const [edit, id] = e.target.id.split("--");
        const foundPost = await fetch(`/Posts/Index/${id}`).then(res => res.json())

        document.getElementById("inputWorkspaceId").value = foundPost.workspaceId
        document.getElementById("inputText").value = foundPost.text
        document.getElementById("inputLink").value = foundPost.link
        document.getElementById("Submit").type = "hidden"
        document.getElementById("Update").type = "button"


        postBoardForm.scrollIntoView({ behavior: "smooth" });

        document.getElementById("Update").addEventListener("click", async event => {
            const workspaceId = document.getElementById("inputWorkspaceId").value
            const text = document.getElementById("inputText").value
            const image = document.getElementById("inputImage")
            const link = document.getElementById("inputLink").value

            event.preventDefault();
            const formData = new FormData();
            formData.append("workspaceId", workspaceId)
            formData.append('text', text)
            formData.append('image', image.files[0])
            formData.append('link', link)

            const data = await fetch(`/Posts/Edit/${id}`, {
                method: "Put",
                body: formData
            }).then(res => res.json())

            postBoardForm.reset();

            let postHTML;

            postHTML =
                `<div class="rounded p-2" style="border: 1px solid black;
                 -webkit-box-shadow: 3px 3px 4px 0px ${data.color3};
                -moz-box-shadow: 3px 3px 4px 0px ${data.color3};
                box-shadow: 3px 3px 4px 0px ${data.color3};">`;

            if (data.imageFile != null) {
                postHTML += `<div class="text-center">
                <img src="/Images/${data.imageFile}" alt="user posted image" class="mb-2" style="max-width:80%;">
                </div>`;
            }

            if (isDark()) {
                postHTML += `<p class="mb-2 text-white">${data.text}</p >`;
            } else {
                postHTML += `<p class="mb-2">${data.text}</p >`;
            }

            if (data.link != null) {
                postHTML += `<a href="${data.link}" target="_blank" class="mb-2">User Posted Link</a>`;
            }

            if (isDark()) {
                postHTML += `<p class="text-right mb-0 text-white">- ${data.firstName} ${data.lastName}</p>`;
            } else {
                postHTML += `<p class="text-right mb-0">- ${data.firstName} ${data.lastName}</p>`;
            }

            postHTML += `<div class="text-right">
                        <button class="btn btn-outline-success btn-sm postEditButton" id="Edit--${data.id}">Edit</button>
                        <button type="submit" class="btn btn-outline-danger btn-sm deleteButton" id="Delete--${data.id}">Delete</button>
                        <button class="btn btn-outline-warning btn-sm commentButton" id="Comment--${data.id}">Comment</button>
                    </div>`;

            var post = document.getElementById(`Post--${id}`)

            post.innerHTML = postHTML;

            post.scrollIntoView({ behavior: "smooth" });
            document.getElementById("Update").type = "hidden"
            document.getElementById("Submit").type = "Button"

            allDeleteButtons = document.querySelectorAll(".deleteButton");

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
        })
    })
})

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

            const addedUser = document.getElementById(`user--${userId}`);
            addedUser.remove();

            const contentTarget = document.getElementById("teamList")
            contentTarget.innerHTML += 
                `
            <li class="mb-2"><h5 class="font-weight-normal" id="${userObj.id}"></h5></li>
            `

            document.getElementById(userObj.id).innerText = `${userObj.firstName } ${ userObj.lastName }`
        })
    });
}

findListOfUsers();

submitButton.addEventListener("click", async e => {
    const workspaceId = document.getElementById("inputWorkspaceId").value
    const text = document.getElementById("inputText").value
    const image = document.getElementById("inputImage")
    const link = document.getElementById("inputLink").value

    e.preventDefault();
    const formData = new FormData();
    formData.append("workspaceId", workspaceId)
    formData.append('text', text)
    formData.append('image', image.files[0])
    formData.append('link', link)

    
    const dataObj = await fetch("/Posts/Create", {
        method: "Post",
        body: formData
    }).then(res => res.json())

    document.getElementById("postBoardForm").reset();

    let postHTML;

    postHTML =
        `<div class="projectPost rounded text-left mb-2" id="Post--${dataObj.id}">
                                <div class="rounded p-2" style="border: 1px solid black;
                 -webkit-box-shadow: 3px 3px 4px 0px ${dataObj.color3};
                -moz-box-shadow: 3px 3px 4px 0px ${dataObj.color3};
                box-shadow: 3px 3px 4px 0px ${dataObj.color3}; ">`;

            if (dataObj.imageFile != null) {
                postHTML += `<div class="text-center">
                <img src="/Images/${dataObj.imageFile}" alt="user posted image" class="mb-2" style="max-width:80%;">
                </div>`;
            }

            if (isDark()) {
                postHTML += `<p class="mb-2 text-white">${dataObj.text}</p >`;
            } else {
                postHTML += `<p class="mb-2">${dataObj.text}</p >`;
            }

            if (dataObj.link != null) {
                postHTML += `<a href="${dataObj.link}" target="_blank" class="mb-2">User Posted Link</a>`;
            }

            if (isDark()) {
                postHTML += `<p class="text-right mb-0 text-white">- ${dataObj.firstName} ${dataObj.lastName}</p>`;
            } else {
                postHTML += `<p class="text-right mb-0">- ${dataObj.firstName} ${dataObj.lastName}</p>`;
            }

    postHTML += `<div class="text-right">
                        <button class="btn btn-outline-success btn-sm postEditButton" id="Edit--${dataObj.id}">Edit</button>
                        <button type="submit" class="btn btn-outline-danger btn-sm deleteButton" id="Delete--${dataObj.id}">Delete</button>
                        <button class="btn btn-outline-warning btn-sm commentButton" id="Comment--${dataObj.id}">Comment</button>
                    </div>
                </div>`;
                            
    const contentTarget = document.getElementById("postingBoard");
    contentTarget.innerHTML += postHTML;

    const post = document.getElementById(`Post--${dataObj.id}`)
    post.scrollIntoView({ behavior: "smooth" });

    allDeleteButtons = document.querySelectorAll(".deleteButton");

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

    postEditButtons = document.querySelectorAll(".postEditButton")

    postEditButtons.forEach(eb => {
        eb.addEventListener("click", async e => {
            e.preventDefault();

            const [edit, id] = e.target.id.split("--");
            const foundPost = await fetch(`/Posts/Index/${id}`).then(res => res.json())

            console.log(foundPost)
            document.getElementById("inputWorkspaceId").value = foundPost.workspaceId
            document.getElementById("inputText").value = foundPost.text
            document.getElementById("inputLink").value = foundPost.link
            document.getElementById("Submit").type = "hidden"
            document.getElementById("Update").type = "button"


            postBoardForm.scrollIntoView({ behavior: "smooth" });

            document.getElementById("Update").addEventListener("click", async event => {
                const workspaceId = document.getElementById("inputWorkspaceId").value
                const text = document.getElementById("inputText").value
                const image = document.getElementById("inputImage")
                const link = document.getElementById("inputLink").value

                event.preventDefault();
                const formData = new FormData();
                formData.append("workspaceId", workspaceId)
                formData.append('text', text)
                formData.append('image', image.files[0])
                formData.append('link', link)

                const data = await fetch(`/Posts/Edit/${id}`, {
                    method: "Put",
                    body: formData
                }).then(res => res.json())

                postBoardForm.reset();

                let postHTML;

                postHTML =
                    `<div class="rounded p-2" style="border: 1px solid black;
                 -webkit-box-shadow: 3px 3px 4px 0px ${data.color3};
                -moz-box-shadow: 3px 3px 4px 0px ${data.color3};
                box-shadow: 3px 3px 4px 0px ${data.color3};">`;

                if (data.imageFile != null) {
                    postHTML += `<div class="text-center">
                <img src="/Images/${data.imageFile}" alt="user posted image" class="mb-2" style="max-width:80%;">
                </div>`;
                }

                if (isDark()) {
                    postHTML += `<p class="mb-2 text-white">${data.text}</p >`;
                } else {
                    postHTML += `<p class="mb-2">${data.text}</p >`;
                }

                if (data.link != null) {
                    postHTML += `<a href="${data.link}" target="_blank" class="mb-2">User Posted Link</a>`;
                }

                if (isDark()) {
                    postHTML += `<p class="text-right mb-0 text-white">- ${data.firstName} ${data.lastName}</p>`;
                } else {
                    postHTML += `<p class="text-right mb-0">- ${data.firstName} ${data.lastName}</p>`;
                }

                postHTML += `<div class="text-right">
                        <button class="btn btn-outline-success btn-sm postEditButton" id="Edit--${data.id}">Edit</button>
                        <button type="submit" class="btn btn-outline-danger btn-sm deleteButton" id="Delete--${data.id}">Delete</button>
                        <button class="btn btn-outline-warning btn-sm commentButton" id="Comment--${data.id}">Comment</button>
                    </div>`;

                var post = document.getElementById(`Post--${id}`)

                post.innerHTML = postHTML;

                post.scrollIntoView({ behavior: "smooth" });
                document.getElementById("Update").type = "hidden"
                document.getElementById("Submit").type = "Button"

                allDeleteButtons = document.querySelectorAll(".deleteButton");

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
            })
        })
    })
})

let commentButtons = document.querySelectorAll(".commentButton");

commentButtons.forEach(cb => {
    cb.addEventListener("click", async e => {
        e.preventDefault();

        const [com, id] = e.target.id.split("--");
        
        document.getElementById("HideWhileCommenting").classList.add("hidden");
        document.getElementById("inputTextLabel").innerText = "Comment:";
        document.getElementById("CommentButton").type = "button";

        postBoardForm.scrollIntoView({ behavior: "smooth" });

        document.getElementById("CommentButton").addEventListener("click", async event => {
            const comment = document.getElementById("inputText").value;

            event.preventDefault();
            const formData = new FormData();
            formData.append('text', comment)
            formData.append('postId', id)

            const dataObj = await fetch("/Comments/Create", {
                method: "Post",
                body: formData
            }).then(res => res.json());

            console.log(dataObj);

            let commentHTML;

            commentHTML = `<div class="p-2 rounded w-75 align-content-right" id="Comment--${dataObj.id}" style="border: 1px solid black; border-top: none; margin-left: 25%;
                            -webkit-box-shadow: 3px 3px 4px 0px ${dataObj.color1};
                            -moz-box-shadow: 3px 3px 4px 0px ${dataObj.color1};
                            box-shadow: 3px 3px 4px 0px ${dataObj.color1}">`

            if (isDark()) {
                commentHTML += `<p class="text-right text-white mb-1">${dataObj.text}</p>
                            <p class="text-right text-white mb-0">- ${dataObj.firstName} ${dataObj.lastName}</p>`
            } else {
                commentHTML += `<p class="text-right">${dataObj.text}</p>
                            <p class="text-right mb-0">- ${dataObj.firstName} ${dataObj.lastName}</p>`
            }

                            

                commentHTML += `<div class="text-right">
                                <button class="btn btn-outline-danger btn-sm deleteCommentButton" id="Delete--${dataObj.id}">Delete</button>
                            </div>
                           </div>`

            document.getElementById(`Post--${id}`).innerHTML += commentHTML

            document.getElementById(`Post--${id}`).scrollIntoView({ behavior: "smooth" });

            postBoardForm.reset();

            document.getElementById("HideWhileCommenting").classList.remove("hidden");
            document.getElementById("inputTextLabel").innerText = "Text:";
            document.getElementById("CommentButton").type = "hidden";

            allDeleteCommentButtons = document.querySelectorAll(".deleteCommentButton");

            allDeleteCommentButtons.forEach(db => {
                db.addEventListener("click", async e => {
                    e.preventDefault();
                    const [d, id] = e.target.id.split("--");
                    await fetch(`/Comments/Delete/${id}`, {
                        method: "Post",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    const comment = document.getElementById(`Comment--${id}`);
                    comment.remove();
                })
            })
        })
    })
})