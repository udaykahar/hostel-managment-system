const entry1 = document.getElementById('entry1')
const password = document.getElementById('password')

const loginbtn = document.getElementById('loginbtn')

loginbtn.addEventListener('click', async (event) => {
  event.preventDefault()
  let response = await fetch('/stlogin', {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify({
      "entry1": entry1.value,
      "password": password.value
    })
  })
  let respjs = await response.json()
  if (respjs.login == "failure") {
    window.alert('Login Failure\nWrong Credentials Entered')
  }
  else {
    sessionStorage.setItem('user', entry1.value)
    sessionStorage.setItem('pass', password.value)
    window.location.href = window.location.origin + "/stin"
  }
})


