let selectedLogo = null;

const qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    data: "",
    qrOptions: { errorCorrectionLevel: "H" },
    backgroundOptions: { color: "#ffffff" },
    dotsOptions: { color: "#000000" },
    imageOptions: { margin: 8 }
});

qrCode.append(document.getElementById("qrResult"));

fetch("assets/logos/logos.json")
    .then(res => res.json())
    .then(files => {
        const container = document.getElementById("logoOptions");

        files.forEach(file => {
            const img = document.createElement("img");
            img.src = `assets/logos/${file}`;

            img.onclick = () => {
                document
                    .querySelectorAll("#logoOptions img")
                    .forEach(i => i.classList.remove("selected"));

                img.classList.add("selected");
                selectedLogo = img.src;
            };

            container.appendChild(img);
        });
    });

function generateQR() {
    const text = document.getElementById("qrText").value.trim();
    const downloadBtn = document.getElementById("downloadBtn");

    if (!text) {
        alert("Please enter text");
        return;
    }

    const config = { data: text };

    if (selectedLogo) config.image = selectedLogo;

    qrCode.update(config);

    setTimeout(() => {
        qrCode.getRawData("png").then(blob => {
            downloadBtn.href = URL.createObjectURL(blob);
            downloadBtn.style.display = "inline-block";
        });
    }, 300);
}
