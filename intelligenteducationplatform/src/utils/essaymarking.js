export function ocEssayMarkingFormat (essaymarking, errinformation) {
    var arr = [];
    var essaymarkingarr = [];
    for (var i = 0; i < errinformation.length; i++) {
        const a = arr.find((item) => {
            return item[0] === errinformation[i][0];
        });
        if (a === undefined) {
            arr.push(errinformation[i]);
        }
        for (var j = 0; j < errinformation.length; j++) {
            if (errinformation[i][0] !== errinformation[j][0] && Math.abs(errinformation[i][0] - errinformation[j][0]) < 2 && j > i) {
                for (const p in arr) {
                    if (arr[p][0] === errinformation[i][0]) {
                        arr.splice(p, 1);
                        arr.push(errinformation[j]);
                    }
                }
            }
        }
    }
    arr = arr.sort((a, b) => {
        return a[0] - b[0];
    });
    for (var k = 0; k < arr.length; k++) {
        if (arr[0][0] === 0) {
            essaymarkingarr.push("<span class='errtext'>" + essaymarking.substr(arr[k][0], arr[k][1].length) + "<u-tag class='errtext-tag' plain type='primary'><span class='errtext-tag-span'>" + (k + 1) + "</span></u-tag>" + "</span>");
            if (k === 0) {
                essaymarkingarr.push(essaymarking.slice(arr[k][1].length, arr[k + 1][0]));
            } else {
                if (k + 1 < arr.length) {
                    essaymarkingarr.push(essaymarking.slice(arr[k][0] + arr[k][1].length, arr[k + 1][0]));
                } else {
                    essaymarkingarr.push(essaymarking.slice(arr[k][0] + arr[k][1].length));
                }
            }
        } else {
            if (k === 0) {
                essaymarkingarr.push(essaymarking.slice(0, arr[k][0]));
            } else {
                essaymarkingarr.push(essaymarking.slice(arr[k - 1][0] + arr[k - 1][1].length, arr[k][0]));
            }
            if (k === arr.length - 1) {
                essaymarkingarr.push("<span class='errtext'>" + essaymarking.substr(arr[k][0], arr[k][1].length) + "<span class='upLabel'>" + (k + 1) + "</span></span>");
                essaymarkingarr.push(essaymarking.substr(arr[k][0] + arr[k][1].length));
            } else {
                essaymarkingarr.push("<span class='errtext'>" + essaymarking.substr(arr[k][0], arr[k][1].length) + "<span class='upLabel'>" + (k + 1) + "</span></span>");
            }
        }
    }
    return { essaymarkingarr: essaymarkingarr.join("").split("↵"), arr: arr };
}

export function oeEssayMarkingFormat (essaymarking) {
    // console.log(essaymarking, "刚刚进来")
    const errobj = {};
    const essaymarkingarr = [];
    Object.assign(errobj, essaymarking.err_sent, essaymarking.sugs);
    const arrtest = [];
    for (const ip in errobj) {
        arrtest.push(errobj[ip]);
    }
    // console.log(arrtest);
    let l = 0;
    for (const i in errobj) {
        l++;
        if (Object.prototype.toString.call(errobj[i]) === "[object String]") {
            // console.log("句子推荐");
            essaymarkingarr.push(l + ". " + "原文句子：" + essaymarking.sentence[i].replace("\\n", "").trim());
        } else if (Object.prototype.toString.call(errobj[i]) === "[object Object]") {
            // console.log("词语推荐");
            var a1 = essaymarking.sentence[i].substr(errobj[i].idx, errobj[i].word.length);
            var a2 = essaymarking.sentence[i].substr(0, errobj[i].idx);
            var a3 = essaymarking.sentence[i].substr(errobj[i].idx + errobj[i].word.length);
            essaymarking.sentence[i] = a2 + "<span class='sugsword'>" + a1 + "</span>" + a3;
            essaymarkingarr.push(l + ". " + essaymarking.sentence[i].replace("\\n", "").trim());
        }
    }
    // console.log(essaymarkingarr, arrtest, "最终返回结果")
    return { essaymarkingarr: essaymarkingarr, arr: arrtest };
}