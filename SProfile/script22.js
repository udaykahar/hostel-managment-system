let heading = document.getElementById('headhost')
let parent = document.getElementById('showdet')

const ssout = document.getElementById('ssout')
let stid;
window.addEventListener('load', async () => {
  console.log("Request Initiated")
  let fdetails = await fetch('/stext', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'user': sessionStorage.getItem('user'),
      'pass': sessionStorage.getItem('pass')
    })
  })
  let details = await fdetails.json()
  if (details.extraction == 'failure') {
    parent.innerText = "Couldn't Extract Details Please Login Again"
  }
  for ([key, value] of Object.entries(details.body)) {
    if (key == 'Hostel') {
      heading.innerText = value
    }
    else {
      let temp = document.createElement('span')
      temp.innerText = `${key}: ${value}`
      parent.appendChild(temp)
    }
    if(key == 'Student ID'){
      stid = value
    }
  }
  let comid = document.getElementById('comid')
  let comstat = document.getElementById('comstat')
  let resp7 = await fetch('/strstat',{
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'stid': stid
    })
  })
  let resp7js = await resp7.json()
  if (resp7js.complaints == 'none'){
    comid.parentElement.parentElement.innerHTML = '<h3>There are No Pending Complaints</h3>'
  }
  else{
    comid.innerText = resp7js.body.reqid
    comstat.innerText = resp7js.body.reqstat
  }
})

