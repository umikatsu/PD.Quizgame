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
    
    // ゲームモード用ボタン
    const backFromGameBtn = document.getElementById("back-from-game-button");
    const btnFinish = document.getElementById('btn-finish');
    const btnRetry = document.getElementById('btn-retry');
    const overlayRetryBtn = document.getElementById('overlay-retry-button');
    const overlayQuitBtn = document.getElementById('overlay-quit-button');


    /* ================================== */
    /* II. 知識クイズ用変数 (QUIZ) */
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

    // 画像要素
    const quizImageGroup = document.getElementById('quiz-image-group');
    const quizImage1 = document.getElementById('quiz-image-1');
    const quizImage2 = document.getElementById('quiz-image-2');

    // クイズデータ
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
        {question: "災害が起きる前に作成することが推奨されている「マイ・タイムライン」は何か？", choices: ["自分の住んでいる地域過去100年間の災害履歴がまとめられた年表", "災害時に自分が取るべき防災行動を時系列で整理した逃避計画", "家族や友人の連絡先、避難場所の電話番号をまとめた緊急連絡網リスト", "被害を受けた後、保険会社に提出するための家財道具のリスト"], answer: "災害時に自分が取るべき防災行動を時系列で整理した逃避計画", explanation: "マイ・タイムラインとは「いつ・誰が・何をするか」を事前に決めておく計画表のことです。事前に作ることで迷わずに避難することができるようになります。", images: []},
        {question: "「指定緊急避難場所」と「指定避難所」の違いについて、正しい説明はどれか？", choices: ["名前が違うだけで特に違いはない", "「指定緊急避難場所」は命を守るためにとりあえず逃げ込む場所、「指定避難所」は避難生活を送るための場所", "「指定緊急避難場所」は食料の備蓄がある場所、「指定避難所」は避難生活を送るための場所", "「指定緊急避難場所」は高齢者専用、「指定避難所」は一般の人専用"], answer: "「指定緊急避難場所」は命を守るためにとりあえず逃げ込む場所、「指定避難所」は避難生活を送るための場所", explanation: "指定緊急避難場所とは、災害の危険から「とりあえず命を守る」ために逃げる場所（高台や、頑丈な建物など）。　指定避難所とは、災害の危険が去った後、自宅に戻れない人が「避難生活を送る」ための場所", images: []},
        {question: "大雨や災害時に、電話に繋がりにくい状況で安否確認を行うための「災害用伝言ダイヤル」の電話番号はどれか？", choices: ["110", "119", "171", "177"], answer: "171", explanation: "覚え方として、忘れて「いない(171)」などの語呂合わせがあります。", images: []},
        {question: "近年、集中豪雨の大きな原因となっている「線状降水帯」の説明として正しいものはどれか？", choices: ["台風の中心付近にある、風が弱く雲の少ない目のような部分", "積乱雲が直列に並び、数時間にわたって同じ場所に大雨を降らせる現象", "春一番のように、強い風が吹き荒れる現象", "冬場に日本海側で発生する、雪を伴った雷雲"], answer: "積乱雲が直列に並び、数時間にわたって同じ場所に大雨を降らせる現象", explanation: "予測することが難しく、災害のリスクが高まる現象のため、この言葉が出たら警戒する必要があります。", images: []},
        {question: "内水氾濫とはどのような水害か？", choices: ["川の堤防が壊れて、川の水が街に流れ込むこと", "津波が川逆流して、内陸部まで水が来ること", "下水道や排水路の処理能力を超えてしまい、街に降った雨が排水できずにあふれること", "山崩れによって川がせき止められ、天然ダムができること"], answer: "下水道や排水路の処理能力を超えてしまい、街に降った雨が排水できずにあふれること", explanation: "近くに大きな川が無くても、コンクリートで覆われた都市部や低地でよく起こります", images: []},
        {question: "建物が浸水してしまった場合行ってはいけないことはどれか？", choices: ["マスク・手袋の着用", "清掃後に手洗いうがいをする", "水が引いてすぐに電気のブレーカーを入れる"], answer: "水が引いてすぐに電気のブレーカーを入れる", explanation: "水が引いた後でも家電製品や配線が濡れている可能性があり、漏電や火災の原因になります。", images: []},
        {question: "罹災証明書の申請に必要な「被害状況の写真」の撮り方として、最も適切なものはどれか？", choices: ["被害を受けた個所の拡大した写真を数枚とる", "家の全景と、被害個所の拡大した写真を組み合わせて撮る", "既に片付けてしまった後のため、写真は撮らずに申請窓口で口頭で説明する", "浸水した跡が汚かったため、床や壁をきれいにしてから撮影する"], answer: "家の全景と、被害個所の拡大した写真を組み合わせて撮る", explanation: "拡大写真だけではどこの家か、家全体の被害状況が分からず申請が通らない可能性があるため、全体と被害箇所の写真を複数撮影する必要があります。", images: []},
        {question: "水害で出たゴミの処理について、一般的に推奨される行動はどれか？", choices: ["早く片付けるために、すべてのゴミを一つの袋にまとめて出す", "道路の通行を妨げないよう、分別せず空き地に山積みにしておく", "腐敗臭や害虫を防ぐため、庭や空き地でゴミを自己焼却する", "自治体の指示に従い、ゴミの種類を分別して指定の置き場に出す"], answer: "自治体の指示に従い、ゴミの種類を分別して指定の置き場に出す", explanation: "分別せずに捨てると、処理時に分別の必要があり大幅に遅れてしまいます。自己焼却は有害物質の発生や火災の原因になるためしてはいけません。", images: []},
        {question: "自宅の駐車場が水没してしまったときの、水が引いた後の行動として、行ってはいけない行動はどれか？", choices: ["車の状態を調べるために、エンジンをかけて動くか確認する", "バッテリーの確認をするためにマイナス端子を外す", "レッカー車や販売店に連絡し、車の移動を依頼する", "保険請求のため、車両のナンバープレートや浸水状況が分かる写真を撮る"], answer: "車の状態を調べるために、エンジンをかけて動くか確認する", explanation: "水没車は電気類がショートしてしまい、エンジンをかけると車両火災が起きる恐れがあるため、絶対エンジンをかけてはいけません。", images: []},
        {question: "災害後、型付け作業中に錆びた釘を踏んでけがをした。この時、土壌中の菌の感染を疑い、注意するべき病気はどれか？", choices: ["インフルエンザ", "破傷風", "熱中症", "エコノミークラス症候群"], answer: "破傷風", explanation: "土の中にいる破傷風菌が傷口から入り、神経毒を出して重篤な症状を引き起こします。エコノミークラス症候群は長時間同じ姿勢でいることによる病気のため、関係ありません。", images: []},
        {question: "災害後、「屋根の無料点検」「火災保険で修理できる」などと言って訪問してくる業者の対応として、最も適切な物はどれか？", choices: ["困っているため、すぐに修理契約書にサインする", "「点検だけは無料」と言われたため、とりあえず屋根に上がってもらう", "その場で契約はせず、身分証の確認、工務店や消費生活センターに相談する", "「保険金の請求代行を行う」と言われたため、手数料を前払いして任せる"], answer: "その場で契約はせず、身分証の確認、工務店や消費生活センターに相談する", explanation: "すぐに契約書にサインしたり、屋根に上がってもらうことは悪質業者の手口のため、絶対に行ってはいけません。", images: []},
        {question: "「大規模水害対策」において最も重要とされる考え方として、国土交通省が提言しているものはどれか？", choices: ["すべての洪水は堤防工事で防げる", "施設の能力を超える大洪水は必ず発生すると考え、被害軽減を重視する", "小規模河川は洪水対策の対象内とする", "ハザードマップは大雨時以外でも更新する"], answer: "施設の能力を超える大洪水は必ず発生すると考え、被害軽減を重視する", explanation: "最近の水害対策では堤防や治水施設で防ぐ考え方を見直し、施設の限界を想定した被害軽減策が重要とされています。洪水対策の対象内とハザードマップについての記載は国土交通省が提言していません。", images: []},
        
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

    // 診断問題データ
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

    // 診断結果データ
    const pResults = [
        { minScore: 26, maxScore: 30, text: "👑 **【即応型リーダータイプ】** 👑\n**傾向予測:** 危険を察知する能力が高く、**即断即決で避難を優先**し、周囲を導けます。パニック時でも冷静さを保ち、困難な状況でも代案を考え実行する**行動力**があります。地域の中心的な役割を担う可能性が高いです。" },
        { minScore: 21, maxScore: 25, text: "🤝 **【協調型バランスタイプ】** 🤝\n**傾向予測:** **情報収集力**と**協調性**のバランスが取れています。情報を精査しつつ、集団行動においては**周囲と協力**し、円滑な避難・避難所生活を支えるでしょう。冷静に状況を見極め、サポート役として貢献します。" },
        { minScore: 16, maxScore: 20, text: "💡 **【計画型堅実タイプ】** 💡\n**傾向予測:** 事前の**計画や知識**を重視し、無駄な行動を避け**自己と家族の安全確保を最優先**します。集団の中ではやや受動的ですが、決まったルールを守り、着実に任務を果たす信頼性があります。感情に流されず行動できるでしょう。" },
        { minScore: 10, maxScore: 15, text: "⚠️ **【情報依存型慎重タイプ】** ⚠️\n**傾向予測:** 行動に踏み切るまでに時間を要し、**情報の確定を待つ傾向**があります。避難時や集団の中では指示を待つことが多く、積極的な行動は控えめです。信頼できる情報源と、頼れるリーダーの存在が行動の鍵となります。" },
    ];

    // ボディ全体に適用される要素を取得
    const body = document.body;

    /* ================================== */
    /* IV. リアルタイム時刻表示 & テーマ */
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
        if (hour >= 6 && hour < 18) {
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
        }
    }
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 60000);

    if (window.location.hash === "#selection") {
    hideAllScreens(); // すべての画面を一度隠す
    selectionScreen.classList.remove("hidden"); // モード選択画面だけを表示
    }

    /* ================================== */
    /* V. 画面遷移 ロジック */
    /* ================================== */
    function hideAllScreens() {
        [topScreen, selectionScreen, quizModeSelectionScreen, quizModeContainer, personalityContainer, gameContainer].forEach(screen => {
            if (screen) screen.classList.add("hidden");
        });
    }

    if (startBtn) startBtn.addEventListener("click", () => { hideAllScreens(); selectionScreen.classList.remove("hidden"); });
    if (backFromSelectionToTopBtn) backFromSelectionToTopBtn.addEventListener("click", () => { hideAllScreens(); topScreen.classList.remove("hidden"); });
    if (modeQuizBtn) modeQuizBtn.addEventListener("click", () => { hideAllScreens(); quizModeSelectionScreen.classList.remove("hidden"); });

    // ゲームモード開始
    if (modeGameBtn) {
        modeGameBtn.addEventListener("click", () => {
            hideAllScreens();
            gameContainer.classList.remove("hidden");
            setTimeout(() => { initGameMap(); }, 100);
        });
    }

    if (backFromQuizSelectionBtn) backFromQuizSelectionBtn.addEventListener("click", () => { hideAllScreens(); selectionScreen.classList.remove("hidden"); });

    if (selectKnowledgeQuizBtn) selectKnowledgeQuizBtn.addEventListener("click", () => {
        hideAllScreens();
        quizContainer.classList.add('hidden'); 
        quizStartScreen.classList.remove('hidden'); 
        quizModeContainer.classList.remove("hidden");
        quizStartScreen.classList.remove('hidden');
    });

    if (selectPersonalityQuizBtn) selectPersonalityQuizBtn.addEventListener("click", () => {
        hideAllScreens();
        personalityContainer.classList.remove("hidden");
        resetPersonalityGame();
    });

    [backFromQuizModeBtn, backFromPersonalityBtn].forEach(btn => {
        if(btn) {
            btn.addEventListener("click", () => {
                hideAllScreens();
                selectionScreen.classList.remove("hidden");
            });
        }
    });

    // ゲームモードから戻る
    if(backFromGameBtn) {
        backFromGameBtn.addEventListener("click", () => {
            stopGameMap();
            hideAllScreens();
            selectionScreen.classList.remove("hidden");
        });
    }

    if(backToModeSelectionBtn) backToModeSelectionBtn.addEventListener('click', () => { hideAllScreens(); quizModeSelectionScreen.classList.remove('hidden'); });

    const EXIT_URL = "https://umikatsu.github.io/PD.Quizgame/advertise.html"; 
    [quitGameButton, pQuitButton].forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => { window.location.href = EXIT_URL; });
        }
    });

    /* ================================== */
    /* VI. 知識クイズ ロジック */
    /* ================================== */
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
        currentQuizIndex = 0; score = 0; scoreDisplay.textContent = score;
        quizStartScreen.classList.add('hidden'); quizContainer.classList.remove('hidden');
        displayQuiz();
    }

    function displayQuiz() {
        resultMessage.textContent = ""; nextButtonContainer.innerHTML = "";
        if (currentQuizIndex >= shuffledQuizzes.length) { showFinalResult(); return; }
        const currentQuiz = shuffledQuizzes[currentQuizIndex];
        
        const possibleList = quizContainer.querySelector('ul, ol, div.list-container');
        if(possibleList) possibleList.style.display = 'none';

        questionElement.innerHTML = currentQuiz.question.replace(/\n/g, '<br>');

        if (currentQuiz.images && currentQuiz.images.length > 0) {
            quizImageGroup.classList.remove('hidden');
            quizImage1.src = currentQuiz.images[0] || '';
            quizImage2.src = currentQuiz.images[1] || '';
            if (!currentQuiz.images[1]) { quizImage2.classList.add('hidden'); } else { quizImage2.classList.remove('hidden'); }
        } else {
            quizImageGroup.classList.add('hidden'); quizImage1.src = ''; quizImage2.src = '';
        }

        choicesContainer.innerHTML = '';
        const shuffledChoices = shuffleArray([...currentQuiz.choices]);
        shuffledChoices.forEach((choice) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choice-button', 'action-button');
            button.addEventListener('click', () => { checkAnswer(button, choice, currentQuiz.answer); });
            choicesContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedButton, selectedChoice, correctAnswer) {
        const buttons = choicesContainer.querySelectorAll('.choice-button');
        buttons.forEach(btn => btn.disabled = true);
        const currentQuiz = shuffledQuizzes[currentQuizIndex];

        if (selectedChoice === correctAnswer) {
            resultMessage.innerHTML = `✅ **正解！** にげまくりまっし！<br><small>【解説】${currentQuiz.explanation}</small>`;
            selectedButton.classList.add('correct'); score++;
        } else {
            resultMessage.innerHTML = `❌ **不正解...** <small>正解は「${currentQuiz.answer}」でした。</small><br><small>【解説】${currentQuiz.explanation}</small>`;
            selectedButton.classList.add('incorrect');
            buttons.forEach(btn => { if (btn.textContent === currentQuiz.answer) btn.classList.add('correct'); });
        }

        scoreDisplay.textContent = score;
        const nextBtn = document.createElement('button');
        nextBtn.id = 'next-button'; nextBtn.classList.add('action-button');
        nextBtn.textContent = (currentQuizIndex + 1) === QUIZ_COUNT ? '結果を見る' : '次へ';
        nextBtn.addEventListener('click', () => {
            resultMessage.textContent = ""; nextButtonContainer.innerHTML = "";
            currentQuizIndex++; displayQuiz();
        });
        nextButtonContainer.appendChild(nextBtn);
    }

    function showFinalResult() {
        quizContainer.classList.add('hidden'); quizResultScreen.classList.remove('hidden');
        finalScore.textContent = score; finalTotal.textContent = QUIZ_COUNT;
        const percentage = (score / QUIZ_COUNT) * 100;
        if (percentage === 100) rankMessage.textContent = "🏆 完璧！あなたは防災マスターです！";
        else if (percentage >= 70) rankMessage.textContent = "✨ 素晴らしい！基本的な知識はバッチリです。";
        else if (percentage >= 50) rankMessage.textContent = "💡 まずまずです。さらに知識を深めましょう。";
        else rankMessage.textContent = "😥 要注意！もう一度しっかりと知識を身につけましょう。";
    }

    if (document.getElementById("start-quiz-button")) document.getElementById("start-quiz-button").addEventListener('click', startQuiz);
    if(retryQuizBtn) retryQuizBtn.addEventListener('click', () => { quizResultScreen.classList.add('hidden'); startQuiz(); });


    /* ================================== */
    /* VII. 性格診断 ロジック */
    /* ================================== */
    function resetPersonalityGame() {
        currentPQuestionIndex = 0; totalPScore = 0;
        shuffleArray(pQuestions);
        pHomeScreen.classList.remove('hidden'); pQuestionScreen.classList.add('hidden'); pResultScreen.classList.add('hidden');
    }

    if (startPersonalityBtn) startPersonalityBtn.addEventListener('click', () => {
        pHomeScreen.classList.add('hidden'); pQuestionScreen.classList.remove('hidden'); loadPQuestion();
    });

    if (pRestartButton) pRestartButton.addEventListener('click', () => { resetPersonalityGame(); });

    function loadPQuestion() {
        if (currentPQuestionIndex >= pQuestions.length) { showPResult(); return; }
        const currentQuestion = pQuestions[currentPQuestionIndex];
        let qText = currentQuestion.question.replace(/^\d+\.\s*/, '');
        pQuestionText.textContent = qText;
        pQuestionNumberElement.textContent = `${currentPQuestionIndex + 1} / ${pQuestions.length}`;
        pOptionsContainer.innerHTML = '';
        const optionsToDisplay = [...currentQuestion.options];
        shuffleArray(optionsToDisplay);
        optionsToDisplay.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add(CLASS_NAMES.OPTION_BUTTON, 'action-button');
            button.dataset.score = option.score;
            button.addEventListener('click', (event) => { handlePAnswer(event.target); });
            pOptionsContainer.appendChild(button);
        });
    }

    function handlePAnswer(selectedButton) {
        const score = parseInt(selectedButton.dataset.score);
        totalPScore += score;
        pOptionsContainer.querySelectorAll(`.${CLASS_NAMES.OPTION_BUTTON}`).forEach(btn => {
            btn.disabled = true; if (btn === selectedButton) btn.classList.add(CLASS_NAMES.SELECTED);
        });
        setTimeout(() => { currentPQuestionIndex++; loadPQuestion(); }, NEXT_QUESTION_DELAY);
    }

    function showPResult() {
        pQuestionScreen.classList.add('hidden'); pResultScreen.classList.remove('hidden');
        const result = pResults.find(r => totalPScore >= r.minScore && totalPScore <= r.maxScore);
        if (result) pResultText.innerHTML = result.text.replace(/\n/g, '<br>') + `<p><em>（合計スコア: ${totalPScore}点）</em></p>`;
        else pResultText.textContent = `診断結果が見つかりませんでした。（合計スコア: ${totalPScore}点）`;
    }

    /* ================================== */
    /* VIII. マップゲーム ロジック */
    /* ================================== */
    let map = null;
    let startPoint, goalPoint;
    let dangerPolygons = [];
    let userWaypoints = [];
    let userRouteControl = null;
    let timerInterval = null;
    let timeLeft = 180;
    let isGoalReady = false;

    const shelters = [
        { name: "金沢市役所", lat: 36.5611, lng: 136.6566 },
        { name: "泉野小学校", lat: 36.5480, lng: 136.6450 },
        { name: "明成小学校", lat: 36.5790, lng: 136.6500 },
        { name: "兼六中学校", lat: 36.5550, lng: 136.6700 },
        { name: "犀川小学校", lat: 36.5400, lng: 136.6600 },
        { name: "金沢駅", lat: 36.5780, lng: 136.6480 }
    ];
    const AREA = { minLat: 36.530, maxLat: 36.600, minLng: 136.620, maxLng: 136.680 };

    function initGameMap() {
        // ★時刻を隠す
        const timeDisplay = document.getElementById('current-time-display');
        if(timeDisplay) timeDisplay.style.display = 'none';

        if (!map) {
            map = L.map('map').setView([36.56, 136.65], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);
            map.on('click', onMapClick);
        } else {
            // サイズ再計算
            setTimeout(() => { map.invalidateSize(); }, 200);
        }
        resetGameState();
    }

    function stopGameMap() {
        // ★時刻を戻す
        const timeDisplay = document.getElementById('current-time-display');
        if(timeDisplay) timeDisplay.style.display = 'block';

        clearInterval(timerInterval);
    }

    function resetGameState() {
        document.getElementById('result-overlay').style.display = 'none';
        map.eachLayer(l => {
            if(l instanceof L.Marker || l instanceof L.Polygon || l instanceof L.CircleMarker) map.removeLayer(l);
        });
        if(userRouteControl) map.removeControl(userRouteControl);

        userWaypoints = []; dangerPolygons = []; isGoalReady = false;
        btnFinish.classList.remove('active'); btnFinish.textContent = "ルート作成中...";
        document.getElementById('status-text').innerHTML = "地図をクリックしてルートを作成。<br>ゴールにつなげてください。";

        clearInterval(timerInterval); timeLeft = 180; updateTimer();

        setupStartGoal();
        if(startPoint && goalPoint) {
            generateSafeDangerZones(startPoint, goalPoint);
            map.fitBounds([[startPoint.lat, startPoint.lng], [goalPoint.lat, goalPoint.lng]], {padding:[80,80]});
            userWaypoints.push(L.latLng(startPoint.lat, startPoint.lng));
            drawUserRoute();
            timerInterval = setInterval(() => {
                timeLeft--; updateTimer();
                if(timeLeft <= 0) showGameResult("TIME OVER", "逃げ遅れました...", false);
            }, 1000);
        }
    }

    function setupStartGoal() {
        let found = false;
        const startIcon = L.divIcon({
            className: 'custom-pin',
            html: `<div style="text-align:center;"><div class="pin-label" style="color:#c0392b;border-color:#c0392b;">現在地</div><div style="font-size:30px;">🏃</div></div>`,
            iconSize: [30, 40], iconAnchor: [15, 30]
        });
        const goalIcon = L.divIcon({
            className: 'custom-pin',
            html: `<div style="text-align:center;"><div class="pin-label" style="color:#27ae60;border-color:#27ae60;">避難所</div><div style="font-size:30px;">🏫</div></div>`,
            iconSize: [30, 40], iconAnchor: [15, 30]
        });

        for(let i=0; i<100; i++){
            const tLat = Math.random() * (AREA.maxLat - AREA.minLat) + AREA.minLat;
            const tLng = Math.random() * (AREA.maxLng - AREA.minLng) + AREA.minLng;
            const candidates = shelters.filter(s => {
                const d = getDist(tLat, tLng, s.lat, s.lng);
                return d >= 0.8 && d <= 2.5;
            });
            if(candidates.length > 0){
                startPoint = {lat:tLat, lng:tLng};
                goalPoint = candidates[Math.floor(Math.random()*candidates.length)];
                found = true; break;
            }
        }
        if(!found) { setTimeout(resetGameState, 100); return; }

        L.marker([startPoint.lat, startPoint.lng], {icon: startIcon}).addTo(map);
        L.marker([goalPoint.lat, goalPoint.lng], {icon: goalIcon}).addTo(map);
    }

    function generateSafeDangerZones(start, goal) {
        if(!window.turf) return;
        const startPt = turf.point([start.lng, start.lat]);
        const goalPt = turf.point([goal.lng, goal.lat]);
        const midLat = (start.lat + goal.lat) / 2;
        const midLng = (start.lng + goal.lng) / 2;
        let createdCount = 0; let tryCount = 0;

        while(createdCount < 2 && tryCount < 100) {
            tryCount++;
            const latOffset = (Math.random() - 0.5) * 0.008;
            const lngOffset = (Math.random() - 0.5) * 0.008;
            const center = [midLng + lngOffset, midLat + latOffset];
            const radius = 0.3 + Math.random() * 0.2;
            const circle = turf.circle(center, radius, {steps: 16, units: 'kilometers'});
            const hitStart = turf.booleanPointInPolygon(startPt, circle);
            const hitGoal = turf.booleanPointInPolygon(goalPt, circle);

            if (!hitStart && !hitGoal) {
                dangerPolygons.push(circle);
                L.geoJSON(circle, {
                    style: { color: 'purple', fillColor: '#8e44ad', fillOpacity: 0.5, weight: 0 }
                }).addTo(map);
                createdCount++;
            }
        }
    }

    function onMapClick(e) {
        if(isGoalReady) return;
        if(map.distance(e.latlng, [goalPoint.lat, goalPoint.lng]) < 200) {
            userWaypoints.push(L.latLng(goalPoint.lat, goalPoint.lng));
            drawUserRoute();
            isGoalReady = true;
            btnFinish.classList.add('active');
            btnFinish.textContent = "避難する！（確定）";
            document.getElementById('status-text').innerHTML = "<b style='color:#27ae60'>ゴール到達！</b><br>ボタンを押して避難完了してください。";
        } else {
            userWaypoints.push(e.latlng);
            L.circleMarker(e.latlng, {radius: 4, color: '#3498db', fillOpacity:1}).addTo(map);
            drawUserRoute();
        }
    }

    function drawUserRoute() {
        if(userRouteControl) map.removeControl(userRouteControl);
        userRouteControl = L.Routing.control({
            waypoints: userWaypoints,
            router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1', profile: 'walking' }),
            lineOptions: { styles: [{ color: '#3498db', opacity: 0.8, weight: 6 }] },
            createMarker: () => null, addWaypoints: false, draggableWaypoints: false, show: false
        }).addTo(map);
    }

    function judgeGameRoute() {
        if(!isGoalReady) return;
        clearInterval(timerInterval);
        if(!userRouteControl._routes || userRouteControl._routes.length === 0) {
             setTimeout(judgeGameRoute, 500); return;
        }
        const route = userRouteControl._routes[0];
        const coords = route.coordinates;
        let isDead = false;
        for(let i=0; i<coords.length; i+=5) {
            const pt = turf.point([coords[i].lng, coords[i].lat]);
            for(let poly of dangerPolygons) {
                if(turf.booleanPointInPolygon(pt, poly)) { isDead = true; break; }
            }
            if(isDead) break;
        }
        if(isDead) showGameResult("避難失敗…", "ルートが<span class='fail' style='color:#c0392b;font-weight:bold;'>紫色の浸水エリア</span>を通っています。<br>水没してしまいました。", false);
        else showGameResult("避難成功！", "おめでとうございます！<br>危険箇所を回避し、安全に避難できました。", true);
    }

    function showGameResult(title, desc, isSuccess) {
        const overlay = document.getElementById('result-overlay');
        const rTitle = document.getElementById('res-title');
        const rDesc = document.getElementById('res-desc');
        overlay.style.display = 'flex';
        rTitle.innerText = title;
        rTitle.className = "result-title " + (isSuccess ? "success" : "fail");
        rDesc.innerHTML = desc;
    }

    function updateTimer() {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        document.getElementById('timer-box').textContent = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
    }

    function getDist(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2-lat1)*Math.PI/180;
        const dLon = (lon2-lon1)*Math.PI/180;
        const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    if(btnFinish) btnFinish.addEventListener('click', judgeGameRoute);
    if(btnRetry) btnRetry.addEventListener('click', resetGameState);
    if(overlayRetryBtn) overlayRetryBtn.addEventListener('click', resetGameState);
    if(overlayQuitBtn) overlayQuitBtn.addEventListener('click', () => {
        window.location.href = EXIT_URL;
    });
});


