const birthInputEl = document.getElementById("dog-birth");
const resultDiv = document.getElementById("result");
const calcBtn = document.getElementById("calc-btn");

/* ---------------------------
   1. 頁面載入時：讀取舊資料
--------------------------- */
window.addEventListener("load", function () {
  const savedBirthday = localStorage.getItem("dogBirthday");

  if (savedBirthday) {
    birthInputEl.value = savedBirthday;
    calculateAge(savedBirthday);
  }
});

/* ---------------------------
   2. 當生日改變時，自動儲存
--------------------------- */
birthInputEl.addEventListener("change", function () {
  const birthday = this.value;

  if (birthday) {
    localStorage.setItem("dogBirthday", birthday);
  }
});

/* ---------------------------
   3. 點擊按鈕時計算 + 儲存
--------------------------- */
calcBtn.addEventListener("click", function () {
  const birthday = birthInputEl.value;

  if (!birthday) {
    resultDiv.innerHTML = "<p>請先選擇狗狗生日喔！🐾</p>";
    return;
  }

  localStorage.setItem("dogBirthday", birthday);

  calculateAge(birthday);
});


/* ---------------------------
   4. 核心計算函數
--------------------------- */
function calculateAge(birthInput) {
  const birthDate = new Date(birthInput);
  const today = new Date();

  let diffTime = today - birthDate;
  let dogAgeYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  if (dogAgeYears < 0) {
    resultDiv.innerHTML = "<p>生日日期不能在未來喔！</p>";
    return;
  }

  let dogAgeDisplay = dogAgeYears.toFixed(2);

  let humanAge = 0;
  if (dogAgeYears <= 1) {
    humanAge = dogAgeYears * 15;
  } else if (dogAgeYears <= 2) {
    humanAge = 15 + (dogAgeYears - 1) * 9;
  } else {
    humanAge = 15 + 9 + (dogAgeYears - 2) * 5;
  }

  humanAge = humanAge.toFixed(0);

  /* 儲存計算結果 */
  localStorage.setItem("dogAge", dogAgeDisplay);
  localStorage.setItem("humanAge", humanAge);

  resultDiv.innerHTML = `
    <p>妙麗現在大約 <strong>${dogAgeDisplay}</strong> 歲囉！</p>
    <p>換算成人類年齡大約是 <strong>${humanAge}</strong> 歲！</p>
  `;
}