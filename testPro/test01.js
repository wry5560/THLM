//这是一个小说网站爬虫的测试程序
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// 小说主页URL
const baseUrl = 'https://www.17kanwenxue.com/index/105730706/';
const host = 'https://www.17kanwenxue.com';
const chapterList = []

// 获取章节列表
async function getChapterList(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // 查找所有章节链接
        // 从含有 “正文” 两字的h2 后面含有class 为 section-box中提取章节链接
        const start = $('h2:contains("正文")').next('.section-box');
        start.find('li a').each((index, element) => {
            const chapterTitle = $(element).text().trim();
            const chapterUrl = host + $(element).attr('href');
            chapterList.push({ title: chapterTitle, url: chapterUrl });
        });
        // $('.section-box li a').each((index, element) => {

        //     const chapterTitle = $(element).text().trim();
        //     const chapterUrl = $(element).attr('href');
        //     chapterList.push({ title: chapterTitle, url: chapterUrl });
        // });

        // 如果页面内含有 “下一页” 的a 标签则继续获取下一页的章节链接
        const nextPage = $('a:contains("下一页")');
        console.log('获取下一页链接:',nextPage.attr('href'));
        if (nextPage.length > 0) {
            const nextUrl = host + nextPage.attr('href');
            //等待2秒
            await new Promise(r => setTimeout(r, 2000));
           await getChapterList(nextUrl)
        }

        return chapterList;
    } catch (error) {
        console.error(`Failed to fetch chapter list from ${url}:`, error);
        return [];
    }
}

// 获取章节内容
async function fetchChapterContent(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // 根据网站结构提取章节标题和内容
        const title = $('h1.title').text().trim();
        const content = $('.content p').map((i, el) => $(el).text().trim()).get().join('\n');

        return { title, content };
    } catch (error) {
        console.error(`Failed to fetch content from ${url}:`, error);
        return null;
    }
}

// 保存章节到文件
function saveChapter(title, content, folder = 'novel') {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    const filename = path.join(folder, `${title}.txt`);
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`Saved ${title}`);
}

// 主函数
async function main() {
    const chapterList = await getChapterList(baseUrl);

    console.log(chapterList);
    // for (const chapter of chapterList) {
    //     const { title, content } = await fetchChapterContent(chapter.url);
    //     if (title && content) {
    //         saveChapter(title, content);
    //     }
    //     // 避免请求过于频繁
    //     await new Promise(r => setTimeout(r, 1000));
    // }
}

main();