const cardInput = document.querySelector('.box2-1 #message1');
const confirmButton = document.querySelector('.box2-2 button');
const MiMaTanChuang = document.querySelector('.payPassword');//确认密码大窗体
const closeMiMaTanChuang = document.querySelector('.payPassword1 img');//关密码窗口
const passwordInput = document.querySelector('.payPassword2 input');//弹窗密码框
const confirmPasswordButton = document.querySelector('.payPassword3 button');//确认密码
const hint = document.querySelector('.payPassword p');//提示验证码错误
const exitButton = document.querySelector('.box1-1 img');
var selectElement = document.getElementById("account");



function slideMe() {
  document.body.style.marginRight = "0"
  document.body.style.opacity = "1";
}

exitButton.addEventListener('click', () => {
  document.body.style.marginRight = "-15%";
  document.body.style.opacity = "0";
  setTimeout(function () {
    location.href = '../账户管理页面.html';
  }, 100);
})

confirmButton.addEventListener('click', () => {
  MiMaTanChuang.classList.add("show");
  document.getElementById("overlay").classList.add("show");
})

closeMiMaTanChuang.addEventListener('click', () => {
  // MiMaTanChuang.style.visibility = 'hidden';
  hint.style.visibility = 'hidden';
  MiMaTanChuang.classList.remove("show");
  passwordInput.value = '';
  document.getElementById("overlay").classList.remove("show");
})

confirmPasswordButton.addEventListener('click', () => {
  pipei();
})

function pipei() {
  mima();
}

function right() {
  let token = localStorage.getItem('token');
  axios({
    url: 'http://47.113.198.244/user/verifyCard',
    headers: {
      token
    },
    params: {
      cardID: cardInput.value
    }
  }).then(result => {
    if (result.data.code == 200) {
      console.log(result);
      guasi();
    } else {
      alert(result.data.msg);
    }
  })
}

function guasi() {
  let token = localStorage.getItem('token');
  axios({
    url: 'http://47.113.198.244/user/verifyLoss',
    headers: {
      token
    },
    params: {
      cardID: cardInput.value
    }
  }).then(result => {
    if (result.data.code == 200) {
      console.log(result);
      yongyou();
    } else {
      alert(result.data.msg);
    }
  })
}

function yongyou() {
  let token = localStorage.getItem('token');
  axios({
    url: 'http://47.113.198.244/user/verifyAccount',
    headers: {
      token
    },
    params: {
      cardID: cardInput.value
    }
  }).then(result => {
    if (result.data.code == 200) {
      console.log(result);
      mima();
    } else {
      alert(result.data.msg);
    }
  })
}

function mima() {
  let token = localStorage.getItem('token');
  var selectedValue = selectElement.value;
  axios({
    url: 'http://47.113.198.244/user/getPaymentPassword',
    headers: {
      token
    },
    params: {
      cardID: selectedValue,
      password: passwordInput.value
    }
  }).then(result => {
    if (result.data.code == 200) {
      console.log(result);
      tianjia();
      hint.style.visibility = 'hidden';
    } else {
      hint.style.visibility = 'visible';
    }
  })
}

function tianjia() {
  let token = localStorage.getItem('token');
  var selectedValue = selectElement.value;
  axios({

    url: 'http://47.113.198.244/user/deleteCard',
    method: "PUT",
    headers: {
      token
    },
    params: {
      cardID: selectedValue
    }
  }).then(result => {
    if (result.data.code == 200) {
      console.log(result);
      hint.style.visibility = 'hidden';
      MiMaTanChuang.classList.remove("show");
      passwordInput.value = '';
      document.getElementById("overlay").classList.remove("show");
    } else {
      alert(result.data.msg);
      hint.style.visibility = 'hidden';
      MiMaTanChuang.classList.remove("show");
      passwordInput.value = '';
      document.getElementById("overlay").classList.remove("show");
    }
  })

}
function getaccount() {
  let token = localStorage.getItem('token');
  axios({
    url: 'http://47.113.198.244/user/getRelatedCard',
    headers: {
      token
    }
  }).then(result => {
    console.log(result)
    var optionsData = result.data.data;
    selectElement.innerHTML = '';
    for (var i = 0; i < optionsData.length; i++) {
      var optionElement = document.createElement('option');
      optionElement.value = optionsData[i].cardID;
      let lastFourDigits = optionsData[i].cardID.slice(-4);
      optionElement.text = lastFourDigits;
      selectElement.appendChild(optionElement);
    }
  })
}
getaccount();



