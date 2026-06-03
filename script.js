let data;
let currentMarkdown = "";

function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function loadData() {
    const response = await fetch("./data.json");
    data = await response.json();
}

function roll() {
    const era = pick(data.eras);
    const workplace = pick(data.workplaces);
    const motif = pick(data.motifs);
    const stream = pick(data.streams);

    currentMarkdown =
        `# ATC-XXX

- 年代：${era}
- 職場：${workplace}
- モチーフ：${motif}
- 配信：${stream}

## コンセプト

${era}の${workplace}を舞台にした
${motif}モチーフのVTuber。`;

    document.getElementById("result").textContent =
        currentMarkdown;
}

async function copyMarkdown() {
    if (!currentMarkdown) return;

    await navigator.clipboard.writeText(
        currentMarkdown
    );

    alert("コピーしました");
}

async function init() {
    await loadData();

    document
        .getElementById("rollButton")
        .addEventListener("click", roll);

    document
        .getElementById("copyButton")
        .addEventListener("click", copyMarkdown);
}

init();