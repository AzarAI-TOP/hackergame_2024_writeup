// 获取包含超链接的li元素
const liElements = Array.from(document.querySelectorAll("body > div > div > ul > li"));

// 异步函数，用于检查链接内容
async function checkLinkForFlag(aElement) {
  try {
    // 使用fetch获取链接内容
    const response = await fetch(aElement.href);
    // 确保响应成功
    if (response.ok) {
      // 获取响应体文本
      const text = await response.text();
      // 检查文本中是否包含'flag'字符串
      if (text.includes('flag')) {
        // 如果包含，输出链接
        console.log(`Found 'flag' in: ${aElement.href}`);
      }
    }
  } catch (error) {
    // 如果发生错误，输出错误信息
    console.error(`Error fetching ${aElement.href}:${error}`);
  }
}

// 遍历所有li元素并找到其中的a元素，然后检查它们
liElements.forEach(li => {
  const aElement = li.querySelector('a');
  if (aElement) {
    checkLinkForFlag(aElement);
  }
});
