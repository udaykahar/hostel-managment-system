const entry2 = document.getElementById('entry2')
const password = document.getElementById('password2')

const adminbtn = document.getElementById('adminbtn')

adminbtn.addEventListener('click', async () => {
  let response2 = await fetch('/admlogin', {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify({
      "username": entry2.value,
      "password": password.value
    })
  })
  let respjs2 = await response2.json()
  console.log(respjs2)
  if (respjs2.login == 'successful') {
    sessionStorage.setItem('auser', entry2.value)
    sessionStorage.setItem('apass', password.value)
    window.location.href = window.location.origin + "/adin"
  }
  else {
    window.alert('Login Failure\nWrong Credentials Entered')
  }
})