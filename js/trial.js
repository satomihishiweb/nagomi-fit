/* ==========================================================
   Nagomi Fit ｜ trial.html 用スクリプト
   1. LPの料金ボタンから渡された ?plan= でプラン欄を初期選択
   2. 送信時のバリデーション＋サンクスメッセージ表示
   3. ダミーリンク（プライバシーポリシー）のクリック無効化
   ========================================================== */

// ---------- 1. URLパラメータでプランを初期選択 ----------
function presetPlanFromUrl() {
  const planParam = new URLSearchParams(location.search).get('plan');
  if (!planParam) return;

  const planSelect = document.getElementById('f-plan');
  if (!planSelect) return;

  const exists = [...planSelect.options].some((o) => o.value === planParam);
  if (exists) planSelect.value = planParam;
}

// ---------- 2. 送信処理（フロントエンドのみ） ----------
function initTrialForm() {
  const form = document.getElementById('trialForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 必須項目のチェック（novalidate なので手動で実行）
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 入力欄を隠してサンクスメッセージを表示
    const fields = document.getElementById('formFields');
    const success = document.getElementById('formSuccess');
    if (fields) fields.hidden = true;
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// ---------- 3. ダミーリンクを無効化 ----------
function initDummyLinks() {
  document.querySelectorAll('.js-dummy-link').forEach((link) => {
    link.addEventListener('click', (e) => e.preventDefault());
  });
}

// ---------- 実行 ----------
presetPlanFromUrl();
initTrialForm();
initDummyLinks();
