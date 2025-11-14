document.addEventListener("DOMContentLoaded", () => {
    /* ================================== */
    /* I. 画面遷移用 DOM 要素の定義 */
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

        // 問題文から手順リストのテキストを削除済み
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


    /* ================================== */
    /* III. 性格診断用 DOM 要素と状態変数 (PERSONALITY) */
    /* ================================== */
    let currentPQuestionIndex = 0;
    let totalPScore = 0;
    const pHomeScreen = document.getElementById('personality-home-screen');
    const pQuestionScreen = document.getElementById('personality-question-screen');
    const pResultScreen = document.getElementById('personality-result-screen');
    const pQuestionText = document.getElementById('p-question-text');
    const pOptionsContainer = document.getElementById('p-options-container');
    const pResultText = document.getElementById('p-result-text');
    const pQuestionNumberElement = pQuestionScreen.querySelector('.p-question-number');

    const CLASS_NAMES = {
        OPTION_BUTTON: 'option-button',
        SELECTED: 'selected',
        ACTIVE_SCREEN: 'active',
    };
    const NEXT_QUESTION_DELAY = 500;

    // 診断問題データ (Personality)
    const pQuestions = [
        {question: "1. 災害時のハザードマップや避難場所を把握していますか？", options: [{ text: "非常に詳しく、家族と共有している", score: 3 }, { text: "だいたいの場所は知っている", score: 2 }, { text: "ほとんど確認したことがない", score: 1 }]},
        {question: "2. 普段からデマや誤情報に惑わされずに、情報源を精査しますか？", options: [{ text: "必ず複数の信頼できる情報源と比較する", score: 3 }, { text: "情報の出所を確認するが、時には鵜呑みにする", score: 2 }, { text: "友人やSNSで流れてきた情報を信じやすい", score: 1 }]},
        {question: "3. 強い揺れなど、予期せぬ緊急事態に遭遇したとき、どうなりますか？", options: [{ text: "すぐに状況を把握し、取るべき行動を考える", score: 3 }, { text: "一瞬戸惑うが、すぐに冷静になれる", score: 2 }, { text: "パニックになり、体が動かなくなることがある", score: 1 }]},
        {question: "4. 避難時に持っていくものを選ぶ際、何を優先しますか？", options: [{ text: "食料、水、水、医薬品など、生命維持に必須なもの", score: 3 }, { text: "貴重品や連絡手段（スマホなど）", score: 2 }, { text: "服やお気に入りのものなど、気分が落ち着くもの", score: 1 }]},
        {question: "5. 見知らぬ人が助けを求めてきた場合、どうしますか？", options: [{ text: "自分の安全を確保しつつ、積極的に手助けをする", score: 3 }, { text: "手助けはするが、深く関わらないようにする", score: 2 }, { text: "自分の安全を優先し、関わらないようにする", score: 1 }]},
        {question: "6. 避難所での生活で、集団のルールや当番がある場合、どうしますか？", options: [{ text: "ルールを理解し、率先して当番や作業を引き受ける", score: 3 }, { text: "決められたことは守るが、積極的には関わらない", score: 2 }, { text: "なるべく目立たず、自分のペースを崩さない", score: 1 }]},
        {question: "7. 災害警報が発表されたとき、あなたはどう行動しますか？", options: [{ text: "警報レベルに応じてすぐに避難を開始する", score: 3 }, { text: "状況をもう少し観察してから行動に移す", score: 2 }, { text: "「大丈夫だろう」と考え、行動を遅らせる", score: 1 }]},
        {question: "8. 避難の途中で、計画外の困難な状況に直面したら？", options: [{ text: "即座に代替ルートや方法を判断し、実行する", score: 3 }, { text: "誰かに相談したり、周囲の様子を見てから行動する", score: 2 }, { text: "立ち止まり、どうすればいいか分からなくなる", score: 1 }]},
        {question: "9. 災害が起きたとき、誰と連絡を取るための優先順位は？", options: [{ text: "緊急度の高い人（要配慮者など）を優先する", score: 3 }, { text: "家族や親しい友人の安否を最優先する", score: 2 }, { text: "自分の状況をまずSNSで発信する", score: 1 }]},
        {question: "10. あなたが地域のリーダーに任命された場合、どう対応しますか？", options: [{ text: "断固として受け入れ、責任を持って指揮をとる", score: 3 }, { text: "不安はあるが、求められれば協力的に役割を果たす", score: 2 }, { text: "リーダーは苦手なので、断る", score: 1 }]},
    ];

    // 診断結果データ (Personality)
    const pResults = [
        { minScore: 26, maxScore: 30, text: "👑 **【即応型リーダータイプ】** 👑\n**傾向予測:** 危険を察知する能力が高く、**即断即決で避難を優先**し、周囲を導けます。パニック時でも冷静さを保ち、困難な状況でも代案を考え実行する**行動力**があります。地域の中心的な役割を担う可能性が高いです。" },
        { minScore: 21, maxScore: 25, text: "🤝 **【協調型バランスタイプ】** 🤝\n**傾向予測:** **情報収集力**と**協調性**のバランスが取れています。情報を精査しつつ、集団行動においては**周囲と協力**し、円滑な避難・避難所生活を支えるでしょう。冷静に状況を見極め、サポート役として貢献します。" },
        { minScore: 16, maxScore: 20, text: "💡 **【計画型堅実タイプ】** 💡\n**傾向予測:** 事前の**計画や知識**を重視し、無駄な行動を避け**自己と家族の安全確保を最優先**します。集団の中ではやや受動的ですが、決まったルールを守り、着実に任務を果たす信頼性があります。感情に流されず行動できるでしょう。" },
        { minScore: 10, maxScore: 15, text: "⚠️ **【情報依存型慎重タイプ】** ⚠️\n**傾向予測:** 行動に踏み切るまでに時間を要し、**情報の確定を待つ傾向**があります。避難時や集団の中では指示を待つことが多く、積極的な行動は控えめです。信頼できる情報源と、頼れるリーダーの存在が行動の鍵となります。" },
    ];


    // ボディ全体に適用される要素を取得
    const body = document.body;

    /* ================================== */
    /* IV. リアルタイム時刻表示 & テーマ自動切り替え (同期復活) */
    /* ================================== */

    function createTimeDisplay() {
        let timeDisplay = document.getElementById('current-time-display');
        if (!timeDisplay) {
            timeDisplay = document.createElement('div');
            timeDisplay.id = 'current-time-display';
            body.appendChild(timeDisplay);
        }
        return timeDisplay;
    }

    const timeDisplayElement = createTimeDisplay();

    function updateTimeDisplay() {
        const now = new Date();
        const hour = now.getHours();
        const minute = String(now.getMinutes()).padStart(2, '0');
        timeDisplayElement.textContent = `${hour}:${minute}`;

        // リアルタイムテーマ切り替えを復活
        // 昼間 (6:00 から 17:59) は light-theme (明るいテーマ)
        if (hour >= 6 && hour < 18) {
            body.classList.add('light-theme');
        } else {
            // 夜間 (18:00 から 5:59) は dark-theme (暗いテーマ)
            body.classList.remove('light-theme');
        }
    }

    // 初期ロード時に更新し、1分ごとにチェック
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 60000);

    /* ================================== */
    /* V. 画面遷移 ロジック */
    /* ================================== */

    function hideAllScreens() {
        [topScreen, selectionScreen, quizModeSelectionScreen, quizModeContainer, personalityContainer, gameContainer].forEach(screen => {
            if (screen) screen.classList.add("hidden");
        });
    }

    // A. トップ画面 -> メイン選択画面
    if (startBtn)
        startBtn.addEventListener("click", () => {
            hideAllScreens();
            selectionScreen.classList.remove("hidden");
        });

    // B. メイン選択画面 -> トップ画面
    if (backFromSelectionToTopBtn)
        backFromSelectionToTopBtn.addEventListener("click", () => {
            hideAllScreens();
            topScreen.classList.remove("hidden");
        });

    // C. メイン選択画面 -> クイズ/診断選択画面
    if (modeQuizBtn)
        modeQuizBtn.addEventListener("click", () => {
            hideAllScreens();
            quizModeSelectionScreen.classList.remove("hidden");
        });

    // D. クイズ/診断選択画面 -> メイン選択画面
    if (backFromQuizSelectionBtn)
        backFromQuizSelectionBtn.addEventListener("click", () => {
            hideAllScreens();
            selectionScreen.classList.remove("hidden");
        });

    // E. クイズ/診断選択画面 -> 知識クイズ開始
    if (selectKnowledgeQuizBtn)
        selectKnowledgeQuizBtn.addEventListener("click", () => {
            hideAllScreens();
            quizContainer.classList.add('hidden'); // 問題画面を隠す！
            quizStartScreen.classList.remove('hidden'); // スタート画面を表示！
            quizModeContainer.classList.remove("hidden");
            quizStartScreen.classList.remove('hidden');
        });

    // F. クイズ/診断選択画面 -> 性格診断開始
    if (selectPersonalityQuizBtn)
        selectPersonalityQuizBtn.addEventListener("click", () => {
            hideAllScreens();
            personalityContainer.classList.remove("hidden");
            resetPersonalityGame();
        });

    // G. 各モードの戻るボタン -> メイン選択画面
    [backFromQuizModeBtn, document.getElementById("back-from-game-button"), backFromPersonalityBtn].forEach(btn => {
        if(btn) {
            btn.addEventListener("click", () => {
                hideAllScreens();
                selectionScreen.classList.remove("hidden");
            });
        }
    });

    // H. 知識クイズの結果画面からモード選択に戻る (クイズ/診断選択画面へ)
    if(backToModeSelectionBtn)
        backToModeSelectionBtn.addEventListener('click', () => {
            hideAllScreens();
            quizModeSelectionScreen.classList.remove('hidden');
        });

    // I. 終了ボタン（共通）
    const EXIT_URL = "https://www.pref.ishikawa.lg.jp/bousai/h_map.html"; // 宣伝URL
    [quitGameButton, pQuitButton].forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => {
                window.location.href = EXIT_URL;
            });
        }
    });

    /* ================================== */
    /* VI. 知識クイズ ロジック (QUIZ) */
    /* ================================== */

    // 配列をシャッフルする関数 (共通)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startQuiz() {
        const allQuizzes = [...quizzes];
        if (allQuizzes.length < QUIZ_COUNT) {
             shuffledQuizzes = allQuizzes;
        } else {
             shuffleArray(allQuizzes);
             shuffledQuizzes = allQuizzes.slice(0, QUIZ_COUNT);
        }

        currentQuizIndex = 0;
        score = 0;
        scoreDisplay.textContent = score;
        quizStartScreen.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        displayQuiz();
    }

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

        // 問題文を表示（問題タイトルのみ）
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

    /**
     * 知識クイズの回答チェックロジック
     */
    function checkAnswer(selectedButton, selectedChoice, correctAnswer) {
        const buttons = choicesContainer.querySelectorAll('.choice-button');
        buttons.forEach(btn => btn.disabled = true);
        const currentQuiz = shuffledQuizzes[currentQuizIndex];

        if (selectedChoice === correctAnswer) {
            resultMessage.innerHTML = `✅ **正解！** にげまくりまっし！<br><small>【解説】${currentQuiz.explanation}</small>`;
            selectedButton.classList.add('correct');
            score++;
        } else {
            resultMessage.innerHTML = `❌ **不正解...** <small>正解は「${currentQuiz.answer}」でした。</small><br><small>【解説】${currentQuiz.explanation}</small>`;
            selectedButton.classList.add('incorrect');

            buttons.forEach(btn => {
                if (btn.textContent === currentQuiz.answer) {
                    btn.classList.add('correct');
                }
            });
        }

        scoreDisplay.textContent = score;
        const nextBtn = document.createElement('button');
        nextBtn.id = 'next-button';
        nextBtn.classList.add('action-button');
        nextBtn.textContent = (currentQuizIndex + 1) === QUIZ_COUNT ? '結果を見る' : '次へ';
        nextBtn.addEventListener('click', () => {
            resultMessage.textContent = "";
            nextButtonContainer.innerHTML = "";
            currentQuizIndex++;
            displayQuiz();
        });
        nextButtonContainer.appendChild(nextBtn);
    }

    function showFinalResult() {
        quizContainer.classList.add('hidden');
        quizResultScreen.classList.remove('hidden');
        finalScore.textContent = score;
        finalTotal.textContent = QUIZ_COUNT;
        const percentage = (score / QUIZ_COUNT) * 100;
        if (percentage === 100) {
            rankMessage.textContent = "🏆 完璧！あなたは防災マスターです！";
        } else if (percentage >= 70) {
            rankMessage.textContent = "✨ 素晴らしい！基本的な知識はバッチリです。";
        } else if (percentage >= 50) {
            rankMessage.textContent = "💡 まずまずです。さらに知識を深めましょう。";
        } else {
            rankMessage.textContent = "😥 要注意！もう一度しっかりと知識を身につけましょう。";
        }
    }
    if (document.getElementById("start-quiz-button"))
        document.getElementById("start-quiz-button").addEventListener('click', startQuiz);
    if(retryQuizBtn)
        retryQuizBtn.addEventListener('click', () => {
            quizResultScreen.classList.add('hidden');
            startQuiz();
        });


    /* ================================== */
    /* VII. 性格診断 ロジック (PERSONALITY) */
    /* ================================== */

    // 診断ゲームのリセットと開始
    function resetPersonalityGame() {
        currentPQuestionIndex = 0;
        totalPScore = 0;
        // 問題をシャッフル
        shuffleArray(pQuestions);

        pHomeScreen.classList.remove('hidden');
        pQuestionScreen.classList.add('hidden');
        pResultScreen.classList.add('hidden');
    }

    // 診断スタートボタンのイベント
    if (startPersonalityBtn)
        startPersonalityBtn.addEventListener('click', () => {
            pHomeScreen.classList.add('hidden');
            pQuestionScreen.classList.remove('hidden');
            loadPQuestion();
        });

    // 診断リスタートボタンのイベント
    if (pRestartButton)
        pRestartButton.addEventListener('click', () => {
            resetPersonalityGame();
        });

    /**
     * 診断の質問を画面にロードする
     */
    function loadPQuestion() {
        if (currentPQuestionIndex >= pQuestions.length) {
            showPResult();
            return;
        }

        const currentQuestion = pQuestions[currentPQuestionIndex];
        // 修正: 問題番号 (1., 2., ...) を削除
        let qText = currentQuestion.question.replace(/^\d+\.\s*/, '');
        pQuestionText.textContent = qText;
        pQuestionNumberElement.textContent = `${currentPQuestionIndex + 1} / ${pQuestions.length}`;

        pOptionsContainer.innerHTML = '';

        const optionsToDisplay = [...currentQuestion.options];
        // 選択肢をシャッフル
        shuffleArray(optionsToDisplay);

        // 選択肢ボタンを作成
        optionsToDisplay.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add(CLASS_NAMES.OPTION_BUTTON);
            button.classList.add('action-button');
            button.dataset.score = option.score;

            button.addEventListener('click', (event) => {
                handlePAnswer(event.target);
            });

            pOptionsContainer.appendChild(button);
        });
    }

    /**
     * 診断の回答処理
     */
    function handlePAnswer(selectedButton) {
        const score = parseInt(selectedButton.dataset.score);
        totalPScore += score;

        pOptionsContainer.querySelectorAll(`.${CLASS_NAMES.OPTION_BUTTON}`).forEach(btn => {
            btn.disabled = true;
            if (btn === selectedButton) {
                btn.classList.add(CLASS_NAMES.SELECTED);
            }
        });

        setTimeout(() => {
            currentPQuestionIndex++;
            loadPQuestion();
        }, NEXT_QUESTION_DELAY);
    }

    /**
     * 診断結果を表示する
     */
    function showPResult() {
        pQuestionScreen.classList.add('hidden');
        pResultScreen.classList.remove('hidden');

        const result = pResults.find(r => totalPScore >= r.minScore && totalPScore <= r.maxScore);

        if (result) {
            pResultText.innerHTML = result.text.replace(/\n/g, '<br>') + `<p><em>（合計スコア: ${totalPScore}点）</em></p>`;
        } else {
            pResultText.textContent = `診断結果が見つかりませんでした。（合計スコア: ${totalPScore}点）`;
        }
    }
});