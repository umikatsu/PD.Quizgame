document.addEventListener("DOMContentLoaded", () => {
    /* ================================== */
    /* I. 画面遷移用 DOM 要素の定義 */
    /* ... (変更なし) ... */
    /* ================================== */
    const topScreen = document.getElementById("top-screen");
    const selectionScreen = document.getElementById("selection-screen");
    const quizModeSelectionScreen = document.getElementById("quiz-mode-selection-screen");
    const quizModeContainer = document.getElementById("quiz-mode-container");
    const personalityContainer = document.getElementById("personality-container");
    const gameContainer = document.getElementById("game-container");

    const startBtn = document.getElementById("start-button");
    const backFromSelectionToTopBtn = document.getElementById("back-to-selection-top-button");

    const modeQuizBtn = document.getElementById("mode-quiz-button");
    const modeGameBtn = document.getElementById("mode-game-button");

    const backFromQuizSelectionBtn = document.getElementById("back-from-quiz-selection-button");
    const selectKnowledgeQuizBtn = document.getElementById("select-knowledge-quiz");
    const selectPersonalityQuizBtn = document.getElementById("select-personality-quiz");

    const backFromQuizModeBtn = document.getElementById("back-from-quiz-mode-button");
    const retryQuizBtn = document.getElementById("retry-quiz-button");
    const backToModeSelectionBtn = document.getElementById("back-to-mode-selection-button");
    const quitGameButton = document.getElementById("quit-game-button");

    const backFromPersonalityBtn = document.getElementById("back-from-personality-button");
    const startPersonalityBtn = document.getElementById("start-personality-button");
    const pRestartButton = document.getElementById("p-restart-button");
    const pQuitButton = document.getElementById("p-quit-button");


    /* ================================== */
    /* II. 知識クイズ用 DOM 要素と状態変数 (QUIZ) */
    /* ... (変更なし) ... */
    /* ================================== */
    let currentQuizIndex = 0;
    let score = 0;
    let shuffledQuizzes = [];
    const QUIZ_COUNT = 10;

    const quizStartScreen = document.getElementById('quiz-start-screen');
    const quizContainer = document.getElementById('quiz-container');
    const quizResultScreen = document.getElementById('quiz-result-screen');
    const totalQuestionsStart = document.getElementById('total-questions-start');
    const questionElement = document.getElementById('question');
    const choicesContainer = document.getElementById('choices-container');
    const resultMessage = document.getElementById('result-message');
    const scoreDisplay = document.getElementById('score-display');
    const totalQuestions = document.getElementById('total-questions');
    const nextButtonContainer = document.getElementById('next-button-container');
    const finalScore = document.getElementById('final-score');
    const finalTotal = document.getElementById('final-total');
    const rankMessage = document.getElementById('rank-message');

    // 複数画像DOM要素を取得
    const quizImageGroup = document.getElementById('quiz-image-group');
    const quizImage1 = document.getElementById('quiz-image-1');
    const quizImage2 = document.getElementById('quiz-image-2');

    // クイズデータ定義
    const quizzes = [
        {question: "水害時避難する時に履くべき靴はどちらか？", choices: ["長靴", "スニーカー", "サンダル", "ハイヒール"], answer: "スニーカー", explanation: "長靴は浸水時に水が内部に入り、移動しづらくなってしまうため不適切です。ひもで結べて、足底がギザギザした滑りずらいスニーカーが避難時には適切です。", images: []},
        {question: "金沢市が作成している水害ハザードマップに書かれていないものは次のうちどれか？", choices: ["浸水想定区域", "警戒レベルごとに行うべき行動", "土砂災害想定区域", "高潮浸水想定区域図"], answer: "高潮浸水想定区域図", explanation: "水害ハザードマップは大雨により河川が氾濫した場合を想定したものなので、高潮に関する想定区域図はありません。", images: []},
        {question: "ハザードマップに記されている洪水の被害はどれくらいの規模を想定して作られているか？", choices: ["10年に1回", "100年に1回", "1000年以上に1回", "5000年以上に1回"], answer: "1000年以上に1回", explanation: "ハザードマップには１０００年以上に１回起こると考えられる洪水の被害が記されています。", images: []},
        {question: "災害前に用意するべきものとして間違っているものはどれか？", choices: ["非常用持ち出し袋の準備", "備蓄品の購入", "罹災（りさい）証明書の申請", "家族との連絡方法の確認"], answer: "罹災（りさい）証明書の申請", explanation: "罹災証明書の申請は、災害により家屋などに被害が出たことを証明する書類であり、災害後に自治体に申請する物なので間違いです。", images: []},
        {question: "災害時の非常食として適していないものはどれか？", choices: ["缶詰", "ビスケット", "カップ麺", "栄養補助食品"], answer: "カップ麺", explanation: "カップ麺はお湯を沸かして食べる必要があり、災害時はお湯を沸かすのはもちろん、水すら十分に入手することが難しい恐れがあるため不適です。", images: []},
        {question: "警戒レベルは5段階あるが、全員が避難するべき警戒レベルはどれか？", choices: ["レベル3", "レベル4", "レベル5", "レベル1"], answer: "レベル4", explanation: "警戒レベル5は避難行動が既に行えない状態を示しているため、レベル4のタイミングで避難行動を行わなければなりません。高齢者などの避難行動に時間がかかる人は警戒レベル3のタイミングで行う必要があります。", images: []},
        {question: "水圧により成人男性が扉を開けられなくなるのはどれくらいの水位からか？", choices: ["10cm", "30cm", "50cm", "80cm"], answer: "50cm", explanation: "20～30cmでドアにかかる水圧は数十キロになり女性や高齢者では開けられなくなり、50cmを超えると100キロ以上になり男性でも開けることは不可能になります。", images: []},
        {question: "水害発生時、山へ逃げるために車を使い避難行動することは〇か×か？", choices: ["〇（適切）", "×（不適切）"], answer: "×（不適切）", explanation: "災害時車を利用すると渋滞や事故の元になり、緊急車両の通行が困難になる恐れがあります。また、水害では30cm浸かる状態でエンジンが停止してしまい避難行動すらできなくなるため不適切です。", images: []},
        {question: "家屋が被災した時にすぐに確認すべき、火災・爆発の危険がある重要な項目はどれか？", choices: ["被害状況を写真で記録すること", "ブレーカーとガスの安全確認", "避難所への場所の確認", "近隣住民の安否確認"], answer: "ブレーカーとガスの安全確認", explanation: "特にブレーカー（電気）やガスに異常があると発火や爆発の恐れがあるため、迅速に安全確認を行う必要があります。", images: []},

        // ★ 再々修正箇所：問題文のテキストが画像の上部に表示されている問題に対処するため、
        // 必須ではない手順リストのテキストを完全に削除し、問題タイトルのみを残します。
        {question: "電気を復旧させるときの手順として正しい並び替えはどれか？ (画像を参照して解答してください)",
          choices: [
              "4→2→3→1", // 正解
              "2→3→1→4",
              "4→3→2→1",
              "3→4→2→1"
          ],
          answer: "4→2→3→1",
          explanation: "正解は 4.ブレーカーが全てOFFになっているか確認 → 2.アンペアブレーカーをON → 3.漏電遮断器をON → 1.安全ブレーカーを一つずつON の順序です。",
          images: ["kuizugamedetsukauyatsu.png", "bureka.png"]}
    ];

    totalQuestions.textContent = QUIZ_COUNT;
    totalQuestionsStart.textContent = QUIZ_COUNT;
    
    /* ... (中略：III. 性格診断用 DOM 要素と状態変数) ... */

    /* ================================== */
    /* VI. 知識クイズ ロジック (QUIZ) */
    /* ... (displayQuiz 関数のみ表示) ... */
    /* ================================== */

    // ... (shuffleArray, startQuiz 関数は変更なし) ...

    /**
     * 知識クイズの表示ロジック
     */
    function displayQuiz() {
        resultMessage.textContent = "";
        nextButtonContainer.innerHTML = "";
        if (currentQuizIndex >= shuffledQuizzes.length) {
            showFinalResult();
            return;
        }
        const currentQuiz = shuffledQuizzes[currentQuizIndex];

        // 問題文を表示（問題タイトルのみなので、改行コードは不要ですが、念のため置換ロジックは残します）
        // ★ 修正後の問題文には手順リストは含まれないことを前提としています。
        questionElement.innerHTML = currentQuiz.question.replace(/\n/g, '<br>');

        // 複数画像に対応
        if (currentQuiz.images && currentQuiz.images.length > 0) {
            quizImageGroup.classList.remove('hidden');
            quizImage1.src = currentQuiz.images[0] || '';
            quizImage2.src = currentQuiz.images[1] || '';

            // 画像が1枚だけの場合は、2枚目を非表示にする
            if (!currentQuiz.images[1]) {
                quizImage2.classList.add('hidden');
            } else {
                quizImage2.classList.remove('hidden');
            }
        } else {
            quizImageGroup.classList.add('hidden');
            quizImage1.src = '';
            quizImage2.src = '';
        }

        choicesContainer.innerHTML = '';
        const shuffledChoices = shuffleArray([...currentQuiz.choices]);

        shuffledChoices.forEach((choice) => {
            const button = document.createElement('button');

            button.textContent = choice;

            button.classList.add('choice-button');
            button.classList.add('action-button');

            button.addEventListener('click', () => {
                checkAnswer(button, choice, currentQuiz.answer);
            });
            choicesContainer.appendChild(button);
        });
    }
    // ... (checkAnswer, showFinalResult 関数は変更なし) ...
    // ... (イベントリスナーは変更なし) ...
    
    /* ... (中略：VII. 性格診断 ロジック) ... */
});