//定数を定義する。自由に変えて良い。
const RANGE = "0123456789"; //この中から正答の文字が選ばれる。
const LENGTH = 3; //何文字でヌメロンをやるか。

//よく使う関数を定義する。
const append = (parent, childTagName, text, className) => {
    const child = document.createElement(childTagName);
    child.appendChild(document.createTextNode(text));
    child.classList.add(className);
    parent.appendChild(child);
}

//答えの候補を用意する。
let answers = [...RANGE];

//メイン部分のHTMLを作成する。
for (const answer of answers) append(document.getElementsByTagName("main")[0], "div", answer, "chars");

//正答を決める。
for (let i = answers.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
}
answers = answers.slice(0,3);

//ユーザーに選択してもらう。
let userSelectChars = [];
const output = document.getElementsByTagName("output")[0];
for (const charElm of document.getElementsByClassName("chars")) {
    charElm.addEventListener("click", () => {
        append(output, "span", charElm.innerHTML)
        
        userSelectChars.push(charElm.innerHTML);
        if (userSelectChars.length === LENGTH) {
            //eatとbiteを求める。
            let eat = 0, bite = 0;
            for (let i = 0; i < LENGTH; i++) {
                if (userSelectChars[i] === answers[i]) eat++;
                if (answers.includes(userSelectChars[i])) bite++;
            }
            bite -= eat;
            
            //結果をHTMLに書く。
            const tr = document.createElement("tr");
            append(tr, "td", userSelectChars);
            append(tr, "td", eat);
            append(tr, "td", bite);
            document.getElementById("result").appendChild(tr);
            
            //合っていたら終わる。
            if (eat === 3) alert("にゃ…… ぼ、ぼくはねこだにゃ!　🐱 (メッセージとかは任せます。)");

            //リセットする。
            output.innerHTML = "";
            userSelectChars = [];
        }
    });
}

//消すボタンを作る。
document.getElementById("delete").addEventListener("click" ,() => {
    output.innerHTML = "";
    userSelectChars = [];
});