import navbarDetector from "./Layout.js"

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

const submitButton = document.getElementById("Submit");

submitButton.addEventListener("click", async e => {
    const workspaceId = document.getElementById("inputWorkspaceId"  ).value
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

    console.log(dataObj);


    document.getElementById("postBoardForm").reset();

    let postHTML;

    postHTML =
        `<div class="projectPost rounded text-left mb-2" id="Post--${dataObj.id}">
                                <div class="rounded p-2" style="border-right: 2.5px inset ${dataObj.color3}; border-bottom: 2.5px inset ${dataObj.color3}; ">`;

            if (dataObj.imageFile != null) {
                postHTML += `<div class="text-center">
                <img src="/Images/${dataObj.imageFile}" alt="user posted image" class="mb-2" style="max-width:80%;">
                </div>`;
            }

    postHTML += `<p class="mb-2">${dataObj.text}</p >`;

            if (dataObj.link != null) {
                postHTML += `<a href="${dataObj.link}" target="_blank" class="mb-2">User Posted Link</a>`;
            }

    postHTML += `<p class="text-right mb-0">- ${dataObj.firstName} ${dataObj.lastName}</p>
                    <div class="text-right">
                        <button class="btn btn-outline-success btn-sm">Edit</button>
                        <button type="submit" class="btn btn-outline-danger btn-sm deleteButton" id="Delete--${dataObj.id}">Delete</button>
                    </div>
                </div>`;
                            
    const contentTarget = document.getElementById("postingBoard");
    contentTarget.innerHTML += postHTML;

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
    autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();

const element = document.querySelector(".darkmode-toggle");

const searchUserLabel = document.getElementById("searchUserLabel");
const postFormLabels = Array.from(document.getElementsByClassName("postFormLabel"));
const messageBoard = document.getElementById("messageBoard");
const messageInputTexts = Array.from(document.getElementsByClassName("messageInputText"));
const jumboHeader = document.getElementById("jumboHeader");
const navbar = navbarDetector();

const isDark = () => {
    return element.classList.contains("darkmode-toggle--white")
}

if (isDark()) {
    searchUserLabel.classList.add("text-white");
    postFormLabels.map(element => element.classList.add("text-white"));
    messageBoard.classList.remove("bg-light");
    messageBoard.classList.add("bg-dark");
    messageInputTexts.map(element => element.classList.add("text-white"))
    jumboHeader.classList.add("bg-dark");
    navbar.classList.remove("bg-primary");
    navbar.classList.add("bg-dark");
}

element.addEventListener("click", e => {
    if (isDark()) {
        searchUserLabel.classList.add("text-white");
        postFormLabels.map(element => element.classList.add("text-white"));
        messageBoard.classList.remove("bg-light");
        messageBoard.classList.add("bg-dark");
        messageInputTexts.map(element => element.classList.add("text-white"))
        jumboHeader.classList.add("bg-dark");
        navbar.classList.remove("bg-primary");
        navbar.classList.add("bg-dark");
    } else {
        searchUserLabel.classList.remove("text-white");
        postFormLabels.map(element => element.classList.remove("text-white"));
        messageBoard.classList.remove("bg-dark");
        messageBoard.classList.add("bg-light");
        messageInputTexts.map(element => element.classList.remove("text-white"))
        jumboHeader.classList.remove("bg-dark");
        navbar.classList.remove("bg-dark");
        navbar.classList.add("bg-primary");
    }
    console.log(element.classList.contains("darkmode-toggle--white"))
})
