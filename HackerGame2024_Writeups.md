# Hacker Game 2024

## 签到题

直接空白提交一次, 浏览器的URL地址就会变成 `http://202.38.93.141:12024/?pass=false`, 那么就说明他是显式GET请求, 我们直接改成 `http://202.38.93.141:12024/?pass=true`, 就可以获得`flag{weLCOm3-70-HacK3R9amE-And-3nJoY-HACk1Ng-Z0Z4}`

## 旅行照片 4.0

- 从照片中可以看出来"科大硅谷"的字样, 显然是东区大西门对面的立基大厦

  ![1731152611147](image/HackerGame2024_Writeups/1731152611147.png)

- 在学校青春科大的官网搜索`ACG`就可以找到, 即 2024-05-19

  ![1731153094096](image/HackerGame2024_Writeups/1731153094096.png)

## PaloGPT

由网页内容可以知道目前只能去分析浏览记录获得答案, 那么我们先打开**操作台**, 把所有的子链接整理出来

```js
// 选择ul元素
const ulElement = document.querySelector("body > div > div > ul");
// 获取所有li元素
const liElements = ulElement.querySelectorAll("li");
// 存储所有a元素的链接和标题
const linksAndTitles = [];
// 遍历li元素
liElements.forEach(li => {
  // 在每个li元素中查找a元素
  const aElement = li.querySelector("a");
  // 如果a元素存在，则获取其href和innerText
  if (aElement) {
    const link = aElement.href;
    const title = aElement.innerText;
    // 将链接和标题添加到数组中
    linksAndTitles.push({ link, title });
  }
});
// 输出链接和标题
console.log(linksAndTitles);
```

然后直接写一个Python爬虫去实现正则分析的功能

```py
import re
import requests

a = [("/view?conversation_id=6935a6a9-f171-4721-b58b-b899a72c094e", "罗浮山中四首 其一 模仿李云龙，写一首古诗："),
    ("/view?conversation_id=03c79368-2766-4704-b978-c387caafab84", "我正在写关于音乐表演者的培养中的思想、人生体验与文化修养的词条，想了解一下背景知识，你能详细介绍一下吗？"),
    ...
    ]

base_link = "https://chal01-e3omp9u3.hack-challenge.lug.ustc.edu.cn:8443"

headers = {
"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
"Accept-Encoding": "gzip, deflate, br, zstd",
"Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
"Cache-Control": "max-age=0",
"Connection": "keep-alive",
"Cookie": "_ga_VR0TZSDVGE=GS1.3.1726667440.1.0.1726667440.0.0.0; _ga=GA1.1.676976481.1726667440; _ga_R7BPZT6779=GS1.1.1730520415.1.1.1730520432.43.0.1288439568; session=eyJ0b2tlbiI6IjE1NzM6TUVZQ0lRREhQQ1FaOFhXODBsU2ZFdGtrY3M3bmhiMEJLYnByYWE2Z3BTRHhBMXV5b1FJaEFKemlva0FwZDc0WE4yd29aTWtVUWNVWTMrSXhDNE52ejd3MUxXRGxwUm1nIn0.ZyW0Vg.2fNJtBufPiLCGGZMXGmFXfPWFBY",
"Host": "chal01-e3omp9u3.hack-challenge.lug.ustc.edu.cn:8443",
"Referer": "https://chal01-e3omp9u3.hack-challenge.lug.ustc.edu.cn:8443/chat",
"Sec-Fetch-Dest": "document",
"Sec-Fetch-Mode": "navigate",
"Sec-Fetch-Site": "same-origin",
"Sec-Fetch-User": "?1",
"Upgrade-Insecure-Requests": "1",
"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
"sec-ch-ua": '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
"sec-ch-ua-mobile": "?0",
"sec-ch-ua-platform": "Linux"
}

response = requests.get(url=base_link+a[0][0], headers=headers)

for x in a:
  response = requests.get(url=base_link+x[0], headers=headers)
  if response.status_code == 200:
    if re.search(r".*?(flag{.*?}).*?", response.text, re.IGNORECASE) != None:
      print(re.search(r".*?(flag{.*?}).*?", response.text, re.IGNORECASE))
```

运行脚本, 就可以第一个

## 比大小王

根据后台的源代码可以自行写一个**提交函数**并运行

```js
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
```

就可以得到我们的`flag{1-@m-7he-h@cKer-Kin9-0f-cOmp@riNg-NUmBER$-zOZ4}`, 不过注意运行的时候保险起见可以稍微让机器人先拿一点分再运行, 不然会检测出来你运行了脚本作弊
