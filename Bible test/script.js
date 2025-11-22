// JavaScript 邏輯 - script.js
const questions = [
    {
        q: "那本書是摩西五經",
        options: ["詩篇", "以賽亞", "創世紀"],
        correctIndex: 2,
        highlight: "摩西為作者的聖經經卷稱作摩西五經，包含創世記、出埃及記、利未記、民數記、申命記。"
    },
    {
        q: "下列哪一項不是聖靈的果子？",
        options: ["溫柔", "節制", "批判"],
        correctIndex: 2,
        highlight: "聖靈的果子彰顯生命的改變，而批判是肉體反應，不是聖靈引導的表現。"
    },
    {
        q: "聖靈的果子與恩賜最大的不同在於？",
        options: ["恩賜是能力，果子是品格", "恩賜是恩典，果子是獎勵", "恩賜是訓練成果"],
        correctIndex: 0,
        highlight: "恩賜是服事的能力；果子是品格的成熟。兩者結合，才是有力量又有見證的信仰生命。"
    },
    {
        q: "當一個人被聖靈充滿時，最明顯的表現是什麼？",
        options: ["說方言", "愛人如己", "行神蹟"],
        correctIndex: 1,
        highlight: "愛的流露才是聖靈充滿的真正證據，因為神就是愛。"
    },
    {
        q: "想培養聖靈的果子，最重要的行動是？",
        options: ["更多服事", "常常禱告", "與主同行、順服祂的帶領"],
        correctIndex: 2,
        highlight: "果子不是靠努力長出來的，而是與聖靈同工、讓祂在我們裡面動工的結果。"
    }
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let userName = "";
let answered = false;

const coverPage = document.getElementById('cover-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackArea = document.getElementById('feedback-area');
const feedbackText = document.getElementById('feedback-text');
const nextButton = document.querySelector('.next-button');
const nameInput = document.getElementById('name-input');
const progressText = document.getElementById('progress-text');

// 啟動測驗
function startQuiz() {
    userName = nameInput.value.trim() || "弟兄姊妹";
    
    coverPage.style.display = 'none';
    quizPage.style.display = 'block';
    
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    loadQuestion();
}

// 載入當前問題
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const currentQ = questions[currentQuestionIndex];
    
    progressText.textContent = `第 ${currentQuestionIndex + 1} 題 / 共 ${questions.length} 題`;
    questionText.textContent = currentQ.q;
    optionsContainer.innerHTML = ''; // 清空舊選項
    feedbackArea.style.display = 'none'; // 隱藏回饋區
    nextButton.disabled = true; // 禁用下一題按鈕
    nextButton.textContent = '下一題 >';
    answered = false;

    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = String.fromCharCode(65 + index) + ". " + option; // A. B. C.
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// 檢查答案
function checkAnswer(selectedIndex) {
    if (answered) return; // 避免重複作答
    answered = true;
    
    const currentQ = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-button');

    buttons.forEach((button, index) => {
        button.classList.add('disabled'); // 禁用所有按鈕
        if (index === currentQ.correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('wrong');
        }
    });

    if (selectedIndex === currentQ.correctIndex) {
        correctAnswersCount++;
    }

    // 顯示屬靈亮點
    feedbackText.innerHTML = `<strong>🎯 屬靈亮點：</strong> ${currentQ.highlight}`;
    feedbackArea.style.display = 'block';
    nextButton.disabled = false;
}

// 進入下一題
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// 顯示結果頁
function showResult() {
    quizPage.style.display = 'none';
    resultPage.style.display = 'block';

    const successView = document.getElementById('success-view');
    const failureView = document.getElementById('failure-view');
    
    const isSuccess = correctAnswersCount >= 3;

    if (isSuccess) {
        successView.style.display = 'block';
        failureView.style.display = 'none';
        document.getElementById('result-name-success').textContent = userName;
        document.getElementById('correct-count-success').textContent = correctAnswersCount;
    } else {
        successView.style.display = 'none';
        failureView.style.display = 'block';
        document.getElementById('result-name-failure').textContent = userName;
        document.getElementById('correct-count-failure').textContent = correctAnswersCount;
    }
}

// 分享到小組
function shareToGroup() {
    const isSuccess = correctAnswersCount >= 3;
    const linkPlaceholder = "https://your-github-pages-link.com"; // 請替換成您實際的 GitHub Pages 連結
    let message = "";
    
    if (isSuccess) {
        message = `🎉 恭喜 ${userName} 在【聖經挑戰賽】中闖關成功！\n\n🏆 獲得「屬靈學徒」徽章！\n✅ 答對 ${correctAnswersCount} 題，願我的生命結出更多愛與品格的果子！\n\n👉 快來挑戰吧！${linkPlaceholder}`;
    } else {
        message = `💪 ${userName} 完成了【聖經挑戰賽】！\n\n🎯 答對 ${correctAnswersCount} 題，繼續加油！下次一定成功！\n\n📖 我的話語是你腳前的燈。一起多讀經，快來挑戰！${linkPlaceholder}`;
    }
    
    // 嘗試使用 navigator.clipboard 複製
    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
            alert('分享訊息已複製到剪貼簿，請貼上到小組群組！');
        }).catch(err => {
            console.error('無法複製文字: ', err);
            alert('無法自動複製，請手動複製以下訊息：\n\n' + message);
        });
    } else {
        // 備用方案
        alert('請手動複製以下訊息：\n\n' + message);
    }
}