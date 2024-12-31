function submit() {
  // Make up answers
  state.values.forEach(element => {
    if (element[0] > element[1]) {
      state.inputs.push('>');
    } else {
      state.inputs.push('<');
    }
  });

  inputs = state.inputs;

  // Submit anwers
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({inputs}),
  })
    .then(response => response.json())
    .then(data => {
      state.stopUpdate = true;
      document.getElementById('dialog').textContent = data.message;
      document.getElementById('dialog').style.display = 'flex';
    })
    .catch(error => {
      state.stopUpdate = true;
      document.getElementById('dialog').textContent = '提交失败，请刷新页面重试';
      document.getElementById('dialog').style.display = 'flex';
    });
}

submit();
