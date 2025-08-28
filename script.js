// マッキン先生クイズの問題データ
const quizData = [
    {
        question: "マッキン先生の一番好きな食べ物は？",
        choices: ["ハンバーガー", "寿司", "タコス", "果物"],
        correctAnswer: 0  // 仮の正解（要確認）
    },
    {
        question: "マッキン先生の研究室名に含まれる語は？",
        choices: ["海洋", "宇宙", "知能情報", "法律"],
        correctAnswer: 2  // 仮の正解（要確認）
    },
    {
        question: "マッキン先生の大学での役職に該当するものは？",
        choices: ["学生課主任", "総合研究所長", "学長", "図書館長"],
        correctAnswer: 1  // 仮の正解（要確認）
    },
    {
        question: "マッキン先生の研究テーマの応用先として正しいものは？",
        choices: ["ごみ焼却炉の制御", "歴史年号暗記", "ピアノ演奏", "書道"],
        correctAnswer: 0  // 仮の正解（要確認）
    },
    {
        question: "マッキン先生が保有する特許の名称はどれ？",
        choices: [
            "太陽光発電パネルの角度自動調整装置及び方法",
            "メッセージキュー管理装置及びメッセージキュー管理方法",
            "自動車用燃費最適化エンジン制御システム",
            "ウェアラブル健康モニタリングデバイス及びその制御方法"
        ],
        correctAnswer: 1  // quiz.txtに正解と記載あり
    }
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let maxQuestions = 5;
let selectedAnswer = -1;

function startQuiz() {
    score = 0;
    totalQuestions = 0;
    currentQuestionIndex = 0;
    selectedAnswer = -1;
    
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('choices').style.display = 'grid';
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('feedback').textContent = '';
    document.getElementById('result').style.display = 'none';
    
    showQuestion();
    updateScore();
}

function showQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResult();
        return;
    }
    
    const currentQuestion = quizData[currentQuestionIndex];
    
    // 問題文を表示
    document.getElementById('question').textContent = currentQuestion.question;
    
    // 選択肢を表示
    for (let i = 0; i < 4; i++) {
        const choiceBtn = document.getElementById(`choice${i}`);
        choiceBtn.textContent = currentQuestion.choices[i];
        choiceBtn.className = 'choice-btn';
        choiceBtn.disabled = false;
    }
}

function selectAnswer(index) {
    if (selectedAnswer !== -1) return; // 既に選択済み
    
    selectedAnswer = index;
    totalQuestions++;
    
    const currentQuestion = quizData[currentQuestionIndex];
    
    // 全ボタンを無効化
    for (let i = 0; i < 4; i++) {
        document.getElementById(`choice${i}`).disabled = true;
    }
    
    // 正解・不正解を表示
    const choiceBtn = document.getElementById(`choice${index}`);
    const correctBtn = document.getElementById(`choice${currentQuestion.correctAnswer}`);
    const feedback = document.getElementById('feedback');
    
    if (index === currentQuestion.correctAnswer) {
        score++;
        choiceBtn.className = 'choice-btn correct';
        feedback.textContent = '正解！';
        feedback.className = 'feedback correct';
    } else {
        choiceBtn.className = 'choice-btn incorrect';
        correctBtn.className = 'choice-btn correct';
        feedback.textContent = `不正解。正解は「${currentQuestion.choices[currentQuestion.correctAnswer]}」でした。`;
        feedback.className = 'feedback incorrect';
    }
    
    updateScore();
    
    // 最後の問題かチェック
    if (currentQuestionIndex >= quizData.length - 1) {
        showResult();
    }
}

function nextQuestion() {
    if (selectedAnswer === -1) {
        alert('選択肢を選んでください！');
        return;
    }
    
    if (currentQuestionIndex >= quizData.length - 1) {
        showResult();
        return;
    }
    
    currentQuestionIndex++;
    selectedAnswer = -1;
    document.getElementById('feedback').textContent = '';
    showQuestion();
}

function updateScore() {
    document.getElementById('score').textContent = `スコア: ${score} / ${totalQuestions}`;
}

function showResult() {
    document.getElementById('choices').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    
    const result = document.getElementById('result');
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let message = `クイズ終了！<br>${totalQuestions}問中${score}問正解 (${percentage}%)`;
    
    // スコアに応じたメッセージを追加
    if (percentage === 100) {
        message += '<br><br>完璧です！マッキン先生博士ですね！';
    } else if (percentage >= 80) {
        message += '<br><br>素晴らしい！マッキン先生のことをよく知っていますね！';
    } else if (percentage >= 60) {
        message += '<br><br>良い結果です！もう少しマッキン先生について勉強してみましょう。';
    } else {
        message += '<br><br>もっとマッキン先生について学びましょう！';
    }
    
    result.innerHTML = message;
    result.style.display = 'block';
}