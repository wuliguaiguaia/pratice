const str = `
发哈就是放进煞风景撒化肥金卡是否
1. 110sdsadas
A. 111
B. 112
C. 113
D. 114
2. 211sdsadas
A. 211
B. 212
C. 213
D. 214
3. 311sdsadas
A. 311
B. 312
C. 313
D. 314
解析： 1. fsd
2. fsd
3.fff
4.fds 
答案：1. A 
2.B
3.C
4.D
`;

const breakTipType = {
    title: 0,
    question: 1,
    answer: 2,
    explain: 3,
};

const struct = {
    content: {
        content: '',
    },
    answer: {
        content: '',
    },
    questionList: [
        {
            type: 1,
            options: {},
            choose: null,
            answer: {
                content: '',
            },
        },
    ],
};
const a = '^(\\(（\\[【)?';
const b = '(\\)）\\]】)?';
const orderFirst = new RegExp(a + '(\\d+)(\\.,、)?' + b);
console.log(orderFirst);
const answerReg = /^答案/;
const explainReg = /^解析/;

function parse(str) {
    const children = str.split('\n');
    console.log(children.length);
    let tip = breakTipType.title;
    let tempArr = [];
    const parseTitle = () => {
      console.log('title', tempArr);
        tempArr = [];
    };
    const parseSmallQuestion = () => {
        console.log('smallQuestion', tempArr);
        tempArr = [];
    };
    const parseAnswer = () => {
        console.log('answer', tempArr);
        tempArr = [];
    };
    const parseExplain = () => {
        console.log('explain', tempArr);
        tempArr = [];
    };


    const parseAll = () => {
        if (tempArr.length && tip === breakTipType.answer) {
            parseAnswer();
        }
        if (tempArr.length && tip === breakTipType.title) {
            parseTitle();
        }
        if (tempArr.length && tip === breakTipType.question) {
            parseSmallQuestion();
        }
        if (tempArr.length && tip === breakTipType.explain) {
            parseExplain();
        }
    };
    for (let i = 0; i < children.length; i++) {
        const text = children[i].trim();
        if (!text) { continue; }
        // 预判
        if (orderFirst.test(text) && tip === breakTipType.title) {
            parseTitle();
            tip = breakTipType.question;
        }

        if (answerReg.test(text)) {
            parseAll();
            tip = breakTipType.answer;
        }

        if (explainReg.test(text)) {
            parseAll();
            tip = breakTipType.explain;
        }

        // 收集
        tempArr.push(text);
    }
    parseAll();
}

parse(str);