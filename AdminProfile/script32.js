let parent = document.getElementById('ashowdet')

window.addEventListener('load', async () => {
  console.log("Request Initiated")
  let adetails = await fetch('/alext', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'user': sessionStorage.getItem('auser'),
      'pass': sessionStorage.getItem('apass')
    })
  })
  let details = await adetails.json()
  if (details.extraction == 'failure') {
    parent.innerText = "Couldn't Extract Details Please Login Again"
  }
  else{
    for([key,value] of Object.entries(details.body)){
      newspan = document.createElement('span')
      newspan.innerText = `${key}: ${value}`
      parent.appendChild(newspan)
    }
  }
  console.log(details)
  
})