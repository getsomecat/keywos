#@kokoryh
#http-request amdc\.m\.taobao\.com requires-body=0,script-path=https://raw.githubusercontent.com/kokoryh/Script/master/js/self_use.js
let url = $request.url,
    body = null;
if (url.includes("manga.bilibili.com")) {
    let e = JSON.parse($response.body);
    e.data?.operate && (e.data.operate = null, body = JSON.stringify(e))
} else if (url.includes("wmapi.meituan.com")) {
    let e = JSON.parse($response.body);
    url.includes("loadInfo") && e.data?.startpicture ? (e.data.startpicture = [], body = JSON.stringify(e)) : url.includes("startpicture") ? (e.data = {
        start_picture: '{"ad":[],"mk":[]}'
    }, body = JSON.stringify(e)) : url.includes("openscreen") && (body = '{"data":{"start_picture":"","setStart_picture":true},"code":0,"msg":null,"setMsg":false,"setCode":true,"setData":true}')
} else if (url.includes("mp.weixin.qq.com/mp/getappmsgad")) {
    let e = JSON.parse($response.body);
    e.advertisement_num = 0, e.advertisement_info = [], body = JSON.stringify(e)
} else if (url.includes("amdc/mobileDispatch")) {
    let e = $request.headers,
        t = e["User-Agent"] || e["user-agent"];
    t.includes("AMap") || t.includes("Cainiao") ? $done() : $done({})
} else url.includes("intsig.net/purchase") ? body = '{"data":{"psnl_vip_property":{"expiry":"3287462400"}}}' : console.log("匹配到其他url：\n" + url);
body ? $done({
    body: body
}) : $done({});
