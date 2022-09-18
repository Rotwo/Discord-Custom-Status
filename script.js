var downloadBtn = document.getElementById('download');

downloadBtn.addEventListener('click', () => {
    window.open("https://raw.githubusercontent.com/Rotwo/Discord-Custom-Status/master/dist/%F0%9F%92%AB%20Discord%20Custom%20Status%20%F0%9F%92%A6%20Setup%201.0.0.exe", "_blank");
});

var gitReleases = document.getElementById('gitReleases');

gitReleases.addEventListener('click', () => {
    console.log('Github Releases');
    window.open('https://github.com/Rotwo/Discord-Custom-Status/releases', "_blank")
});