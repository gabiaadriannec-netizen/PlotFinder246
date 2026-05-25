async function register() {

    const data = {

        email:
            document.getElementById("email").value,

        surname:
            document.getElementById("surname").value,

        givenName:
            document.getElementById("givenName").value,

        middleInitial:
            document.getElementById("middleInitial").value,

        contactNumber:
            document.getElementById("contactNumber").value,

        address:
            document.getElementById("address").value,

        password:
            document.getElementById("password").value
    };

    await fetch("/api/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    alert("Registered Successfully");

    window.location.href = "login.html";
}

async function login() {

    const data = {

        email:
            document.getElementById("email").value,

        password:
            document.getElementById("password").value
    };

    const response = await fetch(
        "/api/auth/login",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        }
    );

    const result =
        await response.json();

    /*
        LOGIN FAILED
    */

    if(!response.ok){

        alert(result.message);

        return;

    }

    /*
        LOGIN SUCCESS
    */

    localStorage.setItem(
        "token",
        result.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(result.user)
    );

    alert("Login Successful");

    window.location.href =
        "index.html";
}

async function reservePlot() {

    const plotId =
        localStorage.getItem("selectedPlot");

    const data = {

        surname:
            document.getElementById("surname").value,

        givenName:
            document.getElementById("givenName").value,

        middleName:
            document.getElementById("middleName").value
    };

    await fetch(`/api/plots/reserve/${plotId}`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    alert("Reserved Successfully");

    window.location.href =
        "cemetery.html";
}

function goReserve(plotId) {

    localStorage.setItem(
        "selectedPlot",
        plotId
    );

    window.location.href =
        "reserve.html";
}

function switchMap() {

    const map =
        document.getElementById("mapFrame");

    if (map.src.includes("!5e1")) {

        map.src =
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4391.876098262231!2d120.7563620527437!3d14.190422823852195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd855796d9f289%3A0x98a0e045e480d8ad!2sOur%20Lady%20of%20the%20Way%20Eternal%20Garden!5e0!3m2!1sen!2sph!4v1779540497393!5m2!1sen!2sph";

    } else {

        map.src =
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4391.876098262231!2d120.7563620527437!3d14.190422823852195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd855796d9f289%3A0x98a0e045e480d8ad!2sOur%20Lady%20of%20the%20Way%20Eternal%20Garden!5e1!3m2!1sen!2sph!4v1779540497393!5m2!1sen!2sph";

    }
}

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".hidden-plots");

    sections.forEach(section => {

        section.style.display = "none";

    });

    document.getElementById(sectionId)
        .style.display = "block";
}

async function loadPlots() {

    const response =
        await fetch("/api/plots");

    const plots =
        await response.json();

    const container =
        document.getElementById("plotContainer");

    if (!container) return;

    container.innerHTML = "";

    plots.forEach(plot => {

        const div =
            document.createElement("div");

        /*
            MAUSOLEUM
            .plot-box
        */

        if (
            plot.plotNumber.startsWith("M")
        ) {

            div.classList.add("plot-box");

        }

        /*
            IN-GROUND + ROOFED
            .plot-box2
        */

        else {

            div.classList.add("plot-box2");

        }

        /*
            STATUS
        */

        if (
            plot.status === "reserved"
        ) {

            div.classList.add("reserved");

        }

        else if (
            plot.status === "occupied"
        ) {

            div.classList.add("occupied");

        }

        else {

            div.classList.add("unoccupied");

        }

        /*
            INITIALS
        */

        div.innerHTML =
            plot.reservedBy?.initials || "";

        /*
            MAUSOLEUM LEFT
        */

        if (plot.plotNumber === "M1") {

            div.style.top = "80px";
            div.style.left = "50px";

        }

        if (plot.plotNumber === "M2") {

            div.style.top = "450px";
            div.style.left = "50px";

        }

        if (plot.plotNumber === "M3") {

            div.style.top = "809px";
            div.style.left = "50px";

        }

        /*
            MAUSOLEUM RIGHT
        */

        if (plot.plotNumber === "MR1") {

            div.style.top = "80px";
            div.style.right = "60px";

        }

        if (plot.plotNumber === "MR2") {

            div.style.top = "450px";
            div.style.right = "60px";

        }

        if (plot.plotNumber === "MR3") {

            div.style.top = "809px";
            div.style.right = "60px";

        }

        /*
            IN-GROUND
        */

        if (plot.plotNumber === "G1") {

            div.style.top = "345px";
            div.style.left = "385px";

        }

        if (plot.plotNumber === "G2") {

            div.style.top = "345px";
            div.style.left = "510px";

        }

        /*
            ROOFED
        */

        if (plot.plotNumber === "R1") {

            div.style.top = "475px";
            div.style.right = "486px";

        }

        if (plot.plotNumber === "R2") {

            div.style.top = "475px";
            div.style.right = "360px";

        }

        if (plot.plotNumber === "R3") {

            div.style.top = "615px";
            div.style.right = "486px";

        }

        if (plot.plotNumber === "R4") {

            div.style.top = "615px";
            div.style.right = "360px";

        }

        if (plot.plotNumber === "R5") {

            div.style.top = "750px";
            div.style.right = "486px";

        }

        if (plot.plotNumber === "R6") {

            div.style.top = "750px";
            div.style.right = "360px";

        }

        /*
            CLICKABLE
        */

        div.onclick = () => {

            if (
                plot.status === "unoccupied"
            ) {

                goReserve(
                    plot.plotNumber
                );

            }

        };

        container.appendChild(div);

    });

}

loadPlots();